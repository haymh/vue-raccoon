import Vue from 'vue';
import { loaded } from 'vue2-google-maps';

const settings = new Vue({
  data: {
    defaultIconSettings: {},
    defaultClusterIconSettings: {},
    defaultMapOptions: {},
  },
});

// https://github.com/xkjyeah/vue-google-maps/issues/38#issuecomment-276677389
loaded.then(() => {
  /* google.maps.Size is now available! */
  settings.house = { url: './static/small_house.png' };
  settings.cluster3 = { url: './static/c3.png', anchor: { x: 32, y: 32 } };
  settings.cluster2 = { url: './static/c2.png', anchor: { x: 24, y: 24 } };
  settings.cluster1 = { url: './static/c1.png', anchor: { x: 18, y: 18 } };
});

export default settings;
