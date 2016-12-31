<template>
  <div id="app">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <navbar></navbar>
		<transition name="fade" mode="out-in">
			<div class="main">
				<router-view></router-view>
			</div>
		</transition>
  </div>
</template>
<style lang="scss">
$blue: #72d0eb;
$family-serif: "Lato", serif; // Add a serif family
$primary: $blue;
$family-primary: $family-serif; // Use the new serif family
@import "~bulma";
</style>


<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
html, body, #app, .main {
  overflow: hidden;
  height: 100%;
}
.main {
  height: calc(100vh - 50px);
  overflow: scroll;
}

body {
	font-size: 15px;
	background-color: #f2f3f5;
	margin: 0;
	color: #34495e;
}

a {
	color: #34495e;
	text-decoration: none;
}

/*.view {
	margin: 0 auto;
	position: relative;
}*/

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { db, timeStamp } from './api/fire';
import search from './components/Hello.vue';
import Login from './components/login/Login.vue';
import UserInfo from './components/login/UserInfo.vue';
import navbar from './components/navbar.vue';

const peopleListRef = db.ref('/users');
/* eslint-disable no-undef */
export default {
  name: 'App',
  data() {
    return {
      needCreateUser: false,
    };
  },
  components: { search, Login, UserInfo, navbar },
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
