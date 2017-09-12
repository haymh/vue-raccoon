import axios from 'axios';
import area from '@turf/area';

const baseURL = ' http://nominatim.openstreetmap.org';

class OpenStreetWrapper {
  constructor() {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  /**
   * 
   * @param {object} searchTerm - search term object
   * @param {string} searchTerm.city - city
   * @param {string} searchTerm.state - state
   * @param {string} searchTerm.postalcode - zip
   * @param {string} searchTerm.county - county
   */
  getOutline(searchTerm) {
    return this.client.get('/search', {
      params: {
        ...searchTerm,
        format: 'json',
        polygon_geojson: 1,
      },
    })
      .then(res => res.data);
  }
}

export class MapUtil {
  static convertToRaccoonBbox(boundingbox) {
    const [sLat, nLat, wLng, eLng] = boundingbox;
    return [sLat, wLng, nLat, eLng].join(',');
  }

  static calculateAreaFromRaccoonBox(box) {
    const bboxArray = box.split(',');
    const floatArray = bboxArray.map(data => parseFloat(data));
    const lowerLeft = [floatArray[1], floatArray[0]];
    const upperRight = [floatArray[3], floatArray[2]];
    const lowerRight = [floatArray[3], floatArray[0]];
    const upperLeft = [floatArray[1], floatArray[2]];
    const coordinates = [lowerLeft, lowerRight, upperRight, upperLeft, lowerLeft];
    const a = MapUtil.calculatePolygonArea({
      type: 'Polygon',
      coordinates: [coordinates],
    });
    console.log('area', a, 'km^2', coordinates);
    return a;
  }

  static calculatePolygonArea(geometry) {
    const polygon = {
      type: 'Feature',
      properties: {},
      geometry,
    };
    const a = area(polygon) / 1000000;
    console.log('area', a, 'km^2');
    return a;
  }

  static areaToClusterLevel(a) {
    if (a < 30) {
      return -1;
    } else if (a < 1000) {
      return 0;
    } else if (a < 10000) {
      return 1;
    } else if (a < 100000) {
      return 2;
    }
    return 3;
  }
}

export const openStreetAPI = new OpenStreetWrapper();
Object.freeze(openStreetAPI);

