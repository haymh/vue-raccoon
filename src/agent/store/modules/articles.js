import * as types from '../mutation-types';

const state = {
  articleInfo: [],
  articleNameMap: {},
};

const mutations = {
  [types.ARTICLE_INFO](_state, articleInfo) {
    console.log('mutating article state', articleInfo);
    _state.articleInfo.push(articleInfo);
    _state.articleNameMap[articleInfo.dbName] = articleInfo.name;
    console.log('persisted data: ', _state.articleNameMap[articleInfo.dbName]);
  },
};

export default {
  state,
  mutations,
};
