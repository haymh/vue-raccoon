<template>
  <gmap-map
    :options="mapOptions"
    :center="center"
    :zoom="12"
    @idle="onIdle"
    @click="onMapClicked"
    @dragend="onDragEnd"
    @zoom_changed="onZoomChanged"
    @bounds_changed="mapBoundsChanged($event)"
    style="width: 100%; height: 100%"
    ref="map"
  >
    <template v-if="outline">
      <gmap-polygon
        v-for="(paths, i) in outlineData"
        :paths="paths"
        :editable="false"
        :options="outlineOption"
        :key="'polygon-'+i">
      </gmap-polygon>
    </template>
    <template v-if="!showCluster">
      <gmap-marker
      :key="'houseMarker-'+index"
      v-for="(marker, index) in houseMarkers"
      :position="marker.position"
      :clickable="true"
      :icon="marker.icon"
      @click="onMarkerClick(marker)"
      @mouseover="onMarkerMouseover(marker)"
      @mouseout="onMarkerMouseout"
    ></gmap-marker>
    </template>
    <template v-if="showCluster">
    <gmap-marker
      :key="'clusterMarker-'+index"
      v-for="(marker, index) in clusterMarkers"
      :position="marker.position"
      :clickable="true"
      :icon="marker.icon"
      :label="marker.label"
      @click="onMarkerClick(marker)"
      @mouseover="onClusterMarkerMouseover(marker)"
      @mouseout="onClusterMarkerMouseout()"
    ></gmap-marker>
    </template>
    <gmap-polygon
      v-if="clusterOutline"
      :paths="clusterOutline"
      :editable="false"
      :options="clusterOutlineOption">
    </gmap-polygon>
    <div slot="visible">
    <v-btn @click="$store.dispatch('setOutline', null)">remove outline</v-btn>
    </div>
  </gmap-map>
</template>

