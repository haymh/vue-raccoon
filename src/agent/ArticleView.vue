<template>
  <div class="box">
    <h3 class="title is-3">{{ title }}</h3>
    <div v-html="articleContent"></div>
  </div>
</template>
<style>
</style>
<script>
  export default {
    name: 'articleView',
    data() {
      return {
        title: '',
        articleContent: '',
      };
    },
    created() {
      this.title = this.$route.params.fileName;
      this.downloadArticle(this.$route.params.fileName);
    },
    methods: {
      downloadArticle(fileName) {
        this.reqData = {};
        this.reqData.filename = fileName;
        this.$http.post('https://us-central1-article-parser.cloudfunctions.net/downloadArticle', this.reqData).then((response) => {
          this.articleContent = response.body;
        });
      },
    },
  };
</script>
