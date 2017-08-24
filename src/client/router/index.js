import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import api from '../../api';
import store from '../../agent/store';

Vue.use(Router);

// route-level code splitting
const MainView = () => import('../Main.vue');
const View1 = () => import('../view1.vue');
const ChatView = () => import('../Chat.vue');
const SearchView = () => import('../Search.vue');
const SingleListing = () => import('../../components/singlelist/singlelisting.vue');
const Detail = () => import('../Detail.vue');
const UserPage = () => import('../User.vue');
const ErrorPage = () => import('../Error.vue');

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/main', component: MainView },
    { path: '/view1', component: View1 },
    { path: '/chat', component: ChatView },
    { path: '/search', component: SearchView },
    { path: '/listing', component: SingleListing },
    { path: '/house/:id', component: Detail },
    { path: '/user/:id', component: UserPage },
    { path: '/error/:msg', component: ErrorPage },
    { path: '*', redirect: '/main' },
  ],
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  console.log('Router.beforeEach: ', user);
  if (user) {
    next();
  } else {
    console.log('Router.beforeEach: should sign in');
    let id = null;
    firebase.auth().signInAnonymously()
      .then((u) => {
        console.log('Router.beforeEach: should get API token');
        id = u.uid;
        return api.refreshToken(id);
      })
      .then(() => {
        console.log('Router.beforeEach: should set user');
        store.dispatch('setUser', { id });
        next();
      })
      .catch((error) => {
        console.log('Router.beforeEach: error during sign in anonymously', error);
        next(error);
      });
  }
});

export default router;
