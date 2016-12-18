<template>
  <nav class="nav-global nav is-default has-shadow" id="top">
    <div class="container">
      <div class="nav-left">
        <router-link class="nav-item is-brand" to="/" exact>
          <img src="../../static/logo.png" alt="Bulma logo">
        </router-link>
        <div class="nav-item">
          <input class="input" type="text" placeholder="Search BulmaHub">
        </div>
        <router-link class="nav-item" to="/hello">{{ $t('nav.hello') }}</router-link>
        <router-link class="nav-item" to="/view1">View1</router-link>
        <router-link class="nav-item" to="/chat">{{ $t('nav.chat') }}</router-link>
        <router-link class="nav-item" to="/main">Main</router-link>
        <router-link class="nav-item" to="/user/123">Profile</router-link>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <Login class="nav-item" v-show="user.isTemp" />
        <UserInfo class="nav-item" v-show="!user.isTemp" :user="user" />
        <a class="nav-item is-tab" href="#">
          1-123-4567
        </a>
        <a class="nav-item is-tab" href="#">
          Documentation
        </a>
        <a class="nav-item is-tab" href="#">
          Blog
        </a>
      </div>
    </div>
  </nav>
</template>

<style>
.searchbox {
  width: 80px;
}
.nav-global {
	background-color: #1f1f1f;
	z-index: 999;
	top: 0;
	left: 0;
	right: 0;
}

.nav-global a:hover {
	color: #fff;
}

.nav-global a.router-link-active {
	color: #000;
	font-weight: 400;
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
  import search from './Hello.vue';
  import Login from './login/Login.vue';
  import UserInfo from './login/UserInfo.vue';

  export default {
    name: 'navbar',
    components: { search, Login, UserInfo },
    computed: mapGetters(['user']),
  };
</script>
