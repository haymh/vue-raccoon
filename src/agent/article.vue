<template>
  <div>
    <router-link class="button is-primary" :to="'/articleParser'">Article Parser</router-link>
    <div v-on:click="getArticleNames">Articles</div>
    <div v-if="loadingList" class="box">
      <div v-if="loadingList">Loading Article List</div>
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
import SingleArticleList from './components/Articles/SingleArticleList.vue';
import API from '../api';

export default {
  name: 'article',
  data() {
    return {
      articleInfo: [],
      loadingList: false,
    };
  },
  components: {
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

      API.getAllArticles().then((info) => {
        console.log(info);
        this.articleInfo = info;
      });
      // this.$http.post('https://us-central1-article-parser.cloudfunctions.net/getArticleInfo').then((response) => {
      //   console.log(response);
      //   this.articleInfo = response.body;
      //   this.loadingList = false;
      // });
    },
  },
};
</script>
