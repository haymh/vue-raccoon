<template>
  <v-list>
    <template v-for="(list, index) in friendList">
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>{{list.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{list.title}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <template v-if="list.type === 'room'">
        <ChatListRoomItem
          v-for="(room, ri) in list.list"
          :peopleTable="peopleTable"
          :room="room"
          :active="isActive(room.roomId)"
          :key="room.roomId"
          @clicked="openChatByRoom">
        </ChatListRoomItem>
      </template>
      <template v-if="list.type === 'people'">
        <v-list-tile v-for="(item, i) in list.list" @click="openChat(item, i)" :key="i">
          <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.nickname }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';
import ChatListRoomItem from './ChatListRoomItem.vue';

const roomRef = db.ref('/rooms');

export default {
  name: 'ChatFriendList',
  props: {
    friendList: {
      type: Array,
      default() {
        return [
          {
            type: 'room',
            title: 'recent',
            list: [],
            icon: 'history',
          },
          {
            type: 'people',
            title: 'contact',
            list: [],
            icon: 'people',
          },
        ];
      },
    },
    peopleTable: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: null,
    };
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    rooms() {
      return this.friendList
        .filter(list => list.type === 'room')
        .reduce((r, list) => r.concat(list.list), []);
    },
  },
  components: {
    ChatListRoomItem,
  },
  watch: {
  },
  methods: {
    createRoom(userId, friendId) {
      // Get a key for a new Post.
      const roomKey = roomRef.push().key;
      console.log('createRoom, roomKey', roomKey);

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[`/rooms/${roomKey}`] = {
        members: {},
        createdBy: userId,
        createdAt: timeStamp,
      };
      updates[`/rooms/${roomKey}`].members[userId] = { nickname: 'userId' };
      updates[`/rooms/${roomKey}`].members[friendId] = { nickname: 'friendId' };
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
      const roomId = this.roomId(friend);
      if (roomId) {
        this.activeIndex = roomId;
        this.$emit('openchat', roomId, friend);
      } else {
        const { promise, roomKey } = this.createRoom(this.userId, friend['.key']);
        promise
          .then(() => this.addRoomToUser(this.userId, friend['.key'], roomKey))
          .then(() => {
            this.activeIndex = roomKey;
            this.$emit('openchat', roomKey, friend);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    openChatByRoom(roomId, friend) {
      console.log('open chat by room', roomId, friend);
      this.activeIndex = roomId;
      this.$emit('openchat', roomId, friend);
    },
    roomId(friend) {
      const res = this.rooms.filter(room => room.members[friend['.key']] !== undefined);
      if (res.length === 0) {
        return undefined;
      }
      return res[0].roomId;
    },
    isActive(key) {
      return this.activeIndex === key;
    },
  },

};
</script>
