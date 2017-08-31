import * as types from '../mutation-types';

const state = {
  publicArticleInfo: [],
  userArticleInfo: [],
  articleInfo: {},
};

const mutations = {
  [types.SET_PUBLICARTICLE_INFO](_state, articlesInfo) {
    console.log('setting public articles to store', articlesInfo);
    // if (_state.articleInfo[articleInfo.storageName]) {
    //   _state.publicArticleInfo.push(articleInfo);
    //   _state.articleInfo[articleInfo.storageName] = articleInfo;
    // }
    for (let i = 0; i < _state.publicArticleInfo.length; i += 1) {
      const key = _state.publicArticleInfo[i].storageName;
      delete _state.articleInfo[key];
    }
    _state.publicArticleInfo = articlesInfo;
    for (let i = 0; i < _state.publicArticleInfo.length; i += 1) {
      const key = _state.publicArticleInfo[i].storageName;
      _state.articleInfo[key] = _state.publicArticleInfo[i];
    }
  },
  [types.SET_USERARTICLE_INFO](_state, articlesInfo) {
    console.log('setting user articles to store', articlesInfo);
    // if (_state.articleInfo[articleInfo.storageName]) {
    //   _state.userArticleInfo.push(articleInfo);
    //   _state.articleInfo[articleInfo.storageName] = articleInfo;
    // }
    for (let i = 0; i < _state.userArticleInfo.length; i += 1) {
      const key = _state.userArticleInfo[i].storageName;
      delete _state.articleInfo[key];
    }
    _state.userArticleInfo = articlesInfo;
  },
};

export default {
  state,
  mutations,
};
