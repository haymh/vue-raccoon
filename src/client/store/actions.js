import fetch from 'isomorphic-fetch';
import * as types from './mutation-types';
import raccoonAPI from '../../api';
import { openStreetAPI, MapUtil } from '../../api/map';

export const searchHouse = ({ commit, state, rootState }, searchTerms) => {
  commit(types.SHOW_PROGRESSBAR, true);
  raccoonAPI.searchHouse(searchTerms).then((houses) => {
    commit(types.RECEIVE_HOUSES, { houses });
    // TODO: tag favorite houses
    commit(types.TAG_FAVORITE, { favoriteHouses: rootState.user.favoriteHouses });
    // Filter house
    commit(types.FILTER_HOUSE, {
      filter: state.houses.lastFilter,
      isDelta: false,
    });
    commit(types.SHOW_PROGRESSBAR, false);
  }).catch((error) => {
    commit(types.SHOW_PROGRESSBAR, false);
    console.error('Store.actions.searchHouse', error);
  });
};

export const searchHouseMap = ({ commit, state, rootState }, searchTerms) => {
  console.log('searchHouseMap');
  commit(types.SHOW_PROGRESSBAR, true);
  if (searchTerms.byGeo) {
    console.log('search cluster by geo');
    let level = searchTerms.level === undefined ? null : searchTerms.level;
    const box = searchTerms.box;
    if (level === null) {
      const a = MapUtil.calculateAreaFromRaccoonBox(box);
      level = MapUtil.areaToClusterLevel(a);
    }
    console.log('cluster level', level, 'search term level', searchTerms.level);
    if (level === -1) {
      // display house marker on map
      commit(types.SHOW_CLUSTER, false);
    } else {
      // TODO: search cluster by box and level
      Promise.all([
        raccoonAPI.searchCluster(box, level),
        raccoonAPI.searchHouse(searchTerms),
      ]).then((results) => {
        console.log('result', results);
        const mapResult = results[0];
        const listResult = results[1];
        if (mapResult) {
          if (mapResult.type === 'cluster') {
            commit(types.SET_CLUSTER, mapResult.data);
            // display cluster on map
            commit(types.SHOW_CLUSTER, true);
          } else if (mapResult.type === 'houses') {
            console.log('showing houses');
            commit(types.SET_HOUSES_ON_MAP, mapResult.data);
            commit(types.SHOW_CLUSTER, false);
          }
        } else {
          commit(types.SHOW_CLUSTER, false);
        }
        commit(types.RECEIVE_HOUSES, { houses: listResult });
        // TODO: tag favorite houses
        commit(types.TAG_FAVORITE, { favoriteHouses: rootState.user.favoriteHouses });
        // Filter house
        commit(types.FILTER_HOUSE, {
          filter: state.houses.lastFilter,
          isDelta: false,
        });
        commit(types.SHOW_PROGRESSBAR, false);
      }).catch((error) => {
        commit(types.SHOW_PROGRESSBAR, false);
        console.error('Store.actions.searchHouse', error);
      });
    }
  } else {
    openStreetAPI.getOutline(searchTerms).then((data) => {
      console.log('openStreetAPI result', data);
      commit(types.SET_OUTLINE, data[0]);
      const raccoonBboxString = MapUtil.convertToRaccoonBbox(data[0].boundingbox);
      const a = MapUtil.calculatePolygonArea(data[0].geojson);
      console.log('area', a, 'km^2', 'raccoonBboxString', raccoonBboxString);
      const level = MapUtil.areaToClusterLevel(a);
      console.log('cluster level', level);
      if (level === -1) {
        // display house marker on map
        commit(types.SHOW_CLUSTER, false);
        return Promise.all([
          Promise.resolve(null),
          raccoonAPI.searchHouse(searchTerms),
        ]);
      }
      console.log('search clusters by bounding box');
      return Promise.all([
        raccoonAPI.searchCluster(raccoonBboxString, level),
        raccoonAPI.searchHouse(searchTerms),
      ]);
    }).then((results) => {
      console.log('results', results);
      const mapResult = results[0];
      const listResult = results[1];
      if (mapResult) {
        if (mapResult.type === 'cluster') {
          commit(types.SET_CLUSTER, mapResult.data);
          // display cluster on map
          commit(types.SHOW_CLUSTER, true);
        } else if (mapResult.type === 'houses') {
          console.log('showing houses');
          commit(types.SET_HOUSES_ON_MAP, mapResult.data);
          commit(types.SHOW_CLUSTER, false);
        }
      }
      commit(types.RECEIVE_HOUSES, { houses: listResult });
      // TODO: tag favorite houses
      commit(types.TAG_FAVORITE, { favoriteHouses: rootState.user.favoriteHouses });
      // Filter house
      commit(types.FILTER_HOUSE, {
        filter: state.houses.lastFilter,
        isDelta: false,
      });
      commit(types.SHOW_PROGRESSBAR, false);
    }).catch((error) => {
      commit(types.SHOW_PROGRESSBAR, false);
      console.error('Store.actions.searchHouse', error);
    });
  }
};

export const setOutline = ({ commit }, outline) => {
  commit(types.SET_OUTLINE, outline);
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

export const setUser = ({ commit },
  { id, isTemp, nickname, favoriteHouses, searches, userRooms, avatar, displayName }) => {
  console.log('setUser, isTemp', isTemp);
  commit(types.CHANGE_USER, {
    id,
    isTemp,
    nickname,
    favoriteHouses,
    searches,
    userRooms,
    avatar,
    displayName,
  });
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
