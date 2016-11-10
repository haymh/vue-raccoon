<template>
  <div class="ChatList">
    <ul>
      <li v-for="(person, index) in peopleList" :class="{ active: isActive(index) }" @click="openChat(person, index)">
        <div class="columns is-mobile">
          <div class="column is-3">
            <img class="avatar" :alt="person.nickName" :src="person.avatar">
          </div>
          <div class="column is-6">
            <p class="name">{{person.nickName}}</p>
          </div>
          <div class="column is-2">
            <span class="tag is-danger">1</span>
          </div>
          <div class="column is-1">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Block</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';

const roomRef = db.ref('/rooms');


export default {
  name: 'ChatList',
  props: ['peopleList'],
  data() {
    return {
      activeIndex: null,
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'userRooms',
    ]),
  },
  components: {
  },
  watch: {
  },
  methods: {
    createRoom(userId, friendId) {
      // Get a key for a new Post.
      const roomKey = roomRef.push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[`/rooms/${roomKey}`] = {
        members: {},
        createdBy: userId,
        createdAt: timeStamp,
      };
      updates[`/rooms/${roomKey}`].members[userId] = { nickName: 'userId', status: true };
      updates[`/rooms/${roomKey}`].members[friendId] = { nickName: 'friendId', status: false };
      return {
        promise: db.ref().update(updates),
        roomKey,
      };
    },
    addRoomToUser(userId, friendId, roomKey) {
      const updates = {};
      updates[`/userRooms/${userId}/${roomKey}`] = {
        roomName: 'New Chat',
      };

      updates[`/userRooms/${friendId}/${roomKey}`] = {
        roomName: 'New Chat',
      };
      return db.ref().update(updates);
    },
    openChat(friend, index) {
      console.log('open chat', index);
      this.activeIndex = index;
      const roomId = this.roomId(friend);
      if (roomId) {
        this.$emit('openchat', { roomId, friend });
      } else {
        const { promise, roomKey } = this.createRoom(this.userId, friend['.key']);
        promise
        .then(() => this.addRoomToUser(this.userId, friend['.key'], roomKey))
        .then(() => {
          this.$emit('openchat', { roomKey, friend });
        })
        .catch((e) => {
          console.log(e);
        });
      }
    },
    roomId(friend) {
      const res = this.userRooms.filter(room => room.members[friend['.key']] !== undefined);
      if (res.length === 0) {
        return undefined;
      }
      return res[0].roomId;
    },
    isActive(index) {
      console.log(index);
      return this.activeIndex === index;
    },
  },
};
</script>
