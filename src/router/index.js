import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HelloView from '../components/Hello.vue';
import View1 from '../components/view1.vue';
import ChatView from '../components/chat/Chat.vue';

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/hello', component: HelloView },
    { path: '/view1', component: View1 },
    { path: '/chat', component: ChatView },
  ],
});
