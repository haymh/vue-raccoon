import * as types from '../mutation-types';

// initial state
const state = {
  all: [],
  filterResults: [],
  lastFilter: {},
};

// mutations
const mutations = {
  [types.RECEIVE_HOUSES](_state, { houses }) {
    state.all = houses;
  },

  [types.ADD_FAVORITE](_state, { id }) {
    const newFavorite = state.all.find(h => h.id === id);
    newFavorite.like++;
    newFavorite.isFavor = true;
  },

  [types.REMOVE_FAVORITE](_state, { id }) {
    const toRemove = state.all.find(h => h.id === id);
    toRemove.like--;
    toRemove.isFavor = false;
  },

  [types.TAG_FAVORITE](_state) {
    _state.user.favoriteHouses.forEach((favorite) => {
      state.all.find(h => h.id === favorite.id).isFavor = true;
    });
  },

  [types.FILTER_HOUSE](_state, { filter, refilter }) {
    // TODO: calculate delta filter, see if new result is subset of last result
    console.log('new filter', filter);
    const deltaFilter = {};
    console.log('delta filter', deltaFilter);
    const needRefilter = true || refilter;
    if (needRefilter) {
      // filter all houses
      _state.filterResults = _state.all.filter((house) => {
        console.log(house);
        return true;
      });
    } else {
      // filter last filterResults
      _state.filterResults = _state.filterResults.filter((house) => {
        console.log(house);
        // TODO: use deltaFilter
        return true;
      });
    }
  },
};

export default {
  state,
  mutations,
};
