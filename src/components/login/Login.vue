<template>

  <v-dialog v-model="formOpen">
    <v-btn color="primary" light slot="activator">Login</v-btn>
    <v-card>
      <v-card-title>Raccoon</v-card-title>
      <v-card-text>
        {{message}}
      </v-card-text>
      <v-btn color="primary" light v-on:click.native="link('google')">Google</v-btn>
      <v-btn v-on:click.native="link('facebook')">Facebook</v-btn>
      <v-card-actions>
        <v-btn v-on:click.native="dismissLogin">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
  // import { timeStamp } from '../../api/fire';
  // import { ui } from '../../api/fire';
  import '../../../node_modules/firebaseui/dist/firebaseui.css';

  export default {
    name: 'Login',
    data() {
      return {
        formOpen: false,
        formReady: false,
        message: 'Choose one sign-in method',
      };
    },
    created() {
      if (this.$route.query.mode === 'select') {
        this.formOpen = true;
      }
    },
    methods: {
      dismissLogin() {
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
      link(providerName) {
        let provider = null;
        switch (providerName) {
          case 'google':
            provider = new firebase.auth.GoogleAuthProvider();
            break;
          case 'facebook':
            provider = new firebase.auth.FacebookAuthProvider();
            break;
          default: break;
        }
        if (provider) {
          console.log('link user');
          firebase.auth().currentUser.linkWithPopup(provider).then((result) => {
            // Accounts successfully linked.
            const user = result.user;
            let displayName = user.displayName;
            if (!displayName) {
              if (user.providerData[0]) {
                displayName = user.providerData[0].displayName;
              } else {
                displayName = 'Visitor';
              }
            }
            this.$store.dispatch('setUser',
              {
                id: user.uid,
                isTemp: user.isAnonymous,
                displayName,
              },
            );
            this.formOpen = false;
          }).catch((error) => {
            console.error(error);
            firebase.auth().signInWithCredential(error.credential)
              .then((user) => {
                // TODO: update user store
                this.formOpen = false;
                console.log('new user signed in', user);
                this.$router.replace('/main');
              })
              .catch((err) => {
                console.log(err);
                this.message = `Failed to sign with ${providerName}`;
              });
          });
        }
      },
    },
  };
</script>
