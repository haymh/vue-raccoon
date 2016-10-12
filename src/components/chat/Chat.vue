<template>
<div class="chat">
  <div class="sidebar">
    <!-- <card></card> -->
    <div class="list">
      <ul>
        <li v-for="person in peopleList" :class="{ active: false }" @click="openChat(person)">
          <!-- <img class="avatar"  width="30" height="30" :alt="item.user.name" :src="item.user.img"> -->
          <p class="name">{{person['.key']}}</p>
        </li>
      </ul>
    </div>
  </div>
  <ChatRoom :room-id="activeRoomId" :user="user"></ChatRoom>
</div>
</template>

<style scoped>
.chat {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
}

.sidebar,
.main {
  height: 100%;
}

.main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}

.sidebar {
  float: left;
  width: 300px;
  color: #f4f4f4;
  background-color: #2e3238;
}

.list ul {
  list-style-type: none;
}

.list li {
  padding: 12px 15px;
  border-bottom: 1px solid #292C33;
  cursor: pointer;
  transition: background-color 0.1s;
}

.list li:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.list li.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.list .avatar,
.list .name {
  vertical-align: middle;
}

.list .avatar {
  border-radius: 2px;
}

.list .name {
  display: inline-block;
  margin: 0 0 0 15px;
}
</style>
<script>
import { db } from '../../api/fire';
import ChatRoom from './ChatRoom.vue';

const peopleListRef = db.ref('/user');
const userRef = db.ref('/user/-KTNGLIn1MJFdYEPVSpW');
const userRooms = userRef.child('rooms');
const roomRef = db.ref('/room');


export default {
  name: 'Chat',
  data() {
    return {
      activeRoomId: '-KSzSJku0mv6PUoU1EOL',
    };
  },
  components: {
    ChatRoom,
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
          if (this.rooms.filter(room => room.other === person['.key']).length === 0) {
            person.needRoom = true;
          } else {
            person.needRoom = false;
          }
          return person;
        });
      },
    },
  },
  computed: {},
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
};
</script>
