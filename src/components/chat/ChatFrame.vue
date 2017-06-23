<template>
  <div class="content-container">
    <v-card height="100%" class="grey lighten-4" id="navigation-1">
      <v-navigation-drawer class="grey lighten-4 pb-0" temporary persistent hide-overlay absolute height="100%" light v-model="drawer"
        :mini-variant.sync="mini">
        <v-list class="pa-0">
          <v-list-item>
            <v-list-tile avatar tag="div">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>John Leider</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click.native.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
        </v-list>
        <ChatFriendList :peopleList="peopleList" @openchat="openChat"></ChatFriendList>
      </v-navigation-drawer>
      <v-toolbar fixed class="indigo darken-4" light>
        <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Chat Jiba</v-toolbar-title>
      </v-toolbar>
      <ChatWindow :room-id="activeRoomId" :userId="userId" :user="user" style="padding-top:56px;"></ChatWindow>
    </v-card>
  </div>
</template>


<style scoped>
.content-container {
  height: calc(100% - 56px);
}

</style>
<script>
import { mapGetters } from 'vuex';

import ChatFriendList from './ChatFriendList.vue';
import ChatWindow from './ChatWindow.vue';
import { db } from '../../api/fire';

export default {
  name: 'ChatFrame',
  data() {
    return {
      drawer: true,
      mini: false,
      right: null,
      activeRoomId: '',
      activeFriend: null,
      peopleList: [],
    };
  },
  computed: {
    ...mapGetters([
      'userId',
      'user',
      'userRooms',
    ]),
  },
  created() {
    this.$bindAsArray('peopleList', db.ref('/users').orderByChild('type').equalTo('agent'));
  },
  components: {
    ChatFriendList,
    ChatWindow,
  },
  methods: {
    openChat({ roomId, friend }) {
      this.activeRoomId = roomId;
      this.activeFriend = friend;
    },
  },
};
</script>
