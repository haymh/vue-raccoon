<template>
  <div id="app">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
    <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet" type="text/css"></link>
    <v-app>
      <SideBar class="hidden-xs-only"></SideBar>
      <NavBar class="hidden-xs-only"></NavBar>
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
html {
  padding: 0 !important;
}
.main {
  height: calc(100% - 56px);
  overflow-y: auto;
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
.section {
  background-color: #fafafa;
}
</style>
<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../api/fire';
import Login from '../components/login/Login.vue';
import UserInfo from '../components/login/UserInfo.vue';
import { NavBar, SideBar, AppFooter } from './components/layout';
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
          text: 'Dashboard',
          icon: 'dashboard',
          page: '/dashboard',
        },
        {
          text: 'Search',
          icon: 'search',
          page: '/search',
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
  components: { Login, UserInfo, NavBar, SideBar, AppFooter, BottomNav },
  computed: {
    ...mapGetters(['user']),
  },
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
            this.$store.dispatch('setUserProfile', { id, ...userProfile.val() });
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
              isTemp,
              type: 'buyer',
              nickname: 'Visitor',
              createdAt: timeStamp,
              lastLogin: timeStamp,
              email: user.email,
              displayName: user.displayName,
            };
            // create a buyer data
            updates[`/buyerData/${id}`] = {
              lastUpdate: timeStamp,
            };
            db.ref().update(updates).then(() => {
              this.$store.dispatch('setUser',
                {
                  id,
                  isTemp,
                  nickname: 'Visitor',
                  email: user.email,
                  displayName: user.displayName,
                  favoriteHouses: [],
                  searches: [],
                  userRooms: [],
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
