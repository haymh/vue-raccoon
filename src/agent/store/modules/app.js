import * as types from '../mutation-types';

// initial state
const state = {
  showSideBar: false,
  showProgressBar: false,
};

const mutations = {
  [types.TOGGLE_SIDEBAR](_state, show) {
    if (show !== null && show !== undefined) {
      _state.showSideBar = show;
    }
  },
  [types.SHOW_PROGRESSBAR](_state, show) {
    _state.showProgressBar = show;
  },
};

export default {
  state,
  mutations,
};
