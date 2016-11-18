<template>
  <div id='gmap' class='gmap'></div>
</template>

<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
<script>
  import HouseMarkerClassGenerator from './HouseMarker';
  import PriceOverlayClassGenerator from './PriceOverlay';
  import MarkerClusterer from './markerclusterer';

  export default {
    props: ['houses'],
    data() {
      return {
        things: 'cool',
      };
    },

    watch: {
      houses: {
        handler() {
          if (this.mapReady) {
            this.resetMarkers();
          }
        },
        deep: false,
      },
    },

    created() {
      this.mapReady = false;
      const googleMapScript = document.createElement('SCRIPT');
      const baseUrl = 'https://maps.googleapis.com/maps/api/js';
      const url = `${baseUrl}?key=AIzaSyDnhNujTGx-stPRmfg7H1uIL7upFvhMXvQ&callback=googleMapsInit`;
      window.googleMapsInit = () => {
        this.googleMapLoaded();
      };
      googleMapScript.setAttribute('src', url);
      googleMapScript.setAttribute('async', '');
      googleMapScript.setAttribute('defer', '');
      document.body.appendChild(googleMapScript);

      const clusterScript = document.createElement('SCRIPT');
      const clusterUrl = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
      clusterScript.setAttribute('src', clusterUrl);
      document.body.appendChild(clusterScript);
    },

    methods: {
      googleMapLoaded() {
        this.mapReady = true;
        this.map = new google.maps.Map(this.$el, {
          center: { lat: 32.856385, lng: -117.202936 },
          zoom: 13,
        });

        this.HouseMarker = HouseMarkerClassGenerator();
        this.PriceOverlay = PriceOverlayClassGenerator();
        this.markersFromHouses();
        this.showMarkersInView();

        this.applyMarkerClickHandler();

        this.map.addListener('center_changed', this.showMarkersInView);

        this.map.addListener('zoom_changed', () => {
          console.log('Zoom changed! Current zoom -> ', this.map.getZoom());
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
        if (this.map.getZoom() > 12) {
          this.markers.filter(
            marker => !marker.getMap() &&
                      this.map.getBounds().contains(marker.getPosition()))
                      .forEach(marker => marker.setMap(this.map));

          this.markers.filter(
            marker => marker.getMap() &&
                      !this.map.getBounds().contains(marker.getPosition()))
                      .forEach(marker => marker.setMap(null));
        }
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
              const [lat, lng] = house.location.coordinates;
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
          const marker = new google.maps.Marker({
            position: { lat: house.location.coordinates[0], lng: house.location.coordinates[1] },
            icon: './static/small_house.png',
          });
          marker.house = house;
          return marker;
        });
      },

      createOverlayFromMarker(marker) {
        const house = marker.house;
        const [lat, lng] = house.location.coordinates;
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
