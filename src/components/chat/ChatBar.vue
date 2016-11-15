<template>
  <div class="ChatBar">
    <div class="ChatBarList">
      <div class="toggle-bar" @click="toggleChat()" :style="{ 'background-color': toggleBarColor }">
        <p class="subtitle">Chat</p>
      </div>
      <div class="" :style="{ display: chatPanelDisplay }">
        <ChatList :peopleList="peopleList" v-on:openchat="openChat"></ChatList>
      </div>
    </div>
    <div class="ChatBarRoom" :style="{ display: chatRoomBarDisplay }">
      <div class="toggle-bar" @click="toggleRoom()" :style="{ 'background-color': toggleBarColor }">
        <p class="subtitle">Room</p>
      </div>
      <div class="" :style="{ display: chatRoomDisplay }">
        <ChatRoom :room-id="activeRoomId" :userId="userId" :user="user"></ChatRoom>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '../../api/fire';
import ChatRoom from './ChatRoom.vue';
import ChatList from './ChatList.vue';

export default {
  name: 'ChatBar',
  data() {
    return {
      chatPanelOpen: false,
      chatPanelDisplay: 'none',
      chatRoomOpen: false,
      chatRoomBarDisplay: 'none',
      chatRoomDisplay: 'none',
      toggleBarColor: 'white',
      activeRoomId: '',
      activeFriend: null,
    };
  },
  created() {
    this.$bindAsArray('peopleList', db.ref('/users').orderByChild('type').equalTo('agent'));
  },
  computed: {
    ...mapGetters([
      'userId',
      'user',
    ]),
  },
  components: {
    ChatRoom,
    ChatList,
  },
  methods: {
    toggleChat() {
      this.chatPanelOpen = !this.chatPanelOpen;
      if (this.chatPanelOpen) {
        this.chatPanelDisplay = 'block';
        this.toggleBarColor = '#20A0FF';
      } else {
        this.chatPanelDisplay = 'none';
        this.toggleBarColor = 'white';
      }
      console.log('open', this.chatPanelDisplay, this.chatPanelOpen);
    },
    toggleRoom() {
      this.chatRoomOpen = !this.chatRoomOpen;
      if (this.chatRoomOpen) {
        this.chatRoomDisplay = 'block';
      } else {
        this.chatRoomDisplay = 'none';
      }
    },
    openChat({ roomId, friend }) {
      console.log('openChat');
      this.activeRoomId = roomId;
      this.activeFriend = friend;
      this.chatRoomBarDisplay = 'block';
      this.chatRoomDisplay = 'block';
    },
  },
};
</script>

<style>
.ChatBar .ChatBarList {
  position: fixed;
  bottom: 0;
  left: 40px;
  width: 300px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 4px;
}
.ChatBar .toggle-bar {
  display: block;
  overflow: hidden;
  cursor: pointer;
  height: 35px;
  padding: 2px 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.ChatBar .toggle-bar p {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.ChatBar .ChatList {
  min-height: 300px;
  margin-top: 1px;
}
.ChatBar .ChatList ul {
  list-style-type: none;
  padding-left: 0;
}
.ChatBar .ChatList li {
  padding: 12px 15px;
  border-bottom: 1px solid #292C33;
  cursor: pointer;
  transition: background-color 0.1s;
}
.ChatBar .ChatList li:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
.ChatBar .ChatList li.active {
  background-color: grey;
}
.ChatBar .ChatList .avatar,
.ChatBar .ChatList .name {
  vertical-align: middle;
}

.ChatBar .ChatList .avatar {
  border-radius: 50%;
}

.ChatBar .ChatList .name {
  display: inline-block;
  margin: 0 0 0 15px;
}

.ChatBar .ChatBarRoom {
  position: fixed;
  bottom: 0;
  left: 360px;
  width: 300px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 4px;
}
.ChatBar .ChatRoom {
  height: 500px;
}
</style>
