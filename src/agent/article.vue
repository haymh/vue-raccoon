<template>
  <div>
    <router-link class="button is-primary" :to="'/articleParser'">Article Parser</router-link>
    <div v-if="loadingList" class="box">
      <clip-loader v-if="loadingList"></clip-loader>
    </div>
    <div v-if="!loadingList" v-for="item in articleInfo">
      <single-article-list :singleArticleListingData="item"></single-article-list>
    </div>
  </div>
</template>

<style>

#url-input {
  width: 600px;
  margin: 5px 0px 5px 5px;
}


#content {
    width: 600px;
}
</style>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import SingleArticleList from './components/Articles/SingleArticleList.vue';

export default {
  name: 'article',
  data() {
    return {
      articleInfo: [],
      loadingList: false,
    };
  },
  components: {
    'clip-loader': ClipLoader,
    'single-article-list': SingleArticleList,
  },
  created() {
    console.log('called create');
    this.getArticleNames();
  },
  methods: {
    getArticleNames() {
      this.loadingList = true;
      console.log(this.loadingList);
      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/getArticleInfo').then((response) => {
        console.log(response);
        this.articleInfo = response.body;
        this.loadingList = false;
      });
    },
  },
};
</script>
