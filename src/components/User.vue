<template>
  <div class="container profile">

      <div class="section profile-heading">
        <div class="columns">
          <div class="column is-2">
            <div class="image is-128x128 avatar">
              <img src="https://placehold.it/256x256">
            </div>
          </div>
          <div class="column is-4 name">
            <p>
              <span class="title is-bold">John Smith</span>
              <span class="button is-primary is-outlined follow">Follow</span>
            </p>
            <p class="tagline">The users profile bio would go here, of course. It could be two lines</p>
          </div>
          <div class="column is-2 followers has-text-centered">
            <p class="stat-val">129k</p>
            <p class="stat-key">followers</p>
          </div>
          <div class="column is-2 following has-text-centered">
            <p class="stat-val">2k</p>
            <p class="stat-key">following</p>
          </div>
          <div class="column is-2 likes has-text-centered">
            <el-badge value="dian wo dian wo" class="item">
            <router-link to="/chat" class="button is-large is-primary">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
              {{ $t('nav.chat') }}
            </router-link>
          </el-badge>
          </div>
        </div>
      </div>
      <div class="profile-options">
        <div class="tabs is-fullwidth">
          <ul>
            <li :class="isTabActive(0)" @click="changeTab(0)"><a><span class="icon"><i class="fa fa-list"></i></span> <span>Recent Viewed</span></a></li>
            <li :class="isTabActive(1)" @click="changeTab(1)"><a><span class="icon"><i class="fa fa-heart"></i></span> <span>My Favorites</span></a></li>
          </ul>
        </div>
      </div>

      <div class="box">
        <!-- Main container -->
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>123</strong> posts
              </p>
            </div>
            <div class="level-item">
              <p class="control has-addons">
                <input class="input" type="text" placeholder="Find a post">
                <button class="button">
                  Search
                </button>
              </p>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item"><strong>All</strong></p>
            <p class="level-item"><a>Published</a></p>
            <p class="level-item"><a>Drafts</a></p>
            <p class="level-item"><a>Deleted</a></p>
            <p class="level-item"><a class="button is-success">New</a></p>
          </div>
        </nav>
      </div>

      <div class="spacer"></div>

      <div class="columns is-multiline">
        <div v-for="item in currentDisplay" class="column is-6">
          <single-list :singleListingData="item"></single-list>
        </div>

      </div>
    </div>
</template>

<script>
import API from '../api';
import SingleList from './singlelist/singlelisting.vue';

export default {
  name: 'UserPage',
  created() {
  },
  computed: {
    currentDisplay() {
      switch (this.currentTab) {
        case 0:
          return this.recentViewed;
        case 1:
          return this.favorite;
        default:
          return [];
      }
    },
  },
  components: {
    SingleList,
  },
  beforeRouteEnter(to, from, next) {
    console.log('entering user page for ', to.params.id);
    // TODO: query favorite property
    // TODO: query recent viewed property
    Promise.all([
      API.getFavorite(to.params.id),
      API.getRecentViewed(to.params.id),
    ]).then((results) => {
      console.log(results);
      next((vm) => {
        vm.favorite = results[0];
        vm.recentViewed = results[1];
      });
    });
  },
  data() {
    return {
      favorite: [],
      recentViewed: [],
      currentTab: 0,
    };
  },
  watch: {
    $route() {
      console.log('reentering user page for ', this.$route.params.id);
      // TODO: query favorite property
      // TODO: query recent viewed property
    },
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },
    isTabActive(index) {
      return {
        link: true,
        'is-active': index === this.currentTab,
      };
    },
  },
};
</script>
