<template>
  <v-dialog v-model="formOpen">
    <v-btn primary light slot="activator">{{user.nickname || user.displayName || 'Visitor'}}</v-btn>
    <v-card>
      <v-card-row>
        <v-card-title>Raccoon</v-card-title>
      </v-card-row>
      <v-card-row actions>
        <v-btn v-on:click.native="dismiss">Cancel</v-btn>
        <v-btn class="green--text darken-1" flat="flat" v-on:click.native="logOut">Log out</v-btn>
      </v-card-row>
    </v-card>
  </v-dialog>
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
      dismiss() {
        this.formOpen = false;
      },
      logOut() {
        this.formOpen = false;
        firebase.auth().signOut().then(() => console.log('user signed out'), error => console.error(error));
      },
    },
  };
</script>
