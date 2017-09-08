<template>
  <div class="box">
    <v-card class="grey lighten-5" flat>
      <v-toolbar dark class="primary elevation-0" extended>

      </v-toolbar>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card class="white" prominent>
              <v-toolbar-title class="body-4">{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon v-if="!inProgress">
                <v-icon class="blue--text">fa-qrcode fa-2x</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <div v-if="inProgress">
              <v-progress-linear v-bind:indeterminate="true" class="mt-0"></v-progress-linear>
              <h6 class="text-xs-center">文章加载中。。。</h6>
            </div>
            <v-card-text v-if="!inProgress" style="min-height: 200px;">
              <v-layout row>
                <span class="body-1 grey--text text--darken-1">创建日期: {{ createdAt | formatDate('MMM Do YY')}}</span>
                <v-spacer></v-spacer>
                <v-chip label small class="red white--text hidden-xs-only">
                  <v-icon left>link</v-icon>
                  <a class="body-1 white--text" target="_blank" v-bind:href="source">文章来源: {{ extractRootDomain() }}</a>
                </v-chip>
                <v-chip label small class="red white--text hidden-sm-and-up">
                  <v-icon left>link</v-icon>
                  <a class="body-1 white--text" target="_blank" v-bind:href="source">原链</a>
                </v-chip>
              </v-layout>
              <!-- <v-chip label small outline class="red red--text" v-for="item in categories" :key="item.name">{{item.name}}</v-chip> -->
              <div class="mt-4" v-html="content"></div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>
<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
<script>
import API from '../api';

export default {
  name: 'articleShareView',
  data() {
    return {
      title: '',
      content: '',
      categories: [],
      createdAt: '',
      source: '',
      qrCodeEnabled: false,
      inProgress: false,
    };
  },
  created() {
    console.log('id', this.$route.params.id);
    API.getArticleSharebyId(this.$route.params.id).then((response) => {
      this.downloadArticle(response.articleInfo.storageName);
    });
  },
  methods: {
    extractRootDomain() {
      const l = document.createElement('a');
      l.href = this.source;

      return l.hostname;
    },
    downloadArticle(fileName) {
      const storeArticleInfo = this.$store.getters.getArticleInfoByStorageName(fileName);
      this.inProgress = true;
      if (storeArticleInfo) {
        this.getArticleContent({ filename: fileName }).then((article) => {
          console.log('article ', article);
          this.title = storeArticleInfo.name;
          this.categories = storeArticleInfo.categories;
          this.createdAt = storeArticleInfo.createdAt;
          this.source = storeArticleInfo.source;
          this.content = article.body;
          this.inProgress = false;
        });
      } else {
        API.getArticleByStorageName(fileName).then((articleInfo) => {
          this.getArticleContent({ filename: fileName }).then((article) => {
            console.log('article response', articleInfo);
            this.title = articleInfo.name;
            this.categories = articleInfo.categories;
            this.createdAt = articleInfo.createdAt;
            this.source = articleInfo.source;
            this.content = article.body;
            this.inProgress = false;
          });
        });
      }
    },

    getArticleContent(reqData) {
      return this.$http.post('https://us-central1-article-parser.cloudfunctions.net/downloadArticle', reqData);
    },
  },
};
</script>
