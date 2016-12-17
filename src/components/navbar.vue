<template>
  <nav class="nav">
  <div class="nav-left">
    <a class="nav-item is-brand" href="#">
      <img src="../../static/logo.png" alt="Bulma logo">
    </a>
  </div>
  <div class="nav-right nav-menu">
    <Login v-show="user.isTemp" />
    <UserInfo v-show="!user.isTemp" :user="user" />
    <a class="nav-item" href="#">
      1-123-4567
    </a>
    <a class="nav-item" href="#">
      Documentation
    </a>
    <a class="nav-item" href="#">
      Blog
    </a>
  </div>
  </nav>
</template>

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
