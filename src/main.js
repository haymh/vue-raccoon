// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import VueI18n from 'vue-i18n';
import VueFire from 'vuefire';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'bulma/css/bulma.css';
import AwesomeSwiper from 'vue-awesome-swiper';

import App from './App.vue';
import router from './router';
import store from './store';

import locales from './locales';

Vue.use(Element);
Vue.use(VueResource);
Vue.use(VueLazyload, {
  error: 'http://placehold.it/325x250',
  loading: '../static/loading.gif',
  attempt: 2,
});
Vue.use(VueI18n);
Vue.use(VueFire);
Vue.use(AwesomeSwiper);
Vue.filter('formatNumber', (n, p, symbol) => {
  const res = n.toFixed(p).replace(/./g, (c, i, a) => {
    if (i && c !== '.' && ((a.length - i) % 3 === 0)) {
      return `,${c}`;
    }
    return c;
  });
  return `${symbol}${res}`;
});

// i18n config
Vue.config.lang = 'zh';
Vue.config.fallbackLang = 'en';

// TODO: Set this after login
Vue.http.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE0ODA3NDE4ODQsImV4cCI6MTQ4MDc0MzMyNH0.HR3MKIoHMhK8baiyfMjnKPnEAU8UBbLNDZbOy7Wulic';  // eslint-disable-line

// set locales
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang]);
});

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
  router,
  store,
  el: '#app',
  render: h => h(App),
});
