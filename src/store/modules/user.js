import * as types from '../mutation-types';

// initial state
// shape: [{ id, quantity }]
const state = {
  id: '',
  isTemp: true,
  favoriteHouses: [],
  searches: [],
};

// mutations
const mutations = {
  [types.CHANGE_USER](_state, { id, isTemp, favoriteHouses, searches }) {
    _state.id = id;
    _state.isTemp = isTemp;
    _state.favoriteHouses = favoriteHouses;
    _state.searches = searches;
  },

  [types.ADD_SEARCH](_state, { newSearch }) {
    if (_state.seaches
      .filter((search) => JSON.stringify(search) === JSON.stringify(newSearch)) === 0) {
      _state.searches.push(newSearch);
    }
  },

  [types.ADD_FAVORITE](_state, { newFavorite }) {
    if (_state.favoriteHouses
      .filter((favorite) => favorite.id === newFavorite.id) === 0) {
      _state.favoriteHouses.push(newFavorite);
    }
  },
};

export default {
  state,
  mutations,
};
