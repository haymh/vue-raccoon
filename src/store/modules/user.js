import * as types from '../mutation-types';

// initial state
// shape: [{ id, quantity }]
const state = {
  id: '',
  isTemp: true,
  nickname: '',
  avatar: '',
  favoriteHouses: [],
  searches: [],
  userRooms: [],
};

// mutations
/* eslint-disable no-param-reassign */
const mutations = {
  [types.CHANGE_USER](_state,
    { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar }) {
    _state.id = id;
    _state.isTemp = isTemp;
    _state.nickname = nickname;
    _state.favoriteHouses = favoriteHouses;
    _state.searches = searches;
    _state.userRooms = userRooms;
    _state.avatar = avatar;
  },

  [types.LOAD_USER_PROFILE](_state, { id, isTemp, nickname, avatar }) {
    _state.id = id;
    _state.isTemp = isTemp;
    _state.nickname = nickname;
    _state.avatar = avatar;
  },

  [types.LOAD_USER_DATA](_state, { favoriteHouses, searches }) {
    _state.favoriteHouses = favoriteHouses;
    _state.searches = searches;
  },

  [types.LOAD_USER_ROOM](_state, { userRooms }) {
    _state.userRooms = userRooms;
  },

  [types.ADD_ROOM](_state, room) {
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
/* eslint-enable no-param-reassign */

export default {
  state,
  mutations,
};
