<template>
  <nav class="nav-global nav is-default has-shadow" id="top">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item is-brand" to="/" exact>
          <img src="../../static/logo.png">
        </router-link>
        <div class="nav-item">
          <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
        </div>
      </div>
      <router-link class="nav-item is-tab" to="/view1">View1</router-link>
      <router-link class="nav-item is-tab" to="/chat">{{ $t('nav.chat') }}</router-link>
      <router-link class="nav-item is-tab" to="/main">Main</router-link>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <a class="nav-item is-tab" href="#">
          What?
        </a>
        <Login class="nav-item" v-show="user.isTemp" />
        <UserInfo class="nav-item" v-show="!user.isTemp" :user="user" />
        <router-link class="nav-item is-tab" to="/user/123">Profile</router-link>
      </div>
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
  import Login from './login/Login.vue';
  import UserInfo from './login/UserInfo.vue';
  import HouseSearchBar from './search/HouseSearchBar.vue';

  export default {
    name: 'navbar',
    components: { Login, UserInfo, HouseSearchBar },
    computed: mapGetters(['user']),
  };
</script>
