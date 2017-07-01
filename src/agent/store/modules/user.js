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
  displayName: '',
};

// mutations
/* eslint-disable no-param-reassign */
const mutations = {
  [types.CHANGE_USER](_state,
    { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar, displayName }) {
    console.log('isTemp', isTemp);
    _state.id = id || _state.id;
    _state.isTemp = isTemp;
    _state.nickname = nickname || _state.nickname;
    _state.favoriteHouses = favoriteHouses || _state.favoriteHouses;
    _state.searches = searches || _state.search;
    _state.userRooms = userRooms || _state.userRooms;
    _state.avatar = avatar || _state.avatar;
    _state.displayName = displayName || _state.displayName;
  },

  [types.LOAD_USER_PROFILE](_state, { id, isTemp, nickname, avatar, displayName, email }) {
    _state.id = id;
    _state.isTemp = isTemp;
    _state.nickname = nickname;
    _state.avatar = avatar;
    _state.displayName = displayName;
    _state.email = email;
  },

  [types.LOAD_USER_DATA](_state, { favoriteHouses, searches }) {
    _state.favoriteHouses = favoriteHouses;
    _state.searches = searches;
  },

  [types.LOAD_USER_ROOM](_state, { userRooms }) {
    _state.userRooms = userRooms;
  },

  [types.UPSERT_ROOM](_state, newRoom) {
    for (let i = 0; i < _state.userRooms.length; i += 1) {
      if (_state.userRooms[i].roomId === newRoom.roomId) {
        _state.userRooms[i] = newRoom;
        return;
      }
    }
    _state.userRooms.push(newRoom);
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
