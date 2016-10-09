import * as types from './mutation-types';
import house from '../api/house';

export const searchHouse = ({ commit, state }, searchTerms) => {
  house.search(searchTerms).then((houses) => {
    commit(types.RECEIVE_HOUSES, { houses });
    // TODO: tag favorite houses
    commit(types.TAG_FAVORITE);
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
