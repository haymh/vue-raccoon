// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';

Vue.use(Element);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueFire);

// const Hello = r => resolve => require(['./components/Hello.vue'], resolve);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/hello', component: require('./components/Hello.vue') },
    { path: '/view1', component: require('./components/view1.vue') },
    { path: '/chat', component: require('./components/chat/Chat.vue') },
  ],
});

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
  el: '#app',
  render: h => h(App),
});
