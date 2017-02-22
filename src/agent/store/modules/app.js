import * as types from '../mutation-types';

// initial state
const state = {
  showSideBar: true,
};

const mutations = {
  [types.TOGGLE_SIDEBAR](_state) {
    _state.showSideBar = !_state.showSideBar;
  },
};

export default {
  state,
  mutations,
};
