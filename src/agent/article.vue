<template>
  <div>
    <v-btn primary dark :to="'/articleParser'">Article Parser</v-btn>
    <button v-on:click="getArticleInfo">Get Articles</button>
    <div v-for="item in articleInfo">
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
import { mapGetters } from 'vuex';
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
  created() {
    this.getArticleInfo();
  },
  watch: {
    user: {
      handler(newUser) {
        if (newUser) {
          console.log('new User', newUser);
          this.getArticleInfo();
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  components: {
    'single-article-list': SingleArticleList,
  },
  methods: {
    getArticleInfo() {
      console.log(this.user);
      this.loadingList = true;
      console.log(this.loadingList);

      this.articleInfo = this.$store.getters.getArticleInfo;
      console.log('articleInfo ', this.articleInfo);

      if (this.articleInfo.length === 0) {
        API.getAllArticles().then((info) => {
          console.log('articleInfo', info);
          this.articleInfo = info;
          for (let i = 0; i < info.length; i += 1) {
            this.$store.dispatch('setArticleInfo', info[i]);
          }
        });
      }
    },
  },
};
</script>
