<template>
  <div class="box">
    <v-card class="grey lighten-5" flat>
      <v-toolbar dark class="primary elevation-0" extended>

      </v-toolbar>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card class="white" prominent>
              <v-toolbar-title class="body-4">{{ articleInfo.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <div v-if="inProgress">
              <v-progress-linear v-bind:indeterminate="true" class="mt-0"></v-progress-linear>
              <h6 class="text-xs-center">玩命加载中。。。</h6>
            </div>
            <v-card-text v-if="!inProgress" style="min-height: 200px;">
              <v-layout row>
                <span class="body-1 grey--text text--darken-1">创建日期: {{ articleInfo.createdAt | formatDate('MMM Do YY')}}</span>
                <v-spacer></v-spacer>
                <v-chip label small v-if="articleInfo.source" class="red white--text hidden-xs-only">
                  <v-icon left>link</v-icon>
                  <a class="body-1 white--text" target="_blank" v-bind:href="articleInfo.source">文章来源: {{ extractRootDomain() }}</a>
                </v-chip>
                <v-chip label small class="red white--text hidden-sm-and-up">
                  <v-icon left>link</v-icon>
                  <a class="body-1 white--text" target="_blank" v-bind:href="articleInfo.source">原链</a>
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
  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
<script>
import API from '../api';

export default {
  name: 'articleShareView',
  data() {
    return {
      content: '',
      qrCodeEnabled: false,
      inProgress: false,
      articleInfo: {},
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
      l.href = this.articleInfo.source;

      return l.hostname;
    },
    downloadArticle(fileName) {
      this.inProgress = true;
      API.getArticles({ storageName: fileName }).then((articleInfo) => {
        this.getArticleContent({ filename: fileName }).then((article) => {
          console.log('article response', articleInfo);
          this.articleInfo = articleInfo;
          this.content = article.body;
          this.inProgress = false;
        });
      });
    },

    getArticleContent(reqData) {
      return this.$http.post('https://us-central1-article-parser.cloudfunctions.net/downloadArticle', reqData);
    },
  },
};
</script>
