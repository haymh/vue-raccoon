<template lang="html">
  <div class="ChatRoomListItem">
    <li>
      <div class="columns is-mobile">
        <div class="column is-3">
          <img class="avatar" :alt="person.nickName" :src="person.avatar">
        </div>
        <div class="column is-6">
          <p class="name">{{person.nickName}}</p>
        </div>
        <div class="column is-2">
          <span v-show="showUnread()" class="tag is-danger">{{ this.room.members[this.userId].unread }}</span>
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
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
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
      const unread = this.room.members[this.userId].unread;
      return unread && unread > 0;
    },
  },
};
</script>

<style lang="css">
</style>
