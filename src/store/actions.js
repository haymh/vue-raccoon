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
      refilter: true,
    });
  });
};

export const filterHouses = ({ commit }, filter) => {
  commit(types.FILTER_HOUSE, {
    filter,
    refilter: false,
  });
};

export const setUser = ({ commit }, { id, isTemp, favoriteHouses, searches }) => {
  commit(types.CHANGE_USER, { id, isTemp, favoriteHouses, searches });
};
