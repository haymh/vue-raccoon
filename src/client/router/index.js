import Vue from 'vue';
import Router from 'vue-router';
import Main from '../Main.vue';
import View1 from '../view1.vue';
import ChatView from '../Chat.vue';
import Search from '../Search.vue';
import SingleListing from '../../components/singlelist/singlelisting.vue';
import Detail from '../Detail.vue';
import UserPage from '../User.vue';
import ErrorPage from '../Error.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/main', component: Main },
    { path: '/view1', component: View1 },
    { path: '/chat', component: ChatView },
    { path: '/search', component: Search },
    { path: '/listing', component: SingleListing },
    { path: '/house/:id', component: Detail },
    { path: '/user/:id', component: UserPage },
    { path: '/error/:msg', component: ErrorPage },
    { path: '*', redirect: '/main' },
  ],
});
