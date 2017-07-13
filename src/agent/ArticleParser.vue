<template>
  <div>
    <div id="url-input">
      <input class="input" placeholder="输入文章 URL" type="url" v-model="url">
      <button class="button is-success" v-on:click="parse">Reader Mode</button>
      <button class="button is-success" v-on:click="uploadArticle">Upload Article</button>
    </div>
    <div class="box content" v-if="uploadInProgress">Uploading Article to Cloud..</div>
    <div class="box content" id="content">
      <div v-if="parsingInProgress">Converting Article to Reader Mode...</div>
      <div v-if="!parsingInProgress">
        <h3>{{ title }}</h3>
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: 'articleParser',
  data() {
    return {
      url: '',
      title: 'title placeholder',
      content: 'content placeholder',
      parsingInProgress: false,
      uploadInProgress: false,
    };
  },
  methods: {
    parse() {
      this.reqData = {};
      this.reqData.url = this.url;
      console.log(this.url);
      this.parsingInProgress = true;

      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/articleParse', this.reqData).then((response) => {
        console.log(response);
        this.parsingInProgress = false;

        this.title = response.body.title;
        this.content = response.body.content;
      });
    },
    uploadArticle() {
      this.reqData = {};
      this.reqData.content = this.content;
      this.reqData.type = 'text/html; charset=UTF-8';
      this.reqData.originalname = this.title;
      this.uploadInProgress = true;

      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/upload-article', this.reqData).then((response) => {
        console.log(response);
        this.uploadInProgress = false;
      });

      // store article information to database
      const articleInfo = {};
      articleInfo.name = this.title;
      articleInfo.createdAt = new Date();

      this.$store.dispatch('setArticleInfo', articleInfo);
    },
  },
};
</script>
