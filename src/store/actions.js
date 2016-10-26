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

export const filterHouses = ({ commit }, { filter, isDelta }) => {
  commit(types.FILTER_HOUSE, { filter, isDelta });
};

export const setUser = ({ commit },
   { id, isTemp, nickName, favoriteHouses, searches, userRooms, avatar }) => {
  commit(types.CHANGE_USER, { id, isTemp, nickName, favoriteHouses, searches, userRooms, avatar });
};

export const setUserProfile = ({ commit }, { id, isTemp, nickName, avatar }) => {
  commit(types.LOAD_USER_PROFILE, { id, isTemp, nickName, avatar });
};

export const setUserData = ({ commit }, { favoriteHouses, searches }) => {
  commit(types.LOAD_USER_DATA, { favoriteHouses, searches });
};

export const setUserRooms = ({ commit }, { userRooms }) => {
  commit(types.LOAD_USER_ROOM, { userRooms });
};

export const addRoom = ({ commit }, room) => {
  commit(types.ADD_ROOM, room);
};
