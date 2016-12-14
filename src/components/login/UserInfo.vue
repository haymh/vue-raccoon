<template>
  <div class="user-info">
    <a class="nav-item" href="#" v-on:click="open">
      {{user.displayName}}
    </a>
    <div class="modal" v-bind:class="{ 'is-active': formOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Raccoon</p>
          <button class="delete" v-on:click="dismiss"></button>
        </header>
        <section class="modal-card-body">
          <button class="primary" v-on:click="logOut">Log out</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'UserInfo',
    data() {
      return {
        formOpen: false,
      };
    },
    props: ['user'],
    methods: {
      open(event) {
        event.preventDefault();
        this.formOpen = true;
      },
      dismiss(event) {
        event.preventDefault();
        this.formOpen = false;
      },
      logOut(event) {
        event.preventDefault();
        this.formOpen = false;
        firebase.auth().signOut().then(() => console.log('user signed out'), error => console.error(error));
      },
    },
  };
</script>
