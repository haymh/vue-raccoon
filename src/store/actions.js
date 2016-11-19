import fetch from 'isomorphic-fetch';
import * as types from './mutation-types';
import search from '../api/house';

export const searchHouse = ({ commit, state, rootState }, searchTerms) => {
  search(searchTerms).then((houses) => {
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

export function selectHouse({ commit }, { house }) {
  commit(types.SELECT_HOUSE, { house });
}

export const filterHouses = ({ commit }, { filter, isDelta }) => {
  commit(types.FILTER_HOUSE, { filter, isDelta });
};

export const setUser = ({ commit },
   { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar }) => {
  commit(types.CHANGE_USER, { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar });
};

export const setUserProfile = ({ commit }, { id, isTemp, nickname, avatar }) => {
  commit(types.LOAD_USER_PROFILE, { id, isTemp, nickname, avatar });
};

export const setUserData = ({ commit }, { favoriteHouses, searches }) => {
  commit(types.LOAD_USER_DATA, { favoriteHouses, searches });
};

export const setUserRooms = ({ commit }, { userRooms }) => {
  commit(types.LOAD_USER_ROOM, { userRooms });
};

export const upsertRoom = ({ commit }, room) => {
  commit(types.UPSERT_ROOM, room);
};
