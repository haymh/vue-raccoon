/**
* @Author: Wen Xin <xinwen>
* @Date:   2016-12-03T20:15:52-08:00
* @Last modified by:   xinwen
* @Last modified time: 2016-12-03T20:15:52-08:00
*/

import axios from 'axios';
import * as houseAPI from './house';

const baseURL = 'http://127.0.0.1:3000';
// TODO: Change this token when you became a new user
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE0ODI0Njg1NTgsImV4cCI6MTQ4MjU1NDk1OH0.cfv_bg4X-kfsIEhvxQF2y9mQdzh9UZ2HCcC6BeMGuTc';

class RacAPIClient {
  constructor() {
    console.log('RacAPIClient Initiated');
    this.client = axios.create({
      baseURL,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.houseAPI = houseAPI;
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
}

const instance = new RacAPIClient();
Object.freeze(instance);

export default instance;
