<template>
  <div class="box">
    <v-card class="grey lighten-5" flat>
      <v-toolbar dark class="primary elevation-0" extended>

      </v-toolbar>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card class="white" prominent>
              <v-toolbar-title v-if="!editmode" class="body-4">{{ articleInfo.name }}</v-toolbar-title>
              <v-toolbar-title v-if="editmode" class="body-4">编辑文章</v-toolbar-title>
              <v-spacer></v-spacer>
              <articleShareQR v-if="!inProgress" :articleId="articleInfo._id"></articleShareQR>
              <v-btn icon v-if="editmode && !uploadEnabled" disabled>
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn icon v-if="editmode && uploadEnabled" @click.native="saveUpdate">
                <v-icon class="blue--text">save</v-icon>
              </v-btn>
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
              <div v-if="!editmode" class="mt-4" v-html="content"></div>
              <v-container v-if="editmode">
                <div class="box content" id="content">
                  <articleEditor
                    :content="content"
                    :title="articleInfo.name"
                    @titleChange="titleChange($event)"
                    @contentChange="contentChange($event)">
                  </articleEditor>
                </div>
              </v-container>
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
import { mapGetters } from 'vuex';
import API from '../api';
import articleShareQR from './components/Articles/articleShareQR.vue';
import articleEditor from './components/Articles/articleEditor.vue';

export default {
  name: 'articleView',
  data() {
    return {
      content: '',
      qrCodeEnabled: false,
      inProgress: false,
      editmode: false,
      uploadEnabled: false,
      articleInfo: {},
    };
  },
  components: {
    articleShareQR,
    articleEditor,
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
  },
  created() {
    this.downloadArticle(this.$route.params.fileName);
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
          this.articleInfo = articleInfo[0];
          this.content = article.body;
          if (this.$route.query.edit && this.userId === this.articleInfo.userId) {
            this.editmode = true;
          }
          this.inProgress = false;
        });
      });
    },
    getArticleContent(reqData) {
      return this.$http.post('https://us-central1-article-parser.cloudfunctions.net/downloadArticle', reqData);
    },
    titleChange(eventVal) {
      this.articleInfo.name = eventVal;
      this.uploadEnabled = true;
    },
    contentChange(eventVal) {
      this.content = eventVal;
      this.uploadEnabled = true;
    },
    saveUpdate() {
      this.reqData = {};
      this.reqData.content = this.content;
      this.reqData.type = 'text/html; charset=UTF-8';
      this.reqData.fileName = this.articleInfo.storageName;

      this.inProgress = true;
      console.log('upload this', this.reqData);
      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/upload-article', this.reqData).then((response) => {
        console.log('article uploaded: ', response);
        // this.sendSuccessAlert(this.uploadSuccessMessage);
        // store article information to database
        const updateArticleInfo = {};
        updateArticleInfo.name = this.articleInfo.name;
        updateArticleInfo.id = this.articleInfo._id;
        API.updateArticle(updateArticleInfo).then((res) => {
          console.log('api update article data', res);
          this.articleInfo = res;
          this.uploadEnabled = false;
          this.editmode = false;
          this.shareEnabled = true;
          this.inProgress = false;
        });
      });
    },
  },
};
</script>
