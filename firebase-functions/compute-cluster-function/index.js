import * as firebaseFunction from 'firebase-functions';
import gcs from '@google-cloud/storage';
import supercluster from 'supercluster';
import bbox from '@turf/bbox';
import center from '@turf/center';


const outputBucketName = 'computed-output';
const outputFilePrefix = 'cluster/cluster-';
const houseGeoDumpTest = /^input\/house_geo_dump/;
const fileTimeStampCapture = /house_geo_dump_(.*?)\.json/;
const storage = gcs();
const zooms = [4, 5, 8, 10];

const cross = (a, b, o) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

/**
* @param points An array of [X, Y] coordinates
*/
const convexHull = (points) => {
  points.sort((a, b) => {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  });

  const lower = [];
  for (let i = 0; i < points.length; i += 1) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
      lower.pop();
    }
    lower.push(points[i]);
  }

  const upper = [];
  for (let i = points.length - 1; i >= 0; i -= 1) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
      upper.pop();
    }
    upper.push(points[i]);
  }

  upper.pop();
  lower.pop();
  return lower.concat(upper);
};

const compute = (coords) => {
  const geoCoords = [];
  console.log('converting coords to geojson feature');
  coords.forEach((c) => {
    if (c.googleLocation && c.googleLocation.location) {
      geoCoords.push({
        geometry: {
          type: 'Point',
          coordinates: [c.googleLocation.location.lng, c.googleLocation.location.lat],
        },
        properties: {},
        type: 'Feature',
      });
    }
  });
  console.log(`ready to process ${geoCoords.length} houses`);
  console.log('initializing supercluster');
  const index = supercluster({
    radius: 15,
    maxZoom: 16,
  });
  let i = 3;
  const clusters = [];
  console.log('loading coordinates');
  index.load(geoCoords);
  zooms.forEach((z) => {
    const cs = index.getClusters([-180, -85, 180, 85], z);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    let count = 0;
    cs.forEach((c) => {
      if (c.properties.cluster) {
        count += 1;
        const points = index.getLeaves(c.properties.cluster_id, Number.MAX_SAFE_INTEGER);
        const convex = convexHull(points.map(p => p.geometry.coordinates));
  
        const collection = {
          type: 'FeatureCollection',
          features: convex.map((cc) => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: cc,
              },
            };
          }),
        };
        const [wLng, sLat, eLng, nLat] = bbox(collection);
        const bboxRes = [
          [wLng, sLat],
          [wLng, nLat],
          [eLng, nLat],
          [eLng, sLat],
          [wLng, sLat],
        ];
        const bboxString = [sLat, wLng, nLat, eLng].join(',');
        const centerRes = center(collection);
        clusters.push({
          level: i,
          total: c.properties.point_count,
          bbox: {
            type: 'Polygon',
            coordinates: bboxRes,
          },
          center: centerRes.geometry,
          bboxString,
          convexHull: {
            type: 'Polygon',
            coordinates: convex,
          },
        });
      }
    });
    console.log(`level${i}: ${count}`);
    i -= 1;
  });
  return clusters;
};

const computeCluster = firebaseFunction.storage.object().onChange((event) => {
  return new Promise((fulfill, reject) => {
    const object = event.data;
    const filePath = object.name;
    console.log('bucket', object.bucket);
    console.log('filePath', filePath);
    if (!houseGeoDumpTest.test(filePath)) {
      console.log('Cannot process this file');
      return reject();
    }
    console.log('getting time stamp on the file');
    const match = fileTimeStampCapture.exec(filePath);
    const timeStamp = match[1];
    if (!timeStamp) {
      console.log('Cannot extract the time stamp');
      return reject();
    }
    console.log(`got time stamp ${timeStamp}`);
    if (object.resourceState === 'exists' && object.metageneration == 1) {
      console.log('handle object creation');
      const bucket = storage.bucket(object.bucket);
      const file = bucket.file(filePath);
      file.download((error, contents) => {
        if (error) {
          console.log(`Cannot download file ${filePath} from ${object.bucket}`);
          return reject(error);
        }
        const houses = JSON.parse(contents);
        console.log(`${houses.length} houses need to be processed`);
        const clusters = compute(houses);
        const outputFileName = `${outputFilePrefix}${timeStamp}`;
        const outputBucket = storage.bucket(outputBucketName);
        const outputFile = outputBucket.file(outputFileName);
        outputFile.save(JSON.stringify(clusters), (err) => {
          if (err) {
            console.log(`Cannot save file ${outputFileName}`);
            reject(err);
          } else {
            console.log(`Successfully save file to ${outputBucketName}/${outputFileName}`);
            fulfill();
          }
        });
      });
    } else {
      console.log('object.resourceState', object.resourceState);
      console.log('object.metageneration', object.metageneration);
      console.log('Only handle new file');
      reject();
    }
  });
});

export default computeCluster;
