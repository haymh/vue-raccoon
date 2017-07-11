<template>
<v-layout row style="height:100%">
  <v-flex md1 class="hidden-sm-and-above pa-0"></v-flex>
  <v-flex xs12 md8 class="pa-0">
    <ChatFrame class="chat-container" peopleTable="agents" :friendList="chatList"></ChatFrame>
  </v-flex>
  <v-flex md3 class="hidden-sm-and-above pa-0">

  </v-flex>
</v-layout>
</template>

<style scoped>
.chat-container {
  height: 100%;
  overflow: hidden;
}
</style>

<script>
import { mapGetters } from 'vuex';
import ChatFrame from '../components/chat/ChatFrame.vue';
import { db } from '../api/fire';

export default {
  name: 'Chat',
  components: {
    ChatFrame,
  },
  created() {
    this.$bindAsArray('peopleList', db.ref('/agents'));
  },
  computed: {
    ...mapGetters([
      'userRooms',
    ]),
    chatList() {
      return [
        {
          type: 'room',
          title: 'recent',
          list: this.userRooms,
          icon: 'history',
        },
        {
          type: 'people',
          title: 'contact',
          list: this.peopleList,
          icon: 'people',
        },
      ];
    },
  },
};
</script>
