<template>
  <v-toolbar class="white">
    <v-toolbar-side-icon v-on:click.native.stop="toggleSideBar"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" exact>
        <img src="../../../../static/logo.png">
      </router-link>
    </v-toolbar-title>
    <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
    <v-toolbar-items>
      <v-toolbar-item>
        <Login v-show="user.isTemp" />
      </v-toolbar-item>
      <v-toolbar-item>
        <UserInfo v-show="!user.isTemp" :user="user" />
      </v-toolbar-item>
      <v-toolbar-item>
        <router-link to="/user/123">Profile</router-link>
      </v-toolbar-item>
    </v-toolbar-items>
  </v-toolbar>

</template>

<style>
.autocomplete-input {
  width: auto;
}
.nav-global {
	z-index: 999;
	top: 0;
	left: 0;
	right: 0;
}

.nav-global a.router-link-active {
	color: #000;
	font-weight: bold;
}

.nav-global a:nth-child(6) {
	margin-right: 0;
}

.nav-global .logo {
	width: 24px;
	margin-right: 10px;
	display: inline-block;
	vertical-align: middle;
}
</style>

<script>
  import { mapGetters } from 'vuex';
  import Login from '../../../components/login/Login.vue';
  import UserInfo from '../../../components/login/UserInfo.vue';
  import HouseSearchBar from '../../../components/search/HouseSearchBar.vue';

  export default {
    name: 'navbar',
    components: { Login, UserInfo, HouseSearchBar },
    computed: mapGetters(['user', 'showSideBar']),
    methods: {
      toggleSideBar() {
        console.log('setting show side bar', !this.showSideBar);
        this.$store.dispatch('toggleSideBar', !this.showSideBar);
      },
    },
  };
</script>
