// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import moment from 'moment';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import VueI18n from 'vue-i18n';
import VueFire from 'vuefire';
import * as VueGoogleMaps from 'vue2-google-maps';

import firebase from 'firebase';
import { db, timeStamp } from '../api/fire';

import App from './App.vue';
import router from './router';
import store from './store';

import locales from './locales';

import { NO_MIN, NO_MAX } from '../components/filter/filter-schema';

Vue.use(Vuetify);
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
  created() {
    // add event listener for auth state
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User signed in!', user);
        // User is signed in.
        const id = user.uid;
        const isTemp = user.isAnonymous;
        // Change user online status
        const userPresenceRef = db.ref(`/presence/${id}`);
        db.ref('.info/connected').on('value', (snapshot) => {
          if (snapshot.val()) {
            userPresenceRef.onDisconnect().set(false); // or remove this node
            userPresenceRef.set(true);
          }
        });
        const peopleListRef = db.ref('/users');
        peopleListRef.child(id).on('value', (userProfile) => {
          if (userProfile.val() !== null) {
            // user exists
            // read user profile
            console.log('User exists, isTemp', isTemp);
            let displayName = user.displayName;
            if (!displayName) {
              if (user.providerData[0]) {
                displayName = user.providerData[0].displayName;
              } else {
                displayName = 'Visitor';
              }
            }
            this.$store.dispatch('setUser', {
              id,
              ...userProfile.val(),
              isTemp,
              displayName,
            });
            this.$router.push('/main');
            // read user generated data
            // db.ref(`/buyerData/${id}`).on('value', (buyerData) => {
            //   console.log(buyerData.val());
            //   this.$store.dispatch('setUserData', {
            //     favoriteHouses: [...(buyerData.val().favoriteHouses || [])],
            //     searches: [...(buyerData.val().searches || [])],
            //   });
            // });
            // read userRooms
            db.ref(`/userRooms/${id}`).on('value', (userRooms) => {
              const userRoomsRes = userRooms.val();
              if (userRoomsRes !== null) {
                /* eslint-disable no-restricted-syntax */
                for (const key in userRooms.val()) {
                  /* eslint-disable no-prototype-builtins */
                  if (userRoomsRes.hasOwnProperty(key)) {
                    // query room members
                    db.ref(`/rooms/${key}`).once('value', (roomRes) => {
                      const room = roomRes.val();
                      if (room) {
                        this.$store.dispatch('upsertRoom', { roomId: key, ...room });
                      }
                    });
                  }
                }
              }
            });
          } else {
            // user doesn't exists
            // create a user profile
            console.log('creating user ', id);
            const updates = {};
            updates[`/users/${id}`] = {
              type: 'buyer',
              nickname: '',
              createdAt: timeStamp,
              avatar: '/static/profile.png',
            };
            // create a buyer data
            updates[`/buyerData/${id}`] = {
              lastUpdate: timeStamp,
            };
            db.ref().update(updates).then(() => {
              this.$store.dispatch('setUser',
                {
                  id,
                  isTemp: true,
                  displayName: 'Visitor',
                  favoriteHouses: [],
                  searches: [],
                  userRooms: [],
                  avatar: '/static/profile.png',
                },
              );
            });
            this.$router.push('/main');
          }
        });
        // ...
      }
    });
  },
  el: '#app',
  render: h => h(App),
});
