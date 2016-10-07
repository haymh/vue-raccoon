<template>
  <div>
    <pre> {{ user }} </pre>
    <pre> {{ rooms }} </pre>
    <ul>
      <li v-for="person in peopleList">
        <el-button @click.native="openChat(person)">
          {{ person['.key'] }}
        </el-button>
      </li>
    </ul>
  </div>
</template>
<script>
import firebase from 'firebase';
import Vue from 'vue';
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDnhNujTGx-stPRmfg7H1uIL7upFvhMXvQ',
  authDomain: 'raccoon-c86bb.firebaseapp.com',
  databaseURL: 'https://raccoon-c86bb.firebaseio.com',
  storageBucket: 'raccoon-c86bb.appspot.com',
  messagingSenderId: '198553806411',
};
firebase.initializeApp(config);
const db = firebase.database();
const peopleListRef = db.ref('/user');
const userRef = db.ref('/user/-KTNGLIn1MJFdYEPVSpW');
const userRooms = userRef.child('rooms');
const roomRef = db.ref('/room');


export default Vue.extend({
  data: {
  },
  firebase: {
    peopleList: peopleListRef,
    user: {
      source: userRef,
      asObject: true,
    },
    rooms: userRooms,
  },
  watch: {
    peopleList: {
      handler() {
        this.peopleList.map((person) => {
          if (this.rooms.filter((room) => room.other === person['.key']).length === 0) {
            person.needRoom = true;
          } else {
            person.needRoom = false;
          }
          return person;
        });
      },
    },
  },
  computed: {
  },
  methods: {
    createRoom(userId, friendId) {
      // Get a key for a new Post.
      const roomKey = roomRef.push().key;
      const userRoomKey = userRooms.push().key;
      const friendRoomKey = peopleListRef.child(friendId).child('rooms').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[`/room/${roomKey}`] = {
        messages: [],
        createdBy: userId,
      };

      updates[`/user/${userId}/rooms/${userRoomKey}`] = {
        other: friendId,
        status: false,
        unreadCount: 0,
      };

      updates[`/user/${friendId}/rooms/${friendRoomKey}`] = {
        other: userId,
        status: false,
        unreadCount: 0,
      };
      return db.ref().update(updates);
    },
    openChat(friend) {
      console.log(friend['.key'], 'needChat?', friend.needRoom);
      if (friend.needRoom) {
        this.createRoom(this.user['.key'], friend['.key']).then(() => {
          console.log('cao ni ma!!!!!!!!!!!');
        });
      }
    },
  },
});
</script>
