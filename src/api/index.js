/**
* @Author: Wen Xin <xinwen>
* @Date:   2016-12-03T20:15:52-08:00
* @Last modified by:   xinwen
* @Last modified time: 2016-12-03T20:15:52-08:00
*/

import axios from 'axios';
import * as houseAPI from './house';

const baseURL = 'https://rest-dot-raccoon-c86bb.appspot-preview.com';
// const baseURL = 'http://localhost:3000';

class RacAPIClient {
  constructor() {
    console.log('RacAPIClient Initiated');
    this.client = axios.create({
      baseURL,
      timeout: 1000,
    });
    this.houseAPI = houseAPI;
    this.firebaseUserId = null;
  }

  refreshToken(firebaseUserId) {
    if (firebaseUserId) {
      this.client.post('/user/auth',
        {
          uid: firebaseUserId,
        })
        .then((response) => {
          console.log('got token', response.data.token);
          this.client.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        });
    } else {
      console.log('firebase user id is not set');
      throw new Error('firebase user id is not set');
    }
  }

  /**
   * Get auto complete result
   * @returns {Promise} - result
   */
  getAutoComplete(qs) {
    return this.client.get('/autocomplete',
      {
        params: { types: '(cities)', q: qs },
      })
    .then(response => response.data);
  }

  getFavorite(userId) {
    return this.houseAPI.favorite(userId);
  }

  getRecentViewed(userId) {
    return this.houseAPI.recentViewed(userId);
  }

  searchHouse(searchTerm) {
    return this.client.get('./house/search',
      {
        params: { ...searchTerm },
      },
    ).then(response => response.data);
  }

  getHouse(houseId) {
    return this.client.get(`/house/${houseId}`).then(response => response.data);
  }
}

const instance = new RacAPIClient();
Object.freeze(instance);

export default instance;
