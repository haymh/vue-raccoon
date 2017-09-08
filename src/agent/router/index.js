import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import api from '../../api';
import store from '../../agent/store';

Vue.use(Router);

// route-level code splitting
const MainView = () => import('../Main.vue');
const Article = () => import('../article.vue');
const ArticleView = () => import('../ArticleView.vue');
const ArticleParser = () => import('../ArticleParser.vue');
const View1 = () => import('../view1.vue');
const ChatView = () => import('../Chat.vue');
const SearchView = () => import('../Search.vue');
const SingleListing = () => import('../../components/singlelist/singlelisting.vue');
const Detail = () => import('../Detail.vue');
const UserPage = () => import('../User.vue');
const ErrorPage = () => import('../Error.vue');
const ShareSetting = () => import('../ShareSetting.vue');
const EditShareEmail = () => import('../EditShareEmail.vue');
const Dashboard = () => import('../Dashboard.vue');
const ViewShareHouse = () => import('../ViewShareHouse.vue');
const ArticleShareView = () => import('../ArticleShareView.vue');
const ManageContact = () => import('../ManageContacts.vue');

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/view1', component: View1, meta: { breadcrumb: 'Home Page' } },
    { path: '/article/:category', component: Article },
    { path: '/articleView/:fileName', component: ArticleView },
    { path: '/articleParser', component: ArticleParser },
    { path: '/chat', component: ChatView },
    { path: '/main', component: MainView, meta: { breadcrumb: 'Search Houses' } },
    { path: '/search', component: SearchView },
    { path: '/dashboard', component: Dashboard },
    { path: '/shareSetting', component: ShareSetting, meta: { breadcrumb: 'Schedule and Customers' } },
    { path: '/editShareEmail', component: EditShareEmail, meta: { breadcrumb: 'Edit Share Email' } },
    { path: '/listing', component: SingleListing },
    { path: '/house/:id', component: Detail },
    { path: '/user/:id', component: UserPage },
    { path: '/viewShareHouse/:id', component: ViewShareHouse },
    { path: '/articleShareView/:id', component: ArticleShareView },
    { path: '/error/:msg', component: ErrorPage },
    { path: '/managecontact', component: ManageContact },
    { path: '*', redirect: '/view1' },
  ],
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  if (user) {
    next();
  } else {
    console.log('should sign in');
    let id = null;
    firebase.auth().signInAnonymously()
      .then((u) => {
        id = u.uid;
        return api.refreshToken(id);
      })
      .then(() => {
        store.dispatch('setUser', { id });
        next();
      })
      .catch((error) => {
        console.log('error during sign in anonymously', error);
        next(error);
      });
  }
});

export default router;
