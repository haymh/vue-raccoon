<template>
    <v-list-tile @click.native="clicked">
      <v-list-tile-avatar>
        <img :alt="person.nickname" :src="person.avatar">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="name">{{person.nickname}}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon
          v-badge="{ value: formattedUnreadCount, left: true, visible: showUnread}"
          v-bind:class="[active ? 'teal--text' : 'grey--text', 'red--after']">
          chat_bubble
        </v-icon>
      </v-list-tile-action>
    </v-list-tile>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '../../api/fire';

export default {
  name: 'ChatListRoomItem',
  props: {
    room: Object,
    peopleTable: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.room.members);
    const personId = this.notMe(this.room.members);
    console.log('Other Person Id: ', personId);
    this.$bindAsObject('person', db.ref(`/${this.peopleTable}/${personId}`));
    this.$bindAsObject('unread', db.ref(`/unread/${this.userId}/${this.room.roomId}`));
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    showUnread() {
      const unread = this.unread['.value'];
      console.log(unread, unread > 0);
      return unread && unread > 0;
    },
    formattedUnreadCount() {
      return this.unread['.value'] > 10 ? '10+' : this.unread['.value'];
    },
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
    clicked() {
      this.$emit('clicked', this.room.roomId, this.person);
    },
  },
};
</script>

