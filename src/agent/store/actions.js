import fetch from 'isomorphic-fetch';
import * as types from './mutation-types';
import raccoonAPI from '../../api';

// house
export const searchHouse = ({ commit, state, rootState }, searchTerms) => {
  raccoonAPI.searchHouse(searchTerms).then((houses) => {
    commit(types.RECEIVE_HOUSES, { houses });
    // TODO: tag favorite houses
    commit(types.TAG_FAVORITE, { favoriteHouses: rootState.user.favoriteHouses });
    // Filter house
    commit(types.FILTER_HOUSE, {
      filter: state.houses.lastFilter,
      isDelta: false,
    });
  });
};

export function fetchHouses({ commit }) {
  fetch('http://localhost:3000/house')
    .then(response => response.json())
    .then((houses) => {
      commit(types.RECEIVE_HOUSES, { houses });
    });
}

export function hoverHouse({ commit }, { house }) {
  commit(types.HOVER_HOUSE, { house });
}

export function selectHouse({ commit }, { id }) {
  commit(types.SELECT_HOUSE, { id });
}

export function unselectHouse({ commit }, { id }) {
  commit(types.UNSELECT_HOUSE, { id });
}

export const filterHouses = ({ commit }, { filter, isDelta }) => {
  commit(types.FILTER_HOUSE, { filter, isDelta });
};

export const setSort = ({ commit }, { key, asc }) => {
  commit(types.SET_SORT, { sort: { key, asc } });
};

export function selectHouses({ commit }, { ids }) {
  commit(types.SELECT_HOUSES, { ids });
}

export function unselectHouses({ commit }, { ids }) {
  commit(types.UNSELECT_HOUSES, { ids });
}

export function unselectAllHouses({ commit }) {
  commit(types.UNSELECT_ALL_HOUSES);
}

// user

export const setUser = ({ commit },
   { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar }) => {
  commit(types.CHANGE_USER, { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar });
  // set firebase user id, so we can refresh token
  raccoonAPI.refreshToken(id);
};

export function setUserProfile({ commit }, { id, isTemp, nickname, avatar, displayName, email }) {
  commit(types.LOAD_USER_PROFILE, { id, isTemp, nickname, avatar, displayName, email });
  // set firebase user id, so we can refresh token
  raccoonAPI.refreshToken(id);
}

export const setUserData = ({ commit }, { favoriteHouses, searches }) => {
  commit(types.LOAD_USER_DATA, { favoriteHouses, searches });
};

export const setUserRooms = ({ commit }, { userRooms }) => {
  commit(types.LOAD_USER_ROOM, { userRooms });
};

export const upsertRoom = ({ commit }, room) => {
  commit(types.UPSERT_ROOM, room);
};

// app
export const toggleSideBar = ({ commit }) => {
  commit(types.TOGGLE_SIDEBAR);
};

// share
export function selectCustomer({ commit }, { id }) {
  commit(types.SELECT_CUSTOMER, { id });
}

export function unselectCustomer({ commit }, { id }) {
  commit(types.UNSELECT_CUSTOMER, { id });
}

export function selectCustomers({ commit }, { ids }) {
  commit(types.SELECT_CUSTOMERS, { ids });
}

export function unselectCustomers({ commit }, { ids }) {
  commit(types.UNSELECT_CUSTOMERS, { ids });
}
