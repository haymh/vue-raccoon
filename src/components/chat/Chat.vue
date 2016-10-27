<template>
<div class="chat">
  <div class="sidebar">
    <!-- <card></card> -->
    <header class="row">
      <div class="col-xs-2">
        <img class="avatar" :src="user.avatar" alt="" />
      </div>
      <div class="col-xs-10">
        <el-input class="searchbar" size="small" placeholder="搜索">
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </div>
    </header>
    <ChatList :peopleList="peopleList" v-on:openchat="openChat"></Chatlist>
  </div>
  <ChatRoom :room-id="activeRoomId" :userId="userId" :friend="activeFriend" :user="user"></ChatRoom>
</div>
</template>

<style>
.chat {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
}

.sidebar {
  float: left;
  width: 300px;
  color: #f4f4f4;
  background-color: #2e3238;
}
.sidebar header {
  padding: 10px;
}
.sidebar .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.sidebar input {
  color: white;
  background-color: #2e3238;
}
.sidebar,
.ChatRoom {
  height: 100%;
}

.ChatRoom {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}

.ChatList {
  height: 100%;
  overflow-y: scroll;
}

.ChatList ul {
  list-style-type: none;
  padding-left: 0;
}

.ChatList li {
  padding: 12px 15px;
  border-bottom: 1px solid #292C33;
  cursor: pointer;
  transition: background-color 0.1s;
}

.ChatList li:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.ChatList li.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.ChatList .avatar,
.ChatList .name {
  vertical-align: middle;
}

.ChatList .avatar {
  border-radius: 50%;
}

.ChatList .name {
  display: inline-block;
  margin: 0 0 0 15px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { db } from '../../api/fire';
import ChatRoom from './ChatRoom.vue';
import ChatList from './ChatList.vue';


export default {
  name: 'Chat',
  data() {
    return {
      activeRoomId: '',
      activeFriend: null,
      peopleList: [],
    };
  },
  created() {
    this.$bindAsArray('peopleList', db.ref('/users').orderByChild('type').equalTo('agent'));
  },
  computed: {
    ...mapGetters([
      'userId',
      'user',
      'userRooms',
    ]),
  },
  components: {
    ChatRoom,
    ChatList,
  },
  watch: {
  },
  methods: {
    openChat({ roomId, friend }) {
      this.activeRoomId = roomId;
      this.activeFriend = friend;
    },
  },
};
</script>
