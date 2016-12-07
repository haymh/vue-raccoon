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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE0ODA4MjYwNjMsImV4cCI6MTQ4MDkxMjQ2M30.eQdGJkyM1IQkfvAx2Ai2GJEiKWJF-Z0rJlS1PTLL068';

class RacAPIClient {
  constructor() {
    if (!RacAPIClient.instance) {
      console.log('RacAPIClient Initiated');
      this.client = axios.create({
        baseURL,
        timeout: 1000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.houseAPI = houseAPI;
      RacAPIClient.instance = this;
    }
    return RacAPIClient.instance;
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
/* eslint-disable */
  getFavorite(userId) {
    console.log(userId);
    // return this.houseAPI.favorite(userId);
    return new Promise((fulfill, reject) => reject());
  }

  getRecentViewed(userId) {
    return this.houseAPI.recentViewed(userId);
  }
}

const instance = new RacAPIClient();
Object.freeze(instance);

export default instance;
