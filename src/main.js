// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import VueFire from 'vuefire';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'bulma/css/bulma.css';
import AwesomeSwiper from 'vue-awesome-swiper';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Element);
Vue.use(VueResource);
Vue.use(VueLazyload, {
  error: 'http://placehold.it/325x250',
  loading: '../static/loading.gif',
  attempt: 2,
});
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
