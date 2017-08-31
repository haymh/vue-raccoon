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
              <v-btn icon>
                <v-icon>search</v-icon>
              </v-btn>
              <v-btn icon :to="'/articleParser'">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text style="min-height: 200px;">
              <v-list three-line>
                <div v-for="item in articlesInfo">
                  <single-article-list :singleArticleListingData="item"></single-article-list>
                </div>
              </v-list>
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
      articlesInfo: [],
      userArticlesInfo: [],
      loadingList: false,
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
    ]),
  },
  components: {
    'single-article-list': SingleArticleList,
  },
  methods: {
    getArticles() {
      const category = this.$route.params.category;
      if (category && category === 'all') {
        this.getPublicArticles();
        this.category = '所有文章';
      } else if (category && category === 'myarticles') {
        this.getUserArticles(this.user.id);
        this.category = '我的文章';
      } else {
        this.getArticlesbyCategory(category);
        this.category = category;
      }
    },
    getArticlesbyCategory(category) {
      // const cate = this.$store.getters.getCategoryInfoByName(category);
      API.getPublicArticlesInCategory(category).then((info) => {
        console.log('public article in category', info);
        this.$store.dispatch('setPublicArticleInfo', info);
        this.articlesInfo = info;
      });
    },
    getUserArticles(userId) {
      // this.userArticlesInfo = this.$store.getters.userArticleInfo;
      API.getArticleByUserId(userId).then((info) => {
        console.log('all userarticleInfo', info);
        this.$store.dispatch('setUserArticleInfo', info);
        this.articlesInfo = info;
      });
    },
    getPublicArticles() {
      API.getAllPublicArticles().then((info) => {
        this.$store.dispatch('setPublicArticleInfo', info);
        this.articlesInfo = info;
      });
    },
  },
};
</script>
