<template>
  <div class="login">
    <a class="button is-light" href="#" v-on:click="openLogin">Login</a>
    <div class="modal" v-bind:class="{ 'is-active': formOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Raccoon</p>
          <button class="delete" v-on:click="dismissLogin"></button>
        </header>
        <section class="modal-card-body">
          <i v-if="!formReady" class="fa fa-spinner is-large"></i>
          <div id="firebaseui-auth-container"></div>
        </section>
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
  .modal-card-body {
    border-radius: 0 0 5px 5px;
  }
</style>

<script>
  import firebase from 'firebase';
  import { ui } from '../../api/fire';
  import '../../../node_modules/firebaseui/dist/firebaseui.css';

  export default {
    name: 'Login',
    data() {
      return {
        formOpen: false,
        formReady: false,
      };
    },
    created() {
      if (this.$route.query.mode === 'select') {
        this.formOpen = true;
      }
      const uiConfig = {
        callbacks: { signInSuccess: this.signInSuccess },
        signInFlow: 'popup',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_IDLogin,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        signInSuccessUrl: '/main',
      };

      // Initialize the FirebaseUI Widget using Firebase.
      console.log('erroring out before this?');
      this.ui = ui;
      console.log('erroring out after this?');
      // The start method will wait until the DOM is loaded.
      this.ui.start('#firebaseui-auth-container', uiConfig);
      this.formReady = true;
    },
    beforeDestroy() {
      console.log('about to destroy this view');
      this.ui.reset();
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
      signInSuccess() {
        this.formOpen = false;
        this.ui.reset();
        return true;
      },
    },
  };
</script>
