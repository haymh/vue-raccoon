import Vue from 'vue';
import Router from 'vue-router';

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

export default new Router({
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
