import Vue from 'vue';
import { loaded } from 'vue2-google-maps';

const settings = new Vue({
  data: {
    defaultIconSettings: {},
    defaultMapOptions: {},
  },
});

// https://github.com/xkjyeah/vue-google-maps/issues/38#issuecomment-276677389
loaded.then(() => {
  /* google.maps.Size is now available! */
  settings.defaultIconSettings = { url: './static/small_house.png' };
});

export default settings;
