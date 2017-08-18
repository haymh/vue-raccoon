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
        :key="i">
      </gmap-polygon>
    </template>
     <template v-if="!showCluster"> 
       <gmap-marker
        :key="index"
        v-for="(marker, index) in houseMarkers"
        :position="marker.position"
        :clickable="true"
        :icon="mapSettings.defaultIconSettings"
        @click="onMarkerClick(marker)"
        @mouseover="onMarkerMouseover(marker)"
        @mouseout="onMarkerMouseout"
      ></gmap-marker> 
     </template> 
     <template v-if="showCluster">
      <gmap-marker
        :key="index"
        v-for="(marker, index) in clusterMarkers"
        :position="marker.position"
        :clickable="true"
        :icon="mapSettings.defaultClusterIconSettings"
        :label="'' + marker.cluster.total"
        @click="onMarkerClick(marker)"
      ></gmap-marker>
     </template>
     <div slot="visible">
      <v-btn @click="$store.dispatch('setOutline', null)">remove outline</v-btn>
     </div>
  </gmap-map>
</template>

<script>
  import 'marker-clusterer-plus';
  import { loaded } from 'vue2-google-maps';
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
        return this.houses.map(house => ({
          position: house.googleLocation.location,
          type: 'house',
          house,
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
        return this.clusterData.map((c) => {
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
            level: c.level,
          };
        });
      },

      clusterMarkers() {
        return this.clusters.map(c => ({
          type: 'cluster',
          position: c.center,
          cluster: c,
        }));
      },

      level() {
        if (this.showCluster && this.clusters.length !== 0) {
          return this.clusters[0].level;
        }
        return -1;
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
        levelUnchange: false,
        fitmap: false,
      };
    },

    watch: {
      clusterMarkers: {
        handler(markers) {
          this.markerChangeHandler(markers);
        },
        deep: true,
      },
      houseMarkers: {
        handler(markers) {
          this.markerChangeHandler(markers);
        },
        deep: true,
      },
      outline: {
        handler() {
          if (this.outline) {
            const bounds = new google.maps.LatLngBounds();
            const [sLat, nLat, wLng, eLng] = this.outline.boundingbox;
            bounds.extend(new google.maps.LatLng(sLat, wLng));
            bounds.extend(new google.maps.LatLng(sLat, eLng));
            bounds.extend(new google.maps.LatLng(nLat, wLng));
            bounds.extend(new google.maps.LatLng(nLat, eLng));
            this.$refs.map.fitBounds(bounds);
            this.shouldSearch = false;
          } else {
            this.shouldSearch = true;
          }
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

      // idle listener
      onIdle() {
        console.log('Map is idle');
        if (!this.outline || !this.outline.geojson.coordinates
          || this.outline.geojson.coordinates.length === 0) {
          this.shouldSearch = true;
        }
        if (this.shouldSearch && this.searchByGeo) {
          console.log('searching');
          if (this.levelUnchange) {
            this.searchByGeo({ box: this.bounds, level: this.level });
          } else {
            this.searchByGeo({ box: this.bounds });
          }
        }
      },

      // zoom listener
      onZoomChanged() {
        console.log('zoom changed');
        this.levelUnchange = false;
        this.fitmap = false;
      },

      // dragend listener
      onDragEnd() {
        console.log('User stop dragging');
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
          this.shouldSearch = false;
          this.fitmap = true;
        }
        // if (this.activeMarker) {
        //   this.activeOverlay.toggleDOM();
        //   this.activeOverlay = null;
        // }

        // const { house } = marker;
        // const { lat, lng } = house.googleLocation.location;
        // const googleLatLng = new google.maps.LatLng(lat, lng);
        // const bounds = new google.maps.LatLngBounds(googleLatLng, googleLatLng);

        // this.activeOverlay = new this.HouseMarker(bounds, this.$refs.map.$mapObject, { house });
        // this.activeMarker = marker;
        // this.activePriceOverlay.remove();
        // this.activePriceOverlay = null;
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

      polygonArea(coordinates) {
        return MapUtil.calculatePolygonArea(coordinates);
      },

      markerChangeHandler(markers) {
        if (this.fitmap) {
          console.log('setting new bounds');
          const bounds = new google.maps.LatLngBounds();
          markers.forEach((marker) => {
            if (marker.type === 'cluster' && this.showCluster) {
              for (let i = 0; i < 4; i += 1) {
                const { lat, lng } = marker.cluster.bbox[i];
                const googleLatLng = new google.maps.LatLng(lat, lng);
                bounds.extend(googleLatLng);
              }
            } else if (marker.type === 'house' && !this.showCluster) {
              console.log('fitting map with houses');
              const { lat, lng } = marker.house.googleLocation.location;
              const googleLatLng = new google.maps.LatLng(lat, lng);
              bounds.extend(googleLatLng);
            }
          });
          this.shouldSearch = false;
          this.$refs.map.fitBounds(bounds);
        }
      },

      /*
       * other methods
       */
    },
  };
</script>
