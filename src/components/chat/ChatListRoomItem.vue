<template>
    <v-list-item>
      <v-list-tile>
        <v-list-tile-avatar>
          <img :alt="person.nickname" :src="person.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="name">{{person.nickname}}</v-list-tile-title>
        </v-list-tile-content>
        <!--<div class="column is-2">
          <transition name="fade">
            <span v-show="showUnread()" class="tag is-danger">{{ this.unread['.value'] | unreadFormatter }}</span>
          </transition>
        </div>-->
      </v-list-tile>
    </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '../../api/fire';

export default {
  name: 'ChatListRoomItem',
  props: ['room'],
  data() {
    return {
    };
  },
  created() {
    console.log(this.room.members);
    const personId = this.notMe(this.room.members);
    console.log('Other Person Id: ', personId);
    this.$bindAsObject('person', db.ref(`/users/${personId}`));
    this.$bindAsObject('unread', db.ref(`/unread/${this.userId}/${this.room.roomId}`));
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
  },
  filters: {
    unreadFormatter(count) {
      return count > 10 ? '10+' : count;
    },
  },
  methods: {
    // returns the member that is not current user
    notMe(members) {
      /* eslint-disable no-restricted-syntax */
      for (const key of Object.keys(members)) {
        if (key !== this.userId) {
          return key;
        }
      }
      return undefined;
    },
    showUnread() {
      const unread = this.unread['.value'];
      console.log(unread);
      return unread && unread > 0;
    },
  },
};
</script>

<style scoped lang="css">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
