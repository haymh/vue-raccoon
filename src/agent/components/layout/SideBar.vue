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
        <v-list-group v-else-if="item.children" v-model="item.model" no-action>
          <v-list-tile slot="item">
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
          >
            <v-list-tile-action>
              <v-icon v-if="child.icon">{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="child.text">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
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
import API from '../../../api';

export default {
  name: 'SideBar',
  data() {
    return {
      mini: false,
      items: [
        { heading: 'Main' },
        { icon: 'lightbulb_outline', text: 'Dashboard', link: '/dashboard' },
        { icon: 'contacts', text: 'Contacts', link: '/manageContact' },
        { icon: 'touch_app', text: 'Customers', link: '' },
        { icon: 'keyboard_arrow_up', 'icon-alt': 'keyboard_arrow_down', model: false, text: 'Articles' },
        { icon: 'touch_app', text: 'Chat', link: '/chat#' },
        { icon: 'chat', text: 'Chat', link: '/chat' },
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
    ...mapGetters(['showSideBar', 'user']),
    isActive: {
      get() {
        return this.showSideBar;
      },
      set(val) {
        this.$store.dispatch('toggleSideBar', val);
      },
    },
  },
  watch: {
    user: {
      handler(user) {
        if (user.id) {
          if (this.$store.getters.getCategoryNames.length !== 0) {
            this.insertArticleCategories(this.$store.getters.getCategoryNames);
          } else {
            API.getAllCategoriesName().then(this.insertArticleCategories);
          }
        }
      },
    },
  },
  methods: {
    insertArticleCategories(cats) {
      console.log('side bar categories: ', cats);

      // careate categories items.
      const articlesChildren = cats.map((c) => {
        console.log(c);
        return { text: c.name, link: `/article/${c.name}` };
      });
      articlesChildren.push({ text: 'All Articles', link: '/article/allArticles' });
      if (!this.user.isTemp) {
        articlesChildren.push({ text: 'My Articles', link: '/article/myArticles' });
      }
      console.log('articles Children', articlesChildren);

      // insert category items in article item.
      for (let i = 0; i < this.items.length; i += 1) {
        if (this.items[i].text === 'Articles') {
          this.items[i].children = articlesChildren;
        }
      }

      // dispatch category information to store for faster access.
      this.$store.dispatch('setCategoryInfo', cats);
    },
  },
};
</script>
