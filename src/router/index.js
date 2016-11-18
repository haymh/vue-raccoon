import Vue from 'vue';
import Router from 'vue-router';

import HelloView from '../components/Hello.vue';
import View1 from '../components/view1.vue';
import ChatView from '../components/chat/Chat.vue';
import MapView from '../components/MapView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/hello', component: HelloView },
    { path: '/view1', component: View1 },
    { path: '/chat', component: ChatView },
    { path: '/map', component: MapView },
    { path: '*', redirect: '/hello' },
  ],
});
