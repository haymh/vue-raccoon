<template>

  <v-dialog v-model="formOpen">
    <v-btn primary light slot="activator">Login</v-btn>
    <v-card>
      <v-card-row>
        <v-card-title>Raccoon</v-card-title>
      </v-card-row>
      <v-card-row>
        <v-btn primary light v-on:click.native="link('google')">Google</v-btn>
        <v-btn v-on:click.native="link('facebook')">Facebook</v-btn>
      </v-card-row>
      <v-card-row actions>
        <v-btn v-on:click.native="dismissLogin">Cancel</v-btn>
      </v-card-row>
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
  // import { ui } from '../../api/fire';
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
    },
    computed: {
      isTemp() {
        return this.$store.state.user.isTemp;
      },
    },
    mounted() {
      // const uiConfig = {
      //   callbacks: { signInSuccess: this.signInSuccess },
      //   signInFlow: 'popup',
      //   signInOptions: [
      //     // Leave the lines as is for the providers you want to offer your users.
      //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //     firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   ],
      //   signInSuccessUrl: '/main',
      // };

      // // Initialize the FirebaseUI Widget using Firebase.
      // this.ui = ui;

      // // The start method will wait until the DOM is loaded.
      // this.ui.start('#firebaseui-auth-container', uiConfig);
      // this.formReady = true;
    },
    beforeDestroy() {
      console.log('about to destroy this view');
      this.ui.reset();
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
          // check isTemp
          if (!this.isTemp) {
            console.log('link user');
            firebase.auth().currentUser.linkWithPopup(provider).then((result) => {
              // Accounts successfully linked.
              const credential = result.credential;
              const user = result.user;
              console.log(credential, user);
              firebase.auth().signInWithCredential(credential).then((signedUser) => {
                console.log('hengmeng sb', signedUser);
                // update db
                // isTemp photo displayName email
              });
              // this.$store.dispatch('setUserProfile',
              //   {
              //     id: user.uid,
              //     isTemp: false,
              //     nickname: user.providerData[0].displayName,
              //     avatar: user.providerData[0].photoURL,
              //     email: user.email,
              //     displayName: user.providerData[0].displayName,
              //   },
              // );
            }).catch((error) => {
              console.error(error);
              // Handle Errors here.
              // ...
            });
          } else {
            firebase.auth().signInWithPopup(provider);
          }
        }
      },
    },
  };
</script>
