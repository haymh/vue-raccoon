<template>
  <div id='gmap' class='gmap'></div>
</template>

<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
<script>
  import HouseMarkerClassGenerator from './HouseMarker';
  import PriceOverlayClassGenerator from './PriceOverlay';
  import MarkerClusterer from './markerclusterer';

  export default {
    props: ['houses', 'mapCenterChanged'],
    data() {
      return {};
    },

    watch: {
      houses: {
        handler(val) {
          console.log('map getting new houses -> ', val);
          if (this.mapReady) {
            this.resetMarkers();
          }
        },
        deep: true,
      },
    },

    created() {
      if (!document.getElementById('google-map-script')) {
        this.mapScriptReady = false;
        const googleMapScript = document.createElement('SCRIPT');
        const baseUrl = 'https://maps.googleapis.com/maps/api/js';
        const url = `${baseUrl}?key=AIzaSyDnhNujTGx-stPRmfg7H1uIL7upFvhMXvQ&callback=googleMapsInit`;
        window.googleMapsInit = () => {
          this.mapScriptReady = true;
          if (this.$el) this.googleMapLoaded();
        };
        googleMapScript.setAttribute('src', url);
        googleMapScript.setAttribute('async', '');
        googleMapScript.setAttribute('defer', '');
        googleMapScript.setAttribute('id', 'google-map-script');
        document.body.appendChild(googleMapScript);

        const clusterScript = document.createElement('SCRIPT');
        const clusterUrl = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
        clusterScript.setAttribute('src', clusterUrl);
        document.body.appendChild(clusterScript);
      } else this.mapScriptReady = true;
    },

    mounted() {
      if (this.mapScriptReady && !this.mapReady) this.googleMapLoaded();
    },

    methods: {
      googleMapLoaded() {
        let center = { lat: 32.856385, lng: -117.202936 };
        if (this.houses.length === 1) {
          const [lat, lng] = this.houses[0].location.coordinates;
          center = { lat, lng };
        }

        this.mapReady = true;
        this.map = new google.maps.Map(this.$el, {
          center,
          zoom: 13,
        });

        this.HouseMarker = HouseMarkerClassGenerator();
        this.PriceOverlay = PriceOverlayClassGenerator();

        google.maps.event.addListener(this.map, 'idle', () => {
          this.markersFromHouses();
          this.showMarkersInView();
          this.applyMarkerClickHandler();

          if (this.mapCenterChanged) {
            const lat = this.map.getCenter().lat();
            const lng = this.map.getCenter().lng();
            this.mapCenterChanged(lat, lng);
          }
        });

        // this.map.addListener('center_changed', this.mapCenterChanged);

        this.map.addListener('zoom_changed', () => {
          if (this.map.getZoom() <= 12 && !this.markerCluster) {
            if (this.activeMarker) {
              this.activeMarker.overlay.toggleDOM();
              this.activeMarker = null;
            }
            this.markerCluster = new MarkerClusterer(
              this.map,
              this.markers,
              {
                imagePath: './static/m',
              },
            );
          } else if (this.map.getZoom() > 12) {
            if (this.markerCluster) {
              this.markerCluster.clearMarkers();
              this.markerCluster = null;
            }
            this.showMarkersInView();
          }
        });

        this.map.addListener('click', () => {
          if (this.activeMarker) {
            this.activeMarker.overlay.toggleDOM();
            this.activeMarker = null;
          }
        });
      },

      showMarkersInView() {
      //  if (this.map.getBounds() && this.map.getZoom() > 12) {
        this.markers.filter(
          marker => !marker.getMap() &&
                    this.map.getBounds().contains(marker.getPosition()))
                    .forEach(marker => marker.setMap(this.map));

        this.markers.filter(
          marker => marker.getMap() &&
                    !this.map.getBounds().contains(marker.getPosition()))
                    .forEach(marker => marker.setMap(null));
      //  }
      },

      resetMarkers() {
        // remove all markers
        if (this.markers) {
          this.markers.forEach((marker) => {
            marker.setMap(null);
          });
        }

        this.markersFromHouses();
        this.showMarkersInView();

        this.applyMarkerClickHandler();
      },

      applyMarkerClickHandler() {
        this.markers.forEach((marker) => {
          marker.addListener('click', () => {
            if (this.activePriceOverlay &&
                this.activePriceOverlay.marker === marker) {
              this.activePriceOverlay.remove();
              this.activePriceOverlay = null;
            }

            if (this.activeMarker !== marker) {
              if (this.activeMarker) this.activeMarker.overlay.toggleDOM();
              this.activeMarker = marker;
              this.$store.dispatch({
                type: 'selectHouse',
                house: marker.house,
              });
              this.createOverlayFromMarker(marker);
            }
          });

          marker.addListener('mouseover', () => {
            if (marker !== this.activeMarker) {
              const house = marker.house;
              const { lat, lng } = house.googleLocation.location;
              const googleLatLng = new google.maps.LatLng(lat, lng);
              const bounds = new google.maps.LatLngBounds(googleLatLng, googleLatLng);

              this.activePriceOverlay = new this.PriceOverlay(bounds, this.map, marker, {
                house,
              });
            }
          });

          marker.addListener('mouseout', () => {
            if (marker !== this.activeMarker) {
              this.activePriceOverlay.remove();
              this.activePriceOverlay = null;
            }
          });
        });
      },

      markersFromHouses() {
        this.markers = this.houses.map((house) => {
          const { lat, lng } = house.googleLocation.location;
          const marker = new google.maps.Marker({
            position: { lat, lng },
            icon: '/static/small_house.png',
          });
          marker.house = house;
          return marker;
        });
      },

      createOverlayFromMarker(marker) {
        const house = marker.house;
        const { lat, lng } = house.googleLocation.location;
        const googleLatLng = new google.maps.LatLng(lat, lng);
        const bounds = new google.maps.LatLngBounds(googleLatLng, googleLatLng);

        marker.overlay = new this.HouseMarker(bounds, this.map, { house });
      },
    },
  };
</script>

<style scoped>
  .gmap {
    width: 100%;
    height: 100%;
  }
</style>
