import * as types from '../mutation-types';

// initial state
const state = {
  showProgressBar: false,
  snackbar: {
    showSnackbar: false,
    message: '',
    messageType: 'info',
  },
};

const mutations = {
  [types.SHOW_PROGRESSBAR](_state, show) {
    _state.showProgressBar = show;
  },
  [types.SET_SNACKBAR](_state, snackbar) {
    if (snackbar) {
      _state.snackbar = snackbar;
    }
  },

};

export default {
  state,
  mutations,
};
