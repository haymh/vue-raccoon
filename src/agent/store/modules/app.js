import * as types from '../mutation-types';

// initial state
const state = {
  showSideBar: false,
};

const mutations = {
  [types.TOGGLE_SIDEBAR](_state, show) {
    if (show !== null && show !== undefined) {
      _state.showSideBar = show;
    }
  },
};

export default {
  state,
  mutations,
};
