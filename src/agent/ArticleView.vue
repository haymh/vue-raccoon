<template>
  <div class="box">
    <h3 class="title is-3">{{ title }}</h3>
    <div v-html="articleContent"></div>
  </div>
</template>
<style>
</style>
<script>
import API from '../api';

export default {
  name: 'articleView',
  data() {
    return {
      title: '',
      articleContent: '',
    };
  },
  created() {
    this.downloadArticle(this.$route.params.fileName);
  },
  methods: {
    downloadArticle(fileName) {
      this.reqData = {};
      this.reqData.filename = fileName;


      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/downloadArticle', this.reqData).then((response) => {
        // get article content
        this.articleContent = response.body;

        // get article name
        const storageTitle = this.$store.getters.getFileNameByDBName(this.$route.params.fileName);
        if (storageTitle) {
          this.title = storageTitle;
        } else {
          API.getArticleNameByDBName(this.$route.params.fileName).then((articleName) => {
            console.log('article name response', articleName);
            this.title = articleName;
          });
        }
        console.log('article view title: ', this.title);
      });
    },
  },
};
</script>
