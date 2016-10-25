<template>
  <div>
    <Chat :userId="userId"></Chat>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Chat from './chat/Chat.vue';

export default {
  name: 'view1',
  computed: mapGetters([
    'userId',
  ]),
  components: { Chat },
  watch: {
    userId: {
      handler() {
        console.log('userId in view2 ', this.userId);
      },
    },
  },
};
</script>
