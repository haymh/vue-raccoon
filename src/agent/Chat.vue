<template>
  <ChatFrame class="chat-container"></ChatFrame>
</template>

<style scoped>
.chat-container {
  height: 100%;
}
</style>

<script>
import ChatFrame from '../components/chat/ChatFrame.vue';

export default {
  name: 'Chat',
  components: {
    ChatFrame,
  },
};
</script>
