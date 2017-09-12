import * as types from '../mutation-types';
import * as filterSchema from '../../../components/filter/filter-schema';


// initial state
const state = {
  all: [],
  filterResults: [],
  lastFilter: [],
  hovered: null,
  sort: null,
  searchTerms: null,
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

const getValue = (object, keys) => {
  let i = 1;
  let value = object[keys[0]];
  while (i < keys.length) {
    value = value[keys[i]];
    i += 1;
  }
  return value;
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
        const value = getValue(house, condition.key);
        switch (condition.type) {
          case filterSchema.BETWEEN:
            if (value < condition.min || value > condition.max) {
              return false;
            }
            break;
          case filterSchema.GREATER:
            if (value < condition.min) {
              return false;
            }
            break;
          case filterSchema.LESS:
            if (value > condition.max) {
              return false;
            }
            break;
          case filterSchema.ONEOF:
            for (let j = 0; j < condition.choices.length; j += 1) {
              if (condition.choices[j].value === value) {
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

  [types.ADD_SEARCH_TERMS](_state, { searchTerms }) {
    _state.searchTerms = searchTerms;
  },

};
/* eslint-enable no-param-reassign */

export default {
  state,
  mutations,
};
