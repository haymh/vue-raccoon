import * as types from '../mutation-types';

// initial state
const state = {
  showCluster: false,
  outline: null,
  cluster: [],
  housesOnMap: [],
};

const mutations = {
  [types.SHOW_CLUSTER](_state, showCluster) {
    _state.showCluster = showCluster;
  },

  [types.SET_CLUSTER](_state, cluster) {
    _state.cluster = cluster;
  },

  [types.SET_OUTLINE](_state, outline) {
    _state.outline = outline;
  },

  [types.SET_OUTLINE](_state, outline) {
    _state.outline = outline;
  },

  [types.SET_HOUSES_ON_MAP](_state, houses) {
    _state.housesOnMap = houses;
  },
};

export default {
  state,
  mutations,
};
