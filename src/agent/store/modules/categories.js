import * as types from '../mutation-types';

const state = {
  categoryNames: [],
};

const mutations = {
  [types.SET_CATEGORIES](_state, categoryInfo) {
    _state.categoryNames = categoryInfo;
  },
};

export default {
  state,
  mutations,
};
