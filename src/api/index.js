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
      timeout: 10000,
    });
    this.client.defaults.headers.post['Content-Type'] = 'application/json';
    this.houseAPI = houseAPI;
    this.firebaseUserId = null;
  }

  refreshToken(firebaseUserId) {
    if (firebaseUserId) {
      return this.client.post('/user/auth',
        {
          uid: firebaseUserId,
        })
        .then((response) => {
          console.log('got token', response.data.token);
          this.client.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        });
    }
    console.log('firebase user id is not set');
    throw new Error('firebase user id is not set');
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

  // articles
  createArticle(articleInfo) {
    console.log('RaccoonAPI creating article in DB', articleInfo);
    return this.client.post('/article/create', articleInfo).then((response, err) => {
      if (!err) {
        console.log('RaccoonAPI article created in DB');
        return response;
      }
      console.log('RaccoonAPI error on create article', err);
      return err;
    });
  }

  getAllArticles() {
    console.log('RaccoonAPI getting all articleInfo');
    return this.client.get('/article/getAll').then(response => response.data);
  }

  getAllPublicArticles() {
    console.log('RaccoonAPI getting all public articleInfo');
    return this.client.get('/article/getAllPublic').then(response => response.data);
  }

  getArticleByUserId(userId) {
    console.log('RaccoonAPI getting article by userId', userId);
    return this.client.get(`/article/user/${userId}`).then(response => response.data);
  }

  getArticleByStorageName(storageName) {
    console.log('RaccoonAPI getting article Name using storageName', storageName);
    return this.client.get(`/article/${storageName}`).then(response => response.data);
  }

  // article share
  createArticleShare(articleShareInfo) {
    console.log('RaccoonAPI creating article share', articleShareInfo);
    return this.client.post('/articleShare/create', articleShareInfo).then(response => response.data);
  }

  getArticleShareId(userId, articleId) {
    console.log('RaccoonAPI getting article Share by userid and articleId', userId, articleId);
    const reqData = {
      userId,
      articleId,
    };
    console.log(reqData);
    return this.client.get('/articleShare/getId', reqData).then((response) => {
      if (response.data === 'ERROR') {
        console.log('RaccoonAPI get article share id error');
        return response.data;
      }
      console.log('RaccoonAPI get article share id successful');
      return response.data;
    });
  }

  getArticleSharebyId(articleShareId) {
    console.log('RaccoonAPI getting article share by id', articleShareId);
    return this.client.get('/articleShare/get', articleShareId).then((response, err) => {
      if (err) {
        console.log('RaccoonAPI get share id error');
        return err;
      }
      console.log('RaccoonAPI get share id successful');
      return response.data;
    });
  }
  // category
  getAllCategoriesName() {
    console.log('RaccoonAPI getting all categories');
    return this.client.get('/category/getAllNames').then(response => response.data);
  }

  getPublicArticlesInCategory(cateName) {
    console.log('RaccoonAPI getting public articles by category name', cateName);
    return this.client.get(`/category/public/${cateName}`).then(response => response.data);
  }

  getUserArticlesInCategory(cateName) {
    console.log('RaccoonAPI getting user articles by category name', cateName);
    return this.client.get(`/category/user/${cateName}`).then(response => response.data);
  }

  // contact
  createContact(contact) {
    return this.client.post('/contact', contact).then(response => response.data);
  }

  createContacts(contacts) {
    return this.client.post('/contact', {
      batch: true,
      contacts,
    }).then(response => response.data);
  }

  updateContact(contact) {
    return this.client.put('/contact', contact).then(response => response.data);
  }

  deleteContacts(ids) {
    return this.client.post('/contact/delete', { ids }).then(response => response.data);
  }

  getContacts(userId) {
    return this.client.get('/contact', {
      params: {
        userId,
      },
    }).then(response => response.data);
  }

  getContactsCount(userId) {
    return this.client.get('/contact/count', {
      params: {
        userId,
      },
    }).then(response => response.data);
  }
}

const instance = new RacAPIClient();
Object.freeze(instance);

export default instance;
