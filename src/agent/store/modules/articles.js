import * as types from '../mutation-types';

const state = {
  articleInfo: [],
};

const mutations = {
  [types.ARTICLE_INFO](_state, articleInfo) {
    _state.articleInfo.push(articleInfo);
  },
};

export default {
  state,
  mutations,
};
