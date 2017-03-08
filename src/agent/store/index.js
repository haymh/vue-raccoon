import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import user from './modules/user';
import houses from './modules/houses';
import app from './modules/app';
import share from './modules/share';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    houses,
    app,
    share,
  },
  strict: debug,
});
