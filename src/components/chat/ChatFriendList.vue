<template>
  <v-list>

    <v-list-item>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>history</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Recent
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <ChatListRoomItem v-for="(room, index) in userRooms" :room="room" :class="{ active: isActive(room.roomId) }" :key="room.roomId"
      @click.native="openChatByRoom(room, index)">
    </ChatListRoomItem>

    <!--<v-subheader>Suggested</v-subheader>-->
    
    <v-list-item>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Suggested
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>

    <template v-for="(item, i) in peopleList">
      <v-list-item @click="openChat(item, i)" :key="i">
        <v-list-tile>
          <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.nickname }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </template>
  </v-list>



<!--<div class="ChatList">
  <aside class="menu">
    <p class="menu-label">
      Recent
    </p>
    <ul class="menu-list" is="transition-group">
      <ChatListRoomItem
        v-for="(room, index) in userRooms"
        :room="room"
        :class="{ active: isActive(room.roomId) }"
        :key="room.roomId"
        @click.native="openChatByRoom(room, index)">
      </ChatListRoomItem>
    </ul>
    <p class="menu-label">
      Suggested
    </p>
    <ul class="menu-list" is="transition-group">
      <li v-for="(person, index) in peopleList"
        :class="{ active: isActive(person['.key']) }"
        :key="person['.key']"
        @click="openChat(person, index)">
        <div class="columns is-mobile">
          <div class="column is-3">
            <img class="avatar" :alt="person.nickname" :src="person.avatar">
          </div>
          <div class="column is-6">
            <p class="name">{{person.nickname}}</p>
          </div>
          <div class="column is-2">
              <span v-show="showUnread(person)" class="tag is-danger">{{ unreadCount(person) }}</span> 
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
  </aside>
</div>-->
</template>

<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';
import ChatListRoomItem from './ChatListRoomItem.vue';

const roomRef = db.ref('/rooms');

export default {
  name: 'ChatFriendList',
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
      this.activeIndex = friend['.key'];
      const roomId = this.roomId(friend);
      if (roomId) {
        this.$emit('openchat', roomId, friend);
      } else {
        const { promise, roomKey } = this.createRoom(this.userId, friend['.key']);
        promise
          .then(() => this.addRoomToUser(this.userId, friend['.key'], roomKey))
          .then(() => {
            this.$emit('openchat', roomKey, friend);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    openChatByRoom(room, index) {
      console.log('open chat by room', room.roomId, index);
      this.activeIndex = room.roomId;
      this.$emit('openchat', room.roomId, null);
    },
    roomId(friend) {
      const res = this.userRooms.filter(room => room.members[friend['.key']] !== undefined);
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
