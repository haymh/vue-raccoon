<template>
  <div id='gmap' class='gmap'></div>
</template>

<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
<script>
  import HouseMarkerClassGenerator from './HouseMarker';
  import PriceOverlayClassGenerator from './PriceOverlay';
  import MarkerClusterer from './markerclusterer';

  const CLUSTER_LEVEL = 11;

  export default {
    props: ['houses', 'searchByGeo'],
    watch: {
      houses: {
        handler(newValues, oldValues) {
          if (this.mapReady) {
            this.updateMarkers(newValues, oldValues);
            this.updateMap();
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
          const { lat, lng } = this.houses[0].googleLocation.location;
          center = { lat, lng };
        }

        this.map = new google.maps.Map(this.$el, {
          center,
          zoom: 13,
        });

        this.HouseMarker = HouseMarkerClassGenerator();
        this.PriceOverlay = PriceOverlayClassGenerator();
        this.markers = [];

        // Add idle listener
        google.maps.event.addListener(this.map, 'idle', () => {
          if (!this.mapReady) {
            this.buildMarkersAndCluster();
            this.applyMarkerClickHandler();
          }
          this.mapReady = true;

          console.log('Map is idle');
          if (this.shouldSearchByGeo && this.searchByGeo) {
            console.log('searching by geo');
            const lat = this.map.getCenter().lat();
            const lng = this.map.getCenter().lng();
            this.searchByGeo(lat, lng);
            this.shouldSearchByGeo = false;
            this.searchingByGeo = true;
          }
        });

        // Add zoom listener
        this.map.addListener('zoom_changed', () => {
          console.log('zoom changed');
          if (!this.fittingBounds) {
            this.shouldSearchByGeo = true;
          } else { this.fittingBounds = false; }
        });

        this.map.addListener('dragend', () => {
          console.log('User stop dragging');
          this.shouldSearchByGeo = true;
        });

        this.map.addListener('click', () => {
          if (this.activeMarker) {
            this.activeMarker.overlay.toggleDOM();
            this.activeMarker = null;
          }
        });
      },

      updateMap() {
        if (this.map.getZoom() > CLUSTER_LEVEL) {
          if (this.markerCluster) {
            this.markerCluster.clearMarkers();
            this.markerCluster = null;
            this.showMarkersInView();
          }
          this.applyMarkerClickHandler();
        } else if (!this.markerCluster) {
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
          console.log('created new cluster');
        }
      },

      buildMarkersAndCluster() {
        this.marksers = this.houses.map((house) => {
          const { lat, lng } = house.googleLocation.location;
          const marker = new google.maps.Marker({
            position: { lat, lng },
            icon: '/static/small_house.png',
          });
          marker.house = house;
          return marker;
        });

        this.markerCluster = new MarkerClusterer(
          this.map,
          this.markers,
          {
            imagePath: './static/m',
          },
        );
      },

      updateMarkers(newHouses, oldHouses) {
        const added = newHouses.filter(
          newHouse => oldHouses.every(house => house._id !== newHouse._id),
        );
        console.log('added: -> ', added);

        const removed = oldHouses.filter(
          house => newHouses.every(newHouse => newHouse._id !== house._id),
        );
        console.log('removed: -> ', removed);

        this.markers = this.markers.concat(
          added.map((house) => {
            const { lat, lng } = house.googleLocation.location;
            const marker = new google.maps.Marker({
              position: { lat, lng },
              icon: '/static/small_house.png',
            });
            marker.house = house;
            marker.setMap(this.map);
            if (this.markerCluster) this.markerCluster.addMarker(marker);
            return marker;
          }),
        );

        removed.forEach((house) => {
          const matchedIndex = this.markers.findIndex(
            marker => (marker.house._id === house._id),
          );
          const marker = this.markers[matchedIndex];
          marker.setMap(null);
          if (this.markerCluster) this.markerCluster.removeMarker(marker);
          this.markers.splice(matchedIndex, 1);
        });

        if (!this.searchingByGeo) {
          console.log('setting new bounds');
          const bounds = new google.maps.LatLngBounds();
          this.markers.forEach((marker) => {
            bounds.extend(marker.getPosition());
          });
          this.fittingBounds = true;
          this.map.fitBounds(bounds);
        } else { this.searchingByGeo = false; }
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

      showMarkersInView() {
        if (this.map.getBounds() && this.map.getZoom() > CLUSTER_LEVEL) {
          this.markers.filter(
            marker => !marker.getMap() &&
                      this.map.getBounds().contains(marker.getPosition()))
                      .forEach(marker => marker.setMap(this.map));

          this.markers.filter(
            marker => marker.getMap() &&
                      !this.map.getBounds().contains(marker.getPosition()))
                      .forEach(marker => marker.setMap(null));

          this.markers.forEach((marker) => {
            marker.setMap(this.map);
          });
        }
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
