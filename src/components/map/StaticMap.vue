<template>
  <gmap-map style="width: 100%; height: 100%;"
    ref="map"
    :center="center"
    :zoom="zoom"
    @bounds_changed="boundsChanged"
  >
    <gmap-marker
      :position="center"
      :clickable="true"
      :draggable="false"
      @click="onclickMarker"
    ></gmap-marker>
    <div slot="visible">
      <div class="tag is-medium is-primary" style="bottom: 8px; left: 8px; position: absolute;">
        {{address}}
      </div>
    </div>
    <div slot="visible">
      <a class="button" style="top: 8px; right: 8px; position: absolute;"
      @click="showSchool">
        Show School
      </a>
    </div>
  </gmap-map>
</template>

<script>
import API from '../../api';

export default {
  name: 'StaticMap',
  props: ['house'],
  data() {
    return {
      center: this.house.googleLocation.location,
      zoom: 18,
      bounds: null,
      pgPath: [],
      pgvisible: true,
    };
  },
  computed: {
    address() {
      if (this.house) {
        const addr = this.house.address;
        return `${addr.streetNumberNumeric || ''} ${addr.streetName || ''} ${addr.streetSuffix || ''}, ${addr.city || ''},
          ${addr.stateOrProvince || ''}, ${addr.postalCode || ''}`;
      }
      return '';
    },
  },
  mounted() { console.log(this.house.googleLocation.location); },
  methods: {
    onclickMarker() {
      console.log('clicked marker');
      this.zoom = 16;
      this.center = this.house.googleLocation.location;
    },
    boundsChanged(e) {
      console.log('bounds', e.toUrlValue());
      this.bounds = e.toUrlValue();
    },
    showSchool() {
      // checkbounds
      // const lat0 = this.map.getBounds().getNorthEast().lat();
      // const lng0 = this.map.getBounds().getNorthEast().lng();
      // const lat1 = this.map.getBounds().getSouthWest().lat();
      // const lng1 = this.map.getBounds().getSouthWest().lng();
      // if (this.bounds.isEmpty) {
      //   this.zoom = 10;
      //   return;
      // }
      console.log('bounds', this.bounds, this.$refs.map);
      const map = this.$refs.map.$mapObject;
      API.getSchool(this.bounds).then((data) => {
        console.log(data);
        data.forEach((district) => {
          district.geometry = district.geometry[0];
          map.data.addGeoJson(district);
          map.data.setStyle({
            fillColor: 'green',
            fillOpacity: 0.0,
            strokeOpacity: 0.3,
          });
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
