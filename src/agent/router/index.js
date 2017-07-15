import Vue from 'vue';
import Router from 'vue-router';

import View1 from '../view1.vue';
import ChatView from '../Chat.vue';
import Main from '../main.vue';
import Search from '../Search.vue';
import SingleListing from '../../components/singlelist/singlelisting.vue';
import Detail from '../Detail.vue';
import UserPage from '../User.vue';
import ErrorPage from '../Error.vue';
import ShareSetting from '../ShareSetting.vue';
import EditShareEmail from '../EditShareEmail.vue';
import Dashboard from '../Dashboard.vue';
import ViewSHareHouse from '../ViewShareHouse.vue';
import ManageContact from '../ManageContacts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/view1', component: View1, meta: { breadcrumb: 'Home Page' } },
    { path: '/chat', component: ChatView },
    { path: '/main', component: Main, meta: { breadcrumb: 'Search Houses' } },
    { path: '/search', component: Search },
    { path: '/dashboard', component: Dashboard },
    { path: '/shareSetting', component: ShareSetting, meta: { breadcrumb: 'Schedule and Customers' } },
    { path: '/editShareEmail', component: EditShareEmail, meta: { breadcrumb: 'Edit Share Email' } },
    { path: '/listing', component: SingleListing },
    { path: '/house/:id', component: Detail },
    { path: '/user/:id', component: UserPage },
    { path: '/viewShareHouse/:id', component: ViewSHareHouse },
    { path: '/error/:msg', component: ErrorPage },
    { path: '/managecontact', component: ManageContact },
    { path: '*', redirect: '/view1' },
  ],
});
