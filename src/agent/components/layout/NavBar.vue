<template>
  <nav class="nav-global nav is-default has-shadow" id="top">
      <div class="nav-left">
        <div class="nav-item">
          <span class="icon is-medium">
            <i v-bind:class="[showSideBar ? 'fa-angle-left':'fa-bars', 'fa']"
              @click="$store.dispatch('toggleSideBar')"></i>
          </span>
        </div>
        <router-link class="nav-item is-brand" to="/" exact>
          <img src="../../../../static/logo.png">
        </router-link>
      </div>
      <div class="nav-center">
        <div class="nav-item">
          <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
        </div>
      </div>

      <div class="nav-right nav-menu">
        <Login class="nav-item" v-show="user.isTemp" />
        <UserInfo class="nav-item" v-show="!user.isTemp" :user="user" />
        <router-link class="nav-item is-tab" to="/user/123">Profile</router-link>
      </div>
  </nav>
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
  };
</script>
