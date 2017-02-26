import _ from 'lodash';
import * as types from '../mutation-types';

// initial state
const state = {
  allCustomers: [],
  selectedCustomers: [],
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
};

export default {
  state,
  mutations,
};
