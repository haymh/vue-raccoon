<template>
  <div id="app">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
    <!--<link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet" type="text/css"></link>-->
    <v-app>
      <ProgressBar v-show="$store.state.app.showProgressBar"></ProgressBar>
      <navbar class="hidden-xs-only"></navbar>
      <main class="main">
        <router-view></router-view>
      </main>
      <BottomNav class="hidden-sm-and-up" :navs="navs"></BottomNav>
    </v-app>
  </div>
</template>
<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
html, body, #app, .main {
  overflow: hidden;
  height: 100%;
}
.main {
  height: calc(100% - 56px);
  overflow-y: scroll;
  margin: auto;
  -webkit-overflow-scrolling: touch;
}

body {
	font-size: 15px;
	background-color: #f2f3f5;
	margin: 0;
  padding: 0;
	color: #34495e;
}

a {
	color: #34495e;
	text-decoration: none;
}
</style>
<script>
import { mapGetters } from 'vuex';
import Login from '../components/login/Login.vue';
import navbar from './navbar.vue';
import BottomNav from '../components/nav/BottomNav.vue';
import ProgressBar from '../components/nav/ProgressBar.vue';

/* eslint-disable no-undef */
export default {
  name: 'App',
  data() {
    return {
      needCreateUser: false,
      navs: [
        {
          text: 'Main',
          icon: 'home',
          page: '/main',
        },
        {
          text: 'Chat',
          icon: 'chat',
          page: '/chat',
        },
        {
          text: 'Settings',
          icon: 'settings',
          page: '/view1',
        },
      ],
    };
  },
  components: { Login, navbar, BottomNav, ProgressBar },
  computed: mapGetters(['user']),
  methods: {
  },
};
</script>
