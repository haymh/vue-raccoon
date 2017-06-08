/**
* @Author: Wen Xin <xinwen>
* @Date:   2016-12-03T20:15:52-08:00
* @Last modified by:   xinwen
* @Last modified time: 2016-12-03T20:15:52-08:00
*/

import axios from 'axios';
import * as houseAPI from './house';

// const baseURL = 'https://rest-dot-raccoon-c86bb.appspot-preview.com';
const baseURL = 'http://localhost:3000';
// const baseURL = 'http://104.196.242.243:3000';

class RacAPIClient {
  constructor() {
    console.log('RacAPIClient Initiated');
    this.client = axios.create({
      baseURL,
      timeout: 5000,
    });
    this.client.defaults.headers.post['Content-Type'] = 'application/json';
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
        // params: { types: '(cities)', q: qs },
        params: { q: qs },
      })
    .then(response => response.data);
  }

  getFavorite(firebaseUserId) {
    return this.client.get('/user/favorite',
      {
        params: { uid: firebaseUserId },
      })
    .then(response => response.data);
  }

  getRecentViewed(userId) {
    return this.houseAPI.recentViewed(userId);
  }

  searchHouse(searchTerm) {
    const byGeo = searchTerm ? searchTerm.byGeo : false;
    const api = byGeo ? './house/geoSearch' : './house/search';
    return this.client.get(api,
      {
        params: { ...searchTerm, byGeo: undefined },
      },
    ).then((response) => {
      if (byGeo) {
        return response.data.map(result => ({ ...result.obj, dist: result.dist }));
      }
      return response.data;
    });
  }

  getHouse(houseId) {
    return this.client.get(`/house/${houseId}`).then(response => response.data);
  }

  getShare(shareId) {
    return this.client.get(`/share/${shareId}`)
      .then((response) => {
        console.log('shareObject', response.data);
        return this.client.post('/house/search', response.data.query);
      });
  }

  getSchool(urlValue) {
    return this.client.get('/house/school', {
      params: { box: urlValue },
    }).then(response => response.data);
  }

  createShare(share) {
    console.log(this);
    return this.client.post('/share', share).then(response => response.data);
  }

  update(share) {
    return this.client.put('/share', share).then(response => response.data);
  }
}

const instance = new RacAPIClient();
Object.freeze(instance);

export default instance;
