<template>
  <div>
  <div class="hero">
    <div :class="['modal', showEditProfileModal ? 'is-active':'']" v-if="showEditProfileModal">
      <div class="modal-background" @click="toggleEditProfileModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button class="delete" @click="toggleEditProfileModal"></button>
        </header>
        <section class="modal-card-body">
          <label class="label">Contact Info</label>
          <div class="box">
            <div class="columns is-multiline">
              <div class="column is-6">
                <label class="label">Name</label>
                <p class="control has-icon">
                  <input class="input is-primary" type="text" text="user.nickname">
                  <i class="fa fa-user"></i>
                </p>
              </div>
              <div class="column is-6">
                <label class="label">Email</label>
                <p class="control has-icon">
                  <input class="input is-primary" type="email" text="user.email">
                  <i class="fa fa-envelope"></i>
                </p>
              </div>
              <div class="column is-6">
                <label class="label">Tel</label>
                <p class="control has-icon">
                  <input class="input is-primary" type="email" text="user.phone">
                  <i class="fa fa-phone"></i>
                </p>
              </div>
            </div>
          </div>
          <label class="label">Subcription Preference</label>
          <div class="box columns is-multiline">
            <label class="checkbox">
              <input type="checkbox">
              Get email for new property in your area
            </label>
            <label class="checkbox">
              <input type="checkbox">
              Receive text message for new house in your area
            </label>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-primary">Save changes</a>
          <a class="button">Cancel</a>
        </footer>
      </div>
    </div>
    <div class="hero-body">
      <div class="columns">
        <div class="column is-2">
          <figure class="image is-128x128 avatar is-pulled-right">
            <img :src="user.avatar || 'http://placehold.it/128x128'">
          </figure>
        </div>
        <div class="column is-4 name">
          <p>
            <span class="title is-bold">{{user.displayName || '游客'}}</span>
            <span class="button is-primary is-outlined follow" @click="toggleEditProfileModal">修改个人资料</span>
          </p>
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
    <div class="hero-foot">
      <div class="container">
        <div class="tabs is-boxed">
          <ul>
            <li :class="isTabActive(0)" @click="changeTab(0)"><a><span class="icon"><i class="fa fa-list"></i></span> <span>Recent Viewed</span></a></li>
            <li :class="isTabActive(1)" @click="changeTab(1)"><a><span class="icon"><i class="fa fa-heart"></i></span> <span>My Favorites</span></a></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
    <div class="nav has-shadow toolbar">
        <!-- Main container -->
        <div class="container level">
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
        </div>
      </div>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div v-for="item in currentDisplay" class="column is-6 house-container">
            <single-list :singleListingData="item"></single-list>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.toolbar {
  background-color: #fafafa;
}
@media (max-width: 1180px) and (min-width: 768px) {
 .house-container .list {
    width: 100%;
  }
 .house-container .list .left-column {
    width: 100% !important;
  }
 .house-container .list .basic-info {
    width: 100% !important;
  }
 .house-container .list .right-column {
    display: none;
  }
}
@media (max-width: 650px) {
 .house-container .list {
    width: 100%;
  }
 .house-container .list .left-column {
    width: 100% !important;
  }
 .house-container .list .basic-info {
    width: 100% !important;
  }
 .house-container .list .right-column {
    display: none;
  }
}
.house-container .list {
  max-width: 650px;
  min-width: 300px;
  padding: 0px;
  position: relative;
  margin: 0px !important;
}
.house-container .list .actions {
  position: absolute;
  width: 50%;
  bottom: 0px;
}
.house-container .list .like {
  position: absolute;
  top: 0px;
  padding: 5px;
  margin: 10px;
}
.house-container .list .basic-info {
  position: absolute;
  width: 50%;
  bottom: 0px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import API from '../api';
import SingleList from './singlelist/singlelisting.vue';

export default {
  name: 'UserPage',
  data() {
    return {
      favorite: [],
      recentViewed: [],
      currentTab: 0,
      showEditProfileModal: false,
    };
  },
  created() {
    console.log('user', this.user);
    // TODO: check if user id equal to router id prameter
    console.log('current user? ', this.user.id === this.$route.params.id);
    if (this.user.id !== this.$route.params.id) {
      this.$router.push(`/user/${this.user.id}`);
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
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
    Promise.all([
      API.getFavorite(to.params.id),
      API.getRecentViewed(to.params.id),
    ]).then((results) => {
      console.log(results);
      next((vm) => {
        vm.favorite = results[0];
        console.log('favorite', results[0]);
        vm.recentViewed = results[1];
      });
    }, (error) => {
      console.log(error);
      // TODO: redirect to error page
      next(`/error/${error}`);
    });
  },
  watch: {
    $route() {
      console.log('reentering user page for ', this.$route.params.id);
      Promise.all([
        API.getFavorite(this.$route.params.id),
        API.getRecentViewed(this.$route.params.id),
      ]).then((results) => {
        this.favorite = results[0];
        console.log('favorite', results[0]);
        this.recentViewed = results[1];
      }, (error) => {
        this.$router.push(`/error/${error}`);
      });
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
    toggleEditProfileModal() {
      this.showEditProfileModal = !this.showEditProfileModal;
    },
  },
};
</script>
