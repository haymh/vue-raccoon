<template>
  <div>
    <v-card class="grey lighten-5" flat>
      <v-toolbar dark class="primary elevation-0" extended>

      </v-toolbar>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card class="white" prominent>
              <v-toolbar-title class="body-2 grey--text hidden-xs-only">文章生成</v-toolbar-title>
              <v-spacer class="hidden-xs-only"></v-spacer>
              <v-text-field
              name="input-1"
              label="输入文章 URL 生成"
              id="article url"
              type="url"
              v-model="url"
              class="ml-2"
              single-line
              hide-details
              ></v-text-field>
              <v-btn icon @click.native="parse">
                <v-icon class="blue--text">sync</v-icon>
              </v-btn>
              <articleShareQR v-if="shareEnabled" :articleId="articleInfo._id"></articleShareQR>
              <v-dialog v-model="dialog" persistent  v-if="content && title && uploadEnabled">
                <v-btn icon slot="activator">
                  <v-icon class="blue--text">file_upload</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title class="headline">选择分类</v-card-title>
                  <v-card-text>
                    <v-select
                    v-if="content"
                    label="选择文章分类"
                    v-bind:items="categories"
                    v-model="selectedItems"
                    multiple
                    ></v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">取消</v-btn>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="uploadArticle">上传</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-divider></v-divider>
            <v-progress-linear v-if="inProgress" v-bind:indeterminate="true" class="mt-0"></v-progress-linear>
            <div>
              <div class="text-xs-center">
              </div>
              <v-alert
                success
                :value="successAlert"
                transition="slide-y-transition"
              >
                {{ alertMessage }}
              </v-alert>
              <v-alert
                error
                :value="failureAlert"
                transition="slide-y-transition"
              >
                {{ alertMessage }}
              </v-alert>
            </div>
            <v-card-text style="min-height: 200px;">
              <v-container>
                <div class="box content" id="content">
                  <articleEditor
                    :content="content"
                    :title="title"
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
import API from '../api';
import articleShareQR from './components/Articles/articleShareQR.vue';
import articleEditor from './components/Articles/articleEditor.vue';

export default {
  name: 'articleParser',
  data() {
    return {
      id: '',
      url: '',
      sourceURL: '',
      title: '',
      content: '',
      storageName: '',
      articleInfo: {},
      inProgress: false,
      categories: [],
      selectedItems: [],
      dialog: false,
      parseSuccessMessage: '生成成功',
      uploadSuccessMessage: '上传成功',
      parseFailMessage: '生成失败, 稍后再试',
      uploadFailMessage: '上传失败， 稍后再试',
      alertMessage: '',
      successAlert: false,
      failureAlert: false,
      uploadEnabled: false,
      shareEnabled: false,
    };
  },
  created() {
    API.getAllCategoriesName().then((cates) => {
      console.log('categories: ', cates);
      this.categories = cates.map(c => c.name);
    });
  },
  components: {
    articleShareQR,
    articleEditor,
  },
  methods: {
    sendSuccessAlert(message) {
      this.alertMessage = message;
      this.successAlert = 1;
      setTimeout(() => {
        this.successAlert = 0;
      }, 2000);
    },
    sendFailureAlert(message) {
      this.alertMessage = message;
      this.failureAlert = 1;
      setTimeout(() => {
        this.failureAlert = 0;
      }, 2000);
    },
    parse() {
      this.sourceURL = this.url;
      this.reqData = {};
      this.reqData.url = this.sourceURL;
      console.log(this.sourceURL);
      this.inProgress = true;
      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/articleParse', this.reqData).then((response) => {
        console.log('article parsed: ', response);
        this.inProgress = false;
        this.uploadEnabled = true;
        this.title = response.body.title;
        this.content = response.body.content;
        // this.content = response.body;
        this.sendSuccessAlert(this.parseSuccessMessage);
      });
    },
    uploadArticle() {
      this.dialog = false;
      this.reqData = {};
      this.reqData.content = this.content;
      this.reqData.type = 'text/html; charset=UTF-8';

      this.inProgress = true;
      console.log('upload this', this.reqData);
      this.$http.post('https://us-central1-article-parser.cloudfunctions.net/upload-article', this.reqData).then((response) => {
        console.log('article uploaded: ', response);
        this.inProgress = false;
        this.uploadEnabled = false;
        this.shareEnabled = true;
        this.storageName = response.data.dbName;
        this.sendSuccessAlert(this.uploadSuccessMessage);
        // store article information to database
        const articleInfo = {};
        articleInfo.name = this.title;
        articleInfo.createdAt = new Date();
        articleInfo.storageName = response.data.dbName;
        if (!this.$store.getters.user.isTemp) {
          articleInfo.userId = this.$store.getters.userId;
        } else {
          articleInfo.source = this.url;
        }
        articleInfo.categories = this.selectedItems.map((category) => {
          console.log(category);
          return { name: category };
        });
        API.createArticle(articleInfo).then((res) => {
          console.log('api create article data', res);
          this.articleInfo = res.data;
        });
      });
    },
    titleChange(event) {
      this.title = event;
      this.uploadEnabled = true;
      this.shareEnabled = false;
    },
    contentChange(event) {
      this.content = event;
      this.uploadEnabled = true;
      this.shareEnabled = false;
    },
  },
};
</script>