<script>
  import 'marker-clusterer-plus';
  import { loaded } from 'vue2-google-maps';
  import inside from '@turf/inside';
  import mapSettings from './mapSettings';
  import HouseMarkerClassGenerator from './HouseMarker';
  import PriceOverlayClassGenerator from './PriceOverlay';
  import { MapUtil } from '../../api/map';

  export default {
    props: ['houseData', 'searchByGeo', 'clusterData', 'outline', 'showCluster'],
    computed: {
      houses() {
        return this.houseData.filter(h => h.googleLocation
        && h.googleLocation.location
        && h.googleLocation.location.lat && h.googleLocation.location.lng);
      },

      houseMarkers() {
        if (this.showCluster) {
          return [];
        }
        let filtered = this.houses;
        if (this.outline && this.outline.geojson.coordinates) {
          const polygon = {
            type: 'Feature',
            geometry: this.outline.geojson,
            properties: {},
          };
          filtered = filtered.filter(h => inside({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [h.googleLocation.location.lng, h.googleLocation.location.lat],
            },
            properties: {},
          }, polygon));
        }
        return filtered.map(house => ({
          position: house.googleLocation.location,
          type: 'house',
          house,
          icon: this.mapSettings.house,
        }));
      },

      outlineData() {
        if (this.outline && this.outline.geojson.coordinates) {
          const outlines = this.outline.geojson.coordinates.map((outline) => {
            const data = outline.length === 1 ? outline[0] : outline;
            const newOutline = data.map((o) => {
              const obj = { lat: parseFloat(o[1]), lng: parseFloat(o[0]) };
              return obj;
            });
            return newOutline;
          });

          console.log('outlines', outlines);
          return outlines;
        }
        return [];
      },

      clusters() {
        if (!this.showCluster) {
          return [];
        }
        let filtered = this.clusterData;
        if (this.outline && this.outline.geojson.coordinates) {
          console.log('need to filter');
          console.log('before filtering: ', filtered.length);
          const polygon = {
            type: 'Feature',
            geometry: this.outline.geojson,
            properties: {},
          };
          filtered = filtered.filter(c => inside({
            type: 'Feature',
            geometry: c.center,
            properties: {},
          }, polygon));
        }
        console.log('after filtering: ', filtered.length);
        return filtered.map((c) => {
          const bbox = c.bbox.coordinates.map((b) => {
            const l = { lat: b[1], lng: b[0] };
            return l;
          });
          return {
            total: c.total,
            center: {
              lat: c.center.coordinates[1],
              lng: c.center.coordinates[0],
            },
            bbox,
            coordinates: c.bbox.coordinates,
            bboxString: c.bboxString,
            convexHull: c.convexHull,
            level: c.level,
          };
        });
      },

      clusterMarkers() {
        return this.clusters.map(c => ({
          type: 'cluster',
          position: c.center,
          cluster: c,
          icon: this.clusterIcon(c.total),
          label: {
            text: `${c.total}`,
            color: 'white',
          },
        }));
      },
    },

    data() {
      return {
        center: { lat: 32.856385, lng: -117.202936 },
        mapSettings,
        mapOptions: {},
        selectedCluster: null,
        shouldSearch: false,
        outlineOption: {
          fillOpacity: 0.0,
          strokeColor: 'red',
          strokeOpacity: 0.5,
        },
        clusterOutlineOption: {
          fillOpacity: 0.0,
          strokeWeight: 5,
          strokeColor: '#D741A7',
          strokeOpacity: 0.5,
        },
        levelUnchange: false,
        fitmap: false,
        clusterOutline: null,
        bound: '',
        level: 0,
      };
    },

    watch: {
      clusterData: {
        handler() {
          if (!this.showCluster) {
            return;
          }
          if (!this.clusterData || this.clusterData.length === 0) {
            this.fitMapWithOutline();
            this.shouldSearch = false;
            return;
          }
          if (this.fitmap) {
            console.log('fitting map with clusters');
            const bounds = new google.maps.LatLngBounds();
            this.clusterData.forEach((cluster) => {
              cluster.convexHull.coordinates.forEach((c) => {
                const googleLatLng = new google.maps.LatLng(c[1], c[0]);
                bounds.extend(googleLatLng);
              });
            });
            this.$refs.map.fitBounds(bounds);
            this.shouldSearch = false;
            console.log('fitting map finished', this.shouldSearch);
          }
        },
        deep: true,
      },
      houseMarkers: {
        handler() {
          if (this.showCluster) {
            return;
          }
          if (!this.houseMarkers || this.houseMarkers.length === 0) {
            this.fitMapWithOutline();
            this.shouldSearch = false;
            return;
          }
          if (this.fitmap) {
            console.log('fitting map with houses');
            const bounds = new google.maps.LatLngBounds();
            this.houseMarkers.forEach((marker) => {
              if (marker.type === 'house' && !this.showCluster) {
                const { lat, lng } = marker.house.googleLocation.location;
                const googleLatLng = new google.maps.LatLng(lat, lng);
                bounds.extend(googleLatLng);
              }
            });
            this.$refs.map.fitBounds(bounds);
            this.shouldSearch = false;
            console.log('fitting map finished', this.shouldSearch);
          }
        },
        deep: true,
      },
      outline: {
        handler() {
          this.fitmap = true;
        },
        deep: true,
      },
    },

    created() {
      loaded.then(() => {
        this.HouseMarker = HouseMarkerClassGenerator();
        this.PriceOverlay = PriceOverlayClassGenerator();
        this.googleMapLoaded();
        this.mapOptions = {
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        };
      });
    },

    methods: {
      /*
       * Listeners
       */
      googleMapLoaded() {
      },

      fitMapWithOutline() {
        if (this.outline && this.outline.boundingbox) {
          console.log('fitting map with outline');
          const bounds = new google.maps.LatLngBounds();
          const [sLat, nLat, wLng, eLng] = this.outline.boundingbox;
          const bbox = [[sLat, wLng], [sLat, eLng], [nLat, eLng], [nLat, wLng], [sLat, wLng]];
          bbox.forEach((p) => {
            const googleLatLng = new google.maps.LatLng(p[0], p[1]);
            bounds.extend(googleLatLng);
          });
          this.$refs.map.fitBounds(bounds);
        }
      },

      // idle listener
      onIdle() {
        console.log('Map is idle');
        if (this.shouldSearch && this.searchByGeo) {
          console.log('searching');
          this.searchByGeo({ box: this.bounds, level: this.level });
        }
      },

      // zoom listener
      onZoomChanged() {
        console.log('zoom changed');
        this.shouldSearch = true;
        this.levelUnchange = false;
        this.fitmap = false;
      },

      // dragend listener
      onDragEnd() {
        console.log('User stop dragging');
        this.shouldSearch = true;
        this.levelUnchange = true;
        this.fitmap = false;
      },

      // map click listener
      onMapClicked() {
        if (this.activeMarker) {
          this.activeOverlay.toggleDOM();
          this.activeMarker = null;
        }
      },

      // map bounds changed
      mapBoundsChanged(bounds) {
        const box = [bounds.f.b, bounds.b.b, bounds.f.f, bounds.b.f];
        if (!this.levelUnchange) {
          // recalculate area and cluster level
          const lowerLeft = [box[1], box[0]];
          const upperRight = [box[3], box[2]];
          const lowerRight = [box[3], box[0]];
          const upperLeft = [box[1], box[2]];
          const coordinates = [lowerLeft, lowerRight, upperRight, upperLeft, lowerLeft];
          const a = MapUtil.calculatePolygonArea({
            type: 'Polygon',
            coordinates: [coordinates],
          });
          this.level = MapUtil.areaToClusterLevel(a);
          console.log('current cluster level: ', this.level);
        }
        this.bounds = box.join(', ');
        console.log(this.bounds);
      },

      // on marker click listener
      onMarkerClick(marker) {
        if (marker.type === 'cluster') {
          this.searchByGeo({
            level: marker.cluster.level - 1,
            box: marker.cluster.bboxString,
          });
          this.shouldSearch = true;
          this.fitmap = true;
          this.clusterOutline = null;
        } else if (marker.type === 'house') {
          if (this.activeMarker) {
            this.activeOverlay.toggleDOM();
            this.activeOverlay = null;
          }

          const { house } = marker;
          const { lat, lng } = house.googleLocation.location;
          const googleLatLng = new google.maps.LatLng(lat, lng);
          const bounds = new google.maps.LatLngBounds(googleLatLng, googleLatLng);

          this.activeOverlay = new this.HouseMarker(bounds, this.$refs.map.$mapObject, { house });
          this.activeMarker = marker;
          this.activePriceOverlay.remove();
          this.activePriceOverlay = null;
        }
      },

      onClusterMarkerMouseover(marker) {
        if (marker.type === 'cluster') {
          if (marker.cluster.convexHull && marker.cluster.convexHull.coordinates) {
            this.clusterOutline = marker.cluster.convexHull.coordinates.map((c) => {
              const obj = { lat: parseFloat(c[1]), lng: parseFloat(c[0]) };
              return obj;
            });
          }
        }
      },

      onClusterMarkerMouseout() {
        this.clusterOutline = null;
      },

      onMarkerMouseover(marker) {
        if (!this.activePriceOverlay) {
          const { house } = marker;
          const { lat, lng } = house.googleLocation.location;
          const googleLatLng = new google.maps.LatLng(lat, lng);
          const bounds = new google.maps.LatLngBounds(googleLatLng, googleLatLng);

          this.activePriceOverlay = new this.PriceOverlay(
            bounds,
            this.$refs.map.$mapObject,
            marker,
            { house },
          );
        }
      },

      onMarkerMouseout() {
        if (this.activePriceOverlay) {
          this.activePriceOverlay.remove();
          this.activePriceOverlay = null;
        }
      },

      clusterIcon(total) {
        if (total < 100) {
          return this.mapSettings.cluster1;
        } else if (total < 1000) {
          return this.mapSettings.cluster2;
        }
        return this.mapSettings.cluster3;
      },

      /*
       * other methods
       */
    },
  };
</script>
