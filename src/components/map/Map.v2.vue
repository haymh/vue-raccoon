<template>
  <gmap-map
    :options="mapOptions"
    :center="center"
    :zoom="12"
    @idle="onIdle"
    @click="onMapClicked"
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
    },

    methods: {
      /*
       * Listeners
       */
      googleMapLoaded() {
        // this.searchByGeo({ box: this.$refs.map.$mapObject.getBounds() });
      },

      // idle listener
      onIdle() {
        console.log('Map is idle');
        this.searchByGeo(this.bounds);
      },

      // zoom listener
      onZoomChanged() {

      },

      // dragend listener
      onDragEnd() {

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
