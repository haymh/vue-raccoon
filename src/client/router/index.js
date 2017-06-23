import Vue from 'vue';
import Router from 'vue-router';

import View1 from '../view1.vue';
import ChatView from '../../components/chat/Chat.vue';
import ChatFrame from '../../components/chat/ChatFrame.vue';
import Main from '../main.vue';
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
    { path: '/view1', component: View1 },
    { path: '/chat', component: ChatView },
    { path: '/newchat', component: ChatFrame },
    { path: '/main', component: Main },
    { path: '/listing', component: SingleListing },
    { path: '/house/:id', component: Detail },
    { path: '/user/:id', component: UserPage },
    { path: '/error/:msg', component: ErrorPage },
    { path: '*', redirect: '/main' },
  ],
});
