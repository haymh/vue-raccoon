<template>
  <gmap-map
    :options="mapOptions"
    :center="center"
    :zoom="12"
    @idle="onIdle"
    @click="onMapClicked"
    @dragend="onDragEnd"
    @resize="onZoomChanged"
    @bounds_changed="mapBoundsChanged($event)"
    style="width: 100%; height: 100%"
    ref="map"
  >
    <gmap-cluster :maxZoom="10">
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker.position"
        :clickable="true"
        :icon="mapSettings.defaultIconSettings"
        @click="onMarkerClick(marker)"
        @mouseover="onMarkerMouseover(marker)"
        @mouseout="onMarkerMouseout"
      ></gmap-marker>
    </gmap-cluster>
  </gmap-map>
</template>

<script>
  import 'marker-clusterer-plus';
  import { loaded } from 'vue2-google-maps';
  import mapSettings from './mapSettings';
  import HouseMarkerClassGenerator from './HouseMarker';
  import PriceOverlayClassGenerator from './PriceOverlay';

  export default {
    props: ['houseData', 'searchByGeo'],
    computed: {
      houses() {
        return this.houseData.filter(h => h.googleLocation
        && h.googleLocation.location
        && h.googleLocation.location.lat && h.googleLocation.location.lng);
      },

      markers() {
        return this.houses.map(house => ({
          position: house.googleLocation.location,
          house,
        }));
      },
    },

    data() {
      return {
        center: { lat: 32.856385, lng: -117.202936 },
        mapSettings,
        mapOptions: {},
      };
    },

    watch: {
      markers: {
        handler(markers) {
          if (!this.searchingByGeo) {
            console.log('setting new bounds');
            const bounds = new google.maps.LatLngBounds();
            markers.forEach((marker) => {
              const { lat, lng } = marker.house.googleLocation.location;
              const googleLatLng = new google.maps.LatLng(lat, lng);
              bounds.extend(googleLatLng);
            });
            this.fittingBounds = true;
            this.$refs.map.fitBounds(bounds);
          } else { this.searchingByGeo = false; }
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
      this.buildMapControls();
      this.fittingBounds = false;
      this.searchingByGeo = true;
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
        if (this.shouldSearchByGeo && this.searchByGeo) {
          this.searchByGeo(this.bounds);
          this.shouldSearchByGeo = false;
          this.searchingByGeo = true;
        }
      },

      // zoom listener
      onZoomChanged() {
        console.log('zoom changed');
        if (!this.fittingBounds) {
          this.shouldSearchByGeo = true;
        } else { this.fittingBounds = false; }
      },

      // dragend listener
      onDragEnd() {
        console.log('User stop dragging');
        this.shouldSearchByGeo = true;
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
        const { house } = marker;
        const { lat, lng } = house.googleLocation.location;
        const googleLatLng = new google.maps.LatLng(lat, lng);
        const bounds = new google.maps.LatLngBounds(googleLatLng, googleLatLng);

        this.activeOverlay = new this.HouseMarker(bounds, this.$refs.map.$mapObject, { house });
        this.activeMarker = marker;
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
        if (!this.activeMarker) {
          this.activePriceOverlay.remove();
          this.activePriceOverlay = null;
        }
      },

      /*
       * other methods
       */
      buildMapControls() {
        const saveBtn = document.createElement('a');
        saveBtn.className = 'button is-danger';
        saveBtn.innerHTML = 'save search';
        saveBtn.style.margin = '8px';
        saveBtn.addEventListener('click', () => {
          console.log('save');
        });
        saveBtn.index = 1;
      },
    },
  };
</script>
