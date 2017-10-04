<template>
  <div>
    <v-card class="grey lighten-5" flat>
      <v-toolbar dark class="primary elevation-0" extended>
      </v-toolbar>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card class="white" prominent>
              <v-toolbar-title class="body-2 grey--text">{{ category }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon v-if="!user.isTemp" :to="'/articleParser'">
                <v-icon>keyboard</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="min-height: 200px;">
              <v-list three-line>
                <div v-if="articlesInfo.length > 0" v-for="item in articlesInfo" v-bind:key="item.title">
                  <single-article-list :singleArticleListingData="item"></single-article-list>
                </div>
              </v-list>
              <p v-if="articlesInfo.length == 0" class="text-xs-center">目前没有可显示文章</p>
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
import SingleArticleList from './components/Articles/SingleArticleList.vue';
import API from '../api';

export default {
  name: 'article',
  data() {
    return {
      category: '',
    };
  },
  watch: {
    $route: {
      handler() {
        this.getArticles();
      },
    },
    $user: {
      handler() {
        this.getArticles();
      },
    },
  },
  created() {
    this.getArticles();
  },
  computed: {
    ...mapGetters([
      'user',
      'articlesInfo',
    ]),
  },
  components: {
    'single-article-list': SingleArticleList,
  },
  methods: {
    getArticles() {
      const category = this.$route.params.category;
      const options = {};
      if (category === 'myArticles') {
        options.userId = this.user.id;
        this.category = '我的文章';
      } else if (category === 'allArticles') {
        this.category = '全部文章';
      } else {
        options.category = category;
        this.category = category;
      }
      API.getArticles(options).then((articlesInfo) => {
        console.log('got articleInfo', articlesInfo);
        this.$store.dispatch('setArticlesInfo', articlesInfo);
        // this.articlesInfo = articlesInfo;
      });
    },
  },
};
</script>
