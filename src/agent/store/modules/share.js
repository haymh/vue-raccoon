import _ from 'lodash';
import * as types from '../mutation-types';

// initial state
const state = {
  allCustomers: [],
  selectedCustomers: [],
  selectedHouses: [],
  byFilter: false,
  uid: null,
};

const mutations = {
  [types.SELECT_CUSTOMER](_state, { id }) {
    _state.selectedCustomers.push(id);
  },

  [types.UNSELECT_CUSTOMER](_state, { id }) {
    const index = _state.selectedCustomers.indexOf(id);
    if (index > -1) {
      _state.selectedCustomers.splice(index, 1);
    }
  },

  [types.SELECT_CUSTOMERS](_state, { ids }) {
    _state.selectedCustomers = _.union(_state.selectedCustomers, ids);
  },

  [types.UNSELECT_CUSTOMERS](_state, { ids }) {
    _state.selectedCustomers = _.difference(_state.selectedCustomers, ids);
  },

  [types.SELECT_HOUSE](_state, { house }) {
    console.log('Adding house to selected houses -> ', house._id);
    _state.selectedHouses.push(house);
  },

  [types.UNSELECT_HOUSE](_state, { house }) {
    console.log('Removing house from selected houses -> ', house._id);
    const index = _state.selectedHouses.indexOf(house);
    if (index > -1) {
      _state.selectedHouses.splice(index, 1);
    }
  },

  [types.SELECT_HOUSES](_state, { houses }) {
    _state.selectedHouses = _.union(_state.selectedHouses, houses);
  },

  [types.UNSELECT_HOUSES](_state, { houses }) {
    _state.selectedHouses = _.difference(_state.selectedHouses, houses);
  },

  [types.UNSELECT_ALL_HOUSES](_state) {
    _state.selectedHouses = [];
  },

  [types.SET_BY_FILTER](_state, { byFilter }) {
    _state.byFilter = byFilter;
  },

  [types.SET_SHARE_ID](_state, { uid }) {
    _state.uid = uid;
  },
};

export default {
  state,
  mutations,
};
