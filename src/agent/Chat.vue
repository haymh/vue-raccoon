<template>
  <ChatFrame :friendList="chatList" class="chat-container"></ChatFrame>
</template>

<style scoped>
.chat-container {
  height: 100%;
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
    this.$bindAsArray('peopleList', db.ref('/users'));
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
