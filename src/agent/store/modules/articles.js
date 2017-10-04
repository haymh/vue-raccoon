import * as types from '../mutation-types';

const state = {
  articlesInfo: [],
};

const mutations = {
  [types.SET_ARTICLE_INFO](_state, articlesInfo) {
    console.log('setting articlesInfo to store', articlesInfo);
    // if (articlesInfo.length > 1) {
    _state.articlesInfo = articlesInfo;
    // } else {
    //  _state.articlesInfo.push(articlesInfo);
    // }
  },
  [types.DELETE_ARTICLE_INFO](_state, articleInfo) {
    console.log('delete Article from articlesInfo', articleInfo);
    for (let i = 0; i < _state.articlesInfo.length; i += 1) {
      if (_state.articlesInfo[i]._id === articleInfo._id) {
        _state.articlesInfo.splice(i, 1);
      }
    }
  },
};

export default {
  state,
  mutations,
};
