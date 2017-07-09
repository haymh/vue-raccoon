import Vue from 'vue';
import Router from 'vue-router';

import View1 from '../view1.vue';
import Article from '../article.vue';
import ArticleView from '../ArticleView.vue';
import ArticleParser from '../ArticleParser.vue';
import ChatView from '../../components/chat/Chat.vue';
import Main from '../main.vue';
import SingleListing from '../../components/singlelist/singlelisting.vue';
import Detail from '../Detail.vue';
import UserPage from '../User.vue';
import ErrorPage from '../Error.vue';
import ShareSetting from '../ShareSetting.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // Just use them normally in the route config
    /* eslint-disable global-require */
    { path: '/view1', component: View1 },
    { path: '/article', component: Article },
    { path: '/articleView/:fileName', component: ArticleView },
    { path: '/articleParser', component: ArticleParser },
    { path: '/chat', component: ChatView },
    { path: '/main', component: Main },
    { path: '/shareSetting/:byFilter', component: ShareSetting },
    { path: '/listing', component: SingleListing },
    { path: '/house/:id', component: Detail },
    { path: '/user/:id', component: UserPage },
    { path: '/error/:msg', component: ErrorPage },
    { path: '*', redirect: '/view1' },
  ],
});
