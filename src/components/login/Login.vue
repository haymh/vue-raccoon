<template>
  <div class="login">
    <a class="button is-light" href="#" v-on:click="openLogin">Login</a>
    <div class="modal" v-bind:class="{ 'is-active': formOpen }">
      <div class="modal-background"></div>
      <div class="modal-card column is-one-quarter-desktop">
        <header class="modal-card-head">
          <p class="modal-card-title">Raccoon Login</p>
          <button class="delete" v-on:click="dismissLogin"></button>
        </header>
        <section class="modal-card-body">
          <p class="control">
            <input v-model="email" class="input is-medium" type="email" placeholder="Email">
          </p>
          <p class="control">
            <input v-model="password" class="input is-medium" type="password" placeholder="Password">
          </p>
          <a class="button is-link" href="#">Forget Password?</a>
        </section>
        <section class="modal-card-body">
          <a class="button is-primary is-medium column" v-on:click="login">Login</a>
          <a class="button is-light is-medium column signup-button" v-on:click="signup">Signup</a>
        </section>
        <footer class="modal-card-foot">
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
.login {
  padding: 10px;
}
.signup-button {
  margin-top: 10px;
}
</style>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        formOpen: false,
        email: '',
        password: '',
      };
    },
    methods: {
      openLogin(event) {
        event.preventDefault();
        this.formOpen = true;
      },
      dismissLogin(event) {
        event.preventDefault();
        this.formOpen = false;
      },
      login() {
        console.log('logining');
        const { email, password } = this;
        this.$store.dispatch('userLogin', { email, password });
      },
      signup() {
        console.log('signing up');
        const { email, password } = this;
        this.$store.dispatch('userSignup', { email, password });
      },
    },
  };
</script>
