// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import moment from 'moment';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import VueI18n from 'vue-i18n';
import VueFire from 'vuefire';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue';
import router from './router';
import store from './store';

import locales from './locales';

import { NO_MIN, NO_MAX } from '../components/filter/filter-schema';

Vue.use(Element);
Vue.use(VueResource);
Vue.use(VueLazyload, {
  error: 'http://placehold.it/325x250',
  loading: '../static/loading.gif',
  attempt: 2,
});
Vue.use(VueI18n);
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'en',
  messages: locales, // set locale messages
});
Vue.use(VueFire);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDnhNujTGx-stPRmfg7H1uIL7upFvhMXvQ',
  },
});
console.log('loaded', VueGoogleMaps.loaded);

Vue.filter('formatNumber', (n, p, symbol) => {
  if (!isNaN(parseFloat(n)) && isFinite(n)) {
    const res = n.toFixed(p).replace(/./g, (c, i, a) => {
      if (i && c !== '.' && ((a.length - i) % 3 === 0)) {
        return `,${c}`;
      }
      return c;
    });
    return `${symbol}${res}`;
  }
  return n;
});

Vue.filter('formatAddress', address => `${address.city}, ${address.stateOrProvince} ${address.postalCode}`);

Vue.filter('formatDate', (date, formatString) => moment(date).format(formatString));

Vue.filter('formatChoice', (choice, isMoney = false, prefix = '', suffix = '') => {
  let res = '';
  if (choice === NO_MIN) {
    return 'No min';
  }
  if (choice === NO_MAX) {
    return 'No max';
  }
  if (isMoney) {
    if (choice < 1000000) {
      res = `$${choice / 1000}K`;
    } else {
      res = `$${choice / 1000000}M`;
    }
  } else {
    res = choice;
  }
  return `${prefix}${res}${suffix}`;
});

Vue.filter('safe', (object) => {
  if (object === undefined) {
    return {};
  }
  return object;
});

// TODO: Set this after login


// const Hello = r => resolve => require(['./components/Hello.vue'], resolve);

// // Initialize Firebase
// const config = {
//   apiKey: 'AIzaSyDnhNujTGx-stPRmfg7H1uIL7upFvhMXvQ',
//   authDomain: 'raccoon-c86bb.firebaseapp.com',
//   databaseURL: 'https://raccoon-c86bb.firebaseio.com',
//   storageBucket: 'raccoon-c86bb.appspot.com',
//   messagingSenderId: '198553806411',
// };
// firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  el: '#app',
  render: h => h(App),
});
