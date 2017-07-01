<template>
  <v-toolbar class="white">
    <v-toolbar-side-icon v-on:click.native.stop="toggleSideBar"></v-toolbar-side-icon>
    <v-toolbar-title class="hidden-sm-and-down">
      <router-link to="/" exact>
        <img style="height:24px;" src="../../static/logo.png">
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
      <v-toolbar-item class="hidden-xs-only">
        <Login v-show="user.isTemp"></Login>
      </v-toolbar-item>
      <v-toolbar-item class="hidden-xs-only">
        <UserInfo v-show="!user.isTemp" :user="user"></UserInfo>
      </v-toolbar-item>
      <v-toolbar-item class="hidden-xs-only">
        <router-link to="/user/123">Profile</router-link>
      </v-toolbar-item>
      <v-toolbar-item class="hidden-md-and-up">
        <v-menu bottom left offset-y origin="top right" transition="v-scale-transition">
          <v-btn dark icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-item>
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
            </v-list-item>
          </v-list>
        </v-menu>
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
  import Login from '../components/login/Login.vue';
  import UserInfo from '../components/login/UserInfo.vue';
  import HouseSearchBar from '../components/search/HouseSearchBar.vue';

  export default {
    name: 'navbar',
    components: { Login, UserInfo, HouseSearchBar },
    computed: mapGetters(['user']),
  };
</script>
