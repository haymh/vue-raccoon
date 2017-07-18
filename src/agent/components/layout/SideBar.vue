<template>
  <v-navigation-drawer
    v-model="isActive"
    absolute
    clipped
    temporary
    :mini-variant.sync="mini"
    dark
  >
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="i"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
        </v-layout>
        <v-divider
          dark
          v-else-if="item.divider"
          class="my-4"
          :key="i"
        ></v-divider>
        <v-list-tile
          :key="i"
          v-else
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideBar',
  data() {
    return {
      mini: false,
      items: [
        { heading: 'Main' },
        { icon: 'lightbulb_outline', text: 'Dashboard', link: '/dashboard' },
        { icon: 'touch_app', text: 'Customers', link: '' },
        { icon: 'touch_app', text: 'Chat', link: '/chat' },
        { divider: true },
        { heading: 'General' },
        { icon: 'add', text: 'Create new share', link: '/main' },
        { icon: 'modify', text: 'Manage share' },
        { divider: true },
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' },
        { divider: true },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Trash' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Keyboard shortcuts' },
      ],
    };
  },
  computed: {
    ...mapGetters(['showSideBar']),
    isActive: {
      get() {
        return this.showSideBar;
      },
      set(val) {
        this.$store.dispatch('toggleSideBar', val);
      },
    },
  },
};
</script>
