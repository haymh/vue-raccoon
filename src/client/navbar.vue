<template>
  <v-toolbar class="white" style="z-index:1">
    <v-toolbar-side-icon v-on:click.native.stop="toggleSideBar"></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down">
      <router-link to="/" exact>
        <img style="height:24px;" src="../../static/logo.png">
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <HouseSearchBar class="autocomplete-input" route="search"></HouseSearchBar>
    <v-spacer></v-spacer>
    <router-link to="/chat">Chat</router-link>
    <Login v-show="user.isTemp"></Login>
    <UserInfo v-show="!user.isTemp" :user="user"></UserInfo>
    <router-link to="/user/123">Profile</router-link>
    <v-menu bottom left offset-y origin="top right" transition="v-scale-transition" class="hidden-sm-and-above">
      <v-btn dark icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
          More Actions
          <v-list-tile>
            Item 1
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              Item 2
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              <router-link to="/user/123">Profile</router-link>
            </v-list-tile-title>
          </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>

</template>

<style>
.autocomplete-input {
  flex-grow: 2;
}
/*.nav-global {
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
}*/
</style>

<script>
  import { mapGetters } from 'vuex';
  import Login from '../components/login/Login.vue';
  import UserInfo from '../components/login/UserInfo.vue';
  import HouseSearchBar from '../components/search/HouseSearchBar.vue';

  export default {
    name: 'navbar',
    components: { Login, UserInfo, HouseSearchBar },
    computed: mapGetters(['user']),
  };
</script>
