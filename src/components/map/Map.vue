<template>
  <div id='gmap' ></div>
</template>

<script>
  import { loaded } from 'vue2-google-maps';

  import HouseMarkerClassGenerator from './HouseMarker';
  import PriceOverlayClassGenerator from './PriceOverlay';
  import MarkerClusterer from './markerclusterer';

  const CLUSTER_LEVEL = 11;

  export default {
    props: ['houseData', 'searchByGeo'],
    computed: {
      houses() {
        return this.houseData.filter(h => h.googleLocation
        && h.googleLocation.location
        && h.googleLocation.location.lat && h.googleLocation.location.lng);
      },
    },
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
      this.mapScriptReady = false;
      loaded.then(() => {
        this.mapScriptReady = true;
        this.googleMapLoaded();
      });
      if (!document.getElementById('cluster-script')) {
        this.clusterScriptReady = false;
        const clusterScript = document.createElement('SCRIPT');
        const clusterUrl = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';
        clusterScript.setAttribute('src', clusterUrl);
        clusterScript.setAttribute('id', 'cluster-script');
        document.body.appendChild(clusterScript);
      } else this.clusterScriptReady = true;
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
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        });

        this.HouseMarker = HouseMarkerClassGenerator();
        this.PriceOverlay = PriceOverlayClassGenerator();
        this.markers = [];

        this.buildMapControls();

        // Add idle listener
        google.maps.event.addListener(this.map, 'idle', () => {
          if (!this.mapReady) {
            this.buildMarkersAndCluster();
            this.applyMarkerClickHandler(this.markers);
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

        const addedMarkers = added.map((house) => {
          const { lat, lng } = house.googleLocation.location;
          const marker = new google.maps.Marker({
            position: { lat, lng },
            icon: '/static/small_house.png',
          });
          marker.house = house;
          marker.setMap(this.map);
          if (this.markerCluster) this.markerCluster.addMarker(marker);
          return marker;
        });

        this.markers = this.markers.concat(addedMarkers);

        removed.forEach((house) => {
          const matchedIndex = this.markers.findIndex(
            marker => (marker.house._id === house._id),
          );
          const marker = this.markers[matchedIndex];
          marker.setMap(null);
          if (this.markerCluster) this.markerCluster.removeMarker(marker);
          this.markers.splice(matchedIndex, 1);
        });

        if (addedMarkers.length) this.applyMarkerClickHandler(addedMarkers);

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

      applyMarkerClickHandler(markers) {
        markers.forEach((marker) => {
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
                type: 'hoverHouse',
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

      buildMapControls() {
        const saveBtn = document.createElement('a');
        saveBtn.className = 'button is-danger';
        saveBtn.innerHTML = 'save search';
        saveBtn.style.margin = '8px';
        saveBtn.addEventListener('click', () => {
          console.log('save');
        });
        saveBtn.index = 1;
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(saveBtn);
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
