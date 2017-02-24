import * as types from '../mutation-types';
import * as filterSchema from '../../../components/filter/filter-schema';


// initial state
const state = {
  all: [],
  filterResults: [],
  lastFilter: [],
  selectedHouses: [],
  hovered: null,
  sort: null,
};

const sorting = () => {
  if (state.filterResults.length && state.sort) {
    const toSort = [];
    const notSort = [];
    state.filterResults.forEach((h) => {
      if (h[state.sort.key] !== undefined || h[state.sort.key] !== null) {
        toSort.push(h);
      } else {
        notSort.push(h);
      }
    });
    toSort.sort((a, b) => {
      if (a[state.sort.key] === b[state.sort.key]) {
        return 0;
      }
      if (state.sort.asc) {
        if (a[state.sort.key] < b[state.sort.key]) {
          return -1;
        }
        return 1;
      }
      if (a[state.sort.key] <= b[state.sort.key]) {
        return 1;
      }
      return -1;
    });
    state.filterResults = toSort.concat(notSort);
  }
};

// mutations
/* eslint-disable no-param-reassign */
const mutations = {
  [types.SET_SORT](_state, { sort }) {
    _state.sort = sort;
    sorting();
  },

  [types.RECEIVE_HOUSES](_state, { houses }) {
    console.log('Receiving houses -> ', houses.length);
    _state.all = houses;
  },

  [types.ADD_FAVORITE](_state, { id }) {
    const newFavorite = _state.all.find(h => h.id === id);
    newFavorite.like += 1;
    newFavorite.isFavor = true;
  },

  [types.REMOVE_FAVORITE](_state, { id }) {
    const toRemove = _state.all.find(h => h.id === id);
    toRemove.like -= 1;
    toRemove.isFavor = false;
  },

  [types.TAG_FAVORITE](_state, { favoriteHouses }) {
    favoriteHouses.forEach((favorite) => {
      _state.all.find(h => h.id === favorite.id).isFavor = true;
    });
  },

  [types.FILTER_HOUSE](_state, { filter, isDelta }) {
    console.log('filter', filter, 'isDelta', isDelta);
    if (filter.length === 0) {
      _state.filterResults = _state.all;
      return;
    }
    let toFilter = _state.all;
    if (isDelta) {
      // merge into lastFilter
      console.log('merge');
      filter.forEach((condition) => {
        const i = _state.lastFilter.findIndex(c => c.key === condition.key);
        if (i === -1) {
          _state.lastFilter.push(condition);
        } else {
          _state.lastFilter[i] = condition;
        }
      });
      // filter from last filter results
      toFilter = _state.filterResults;
    } else {
      _state.lastFilter = filter;
    }
    _state.filterResults = toFilter.filter((house) => {
      for (let i = 0; i < filter.length; i += 1) {
        const condition = filter[i];
        switch (condition.type) {
          case filterSchema.BETWEEN:
            if (house[condition.key] < condition.min || house[condition.key] > condition.max) {
              return false;
            }
            break;
          case filterSchema.GREATER:
            if (house[condition.key] < condition.min) {
              return false;
            }
            break;
          case filterSchema.LESS:
            if (house[condition.key] > condition.max) {
              return false;
            }
            break;
          case filterSchema.ONEOF:
            for (let j = 0; j < condition.choices.length; j += 1) {
              if (condition.choices[j].value === house[condition.key]) {
                if (!condition.choices[j].checked) {
                  return false;
                }
                break;
              }
            }
            break;
          default:
        }
      }
      return true;
    });
    sorting();
  },

  [types.HOVER_HOUSE](_state, { house }) {
    console.log('Hover house -> ', house);
    _state.hovered = house;
  },

  [types.SELECT_HOUSE](_state, { house }) {
    console.log('Adding house to selected houses -> ', house);
    _state.selectedHouses.push(house);
  },

  [types.UNSELECT_HOUSE](_state, { house }) {
    console.log('Removing house from selected houses -> ', house);
    const index = _state.selectedHouses.indexOf(house);
    if (index > -1) {
      _state.selectedHouses.splice(index, 1);
    }
  },
};
/* eslint-enable no-param-reassign */

export default {
  state,
  mutations,
};
