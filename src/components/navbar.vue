<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item is-brand" href="#">
        <img src="../../static/logo.png" alt="Bulma logo">
      </a>
    </div>
    <div class="nav-right nav-menu">
      <span v-if="loggedIn" />
      <h1 v-else>No</h1>
      <Login />
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
import search from './Hello.vue';
import Login from './login/Login.vue';

export default {
  name: 'navbar',
  components: { search, Login },
};
</script>
