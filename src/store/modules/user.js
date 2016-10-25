import * as types from '../mutation-types';

// initial state
// shape: [{ id, quantity }]
const state = {
  id: '',
  isTemp: true,
  nickName: '',
  favoriteHouses: [],
  searches: [],
  userRooms: [],
};

// mutations
const mutations = {
  [types.CHANGE_USER](_state, { id, isTemp, nickName, favoriteHouses, searches, userRooms }) {
    _state.id = id;
    _state.isTemp = isTemp;
    _state.nickName = nickName;
    _state.favoriteHouses = favoriteHouses;
    _state.searches = searches;
    _state.userRooms = userRooms;
  },

  [types.LOAD_USER_PROFILE](_state, { id, isTemp, nickName }) {
    _state.id = id;
    _state.isTemp = isTemp;
    _state.nickName = nickName;
  },

  [types.LOAD_USER_DATA](_state, { favoriteHouses, searches }) {
    _state.favoriteHouses = favoriteHouses;
    _state.searches = searches;
  },

  [types.LOAD_USER_ROOM](_state, { userRooms }) {
    _state.userRooms = userRooms;
  },

  [types.ADD_ROOM](_state, { room }) {
    _state.userRooms.push(room);
  },

  [types.ADD_SEARCH](_state, { newSearch }) {
    if (_state.seaches
      .filter(search => JSON.stringify(search) === JSON.stringify(newSearch)) === 0) {
      _state.searches.push(newSearch);
    }
  },

  [types.ADD_FAVORITE](_state, { newFavorite }) {
    if (_state.favoriteHouses
      .filter(favorite => favorite.id === newFavorite.id) === 0) {
      _state.favoriteHouses.push(newFavorite);
    }
  },
};

export default {
  state,
  mutations,
};
