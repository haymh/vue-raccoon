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

export const setUser = ({ commit }, { id, isTemp, favoriteHouses, searches }) => {
  commit(types.CHANGE_USER, { id, isTemp, favoriteHouses, searches });
};
