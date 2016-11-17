<template lang="html">
  <div class="ChatRoomListItem">
    <li>
      <div class="columns is-mobile">
        <div class="column is-3">
          <img class="avatar" :alt="person.nickname" :src="person.avatar">
        </div>
        <div class="column is-6">
          <p class="name">{{person.nickname}}</p>
        </div>
        <div class="column is-2">
          <transition name="fade">
            <span v-show="showUnread()" class="tag is-danger">{{ this.unread['.value'] | unreadFormatter }}</span>
          </transition>
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
  </div>
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
