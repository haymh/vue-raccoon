<template>
  <div id="app">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
    <!--<link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet" type="text/css"></link>-->
    <v-app>
      <navbar class="hidden-xs-only"></navbar>
      <main class="main">
        <router-view></router-view>
      </main>
      <BottomNav class="hidden-sm-and-up" :navs="navs"></BottomNav>
    </v-app>
  </div>
</template>
<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
html, body, #app, .main {
  overflow: hidden;
  height: 100%;
}
.main {
  height: calc(100% - 56px);
  overflow-y: scroll;
  margin: auto;
  -webkit-overflow-scrolling: touch;
}

body {
	font-size: 15px;
	background-color: #f2f3f5;
	margin: 0;
  padding: 0;
	color: #34495e;
}

a {
	color: #34495e;
	text-decoration: none;
}
</style>
<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../api/fire';
import Login from '../components/login/Login.vue';
import navbar from './navbar.vue';
import BottomNav from '../components/nav/BottomNav.vue';

const peopleListRef = db.ref('/users');
/* eslint-disable no-undef */
export default {
  name: 'App',
  data() {
    return {
      needCreateUser: false,
      navs: [
        {
          text: 'Main',
          icon: 'home',
          page: '/main',
        },
        {
          text: 'Chat',
          icon: 'chat',
          page: '/chat',
        },
        {
          text: 'Settings',
          icon: 'settings',
          page: '/view1',
        },
      ],
    };
  },
  components: { Login, navbar, BottomNav },
  computed: mapGetters(['user']),
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
              avatar: '../../static/profile.png',
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
                  avatar: '../../static/profile.png',
                },
              );
            });
          }
        });
        // ...
      } else {
        // User is signed out.
        // Do an anonymously sign in
        firebase.auth().signInAnonymously().catch((error) => {
          console.log('error during sign in anonymously', error);
        });
      }
    });
  },
  methods: {
  },
};
</script>
