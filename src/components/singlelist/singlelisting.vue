<template>
  <div class="box list">
    <div class="columns is-gapless">
      <div class="column is-half left-column">
        <list-basic-info class="basic-info" v-bind:listingData="singleListingData"></list-basic-info>
        <list-gallery :images="singleListingData.pics"></list-gallery>
        <a class="like" v-bind:style="{color: like? '#ff3860':'white'}">
          <span class="icon is-medium" v-on:click="likeListing">
            <i v-bind:class="['fa',like ? 'fa-heart' : 'fa-heart-o']"></i>
          </span>
        </a>
      </div>
      <div class="column is-half is-hidden-touch">
        <list-detail-info v-bind:listingData="singleListingData"></list-detail-info>
        <footer class="card-footer actions">
          <a class="card-footer-item">View Detail</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 979px) {
  .list {
    width: 380px;
  }
  .left-column {
    width: 100% !important;
  }
  .basic-info {
    width: 100% !important;
  }
}
.actions {
  position: absolute;
  width: 50%;
  bottom: 0px;
}
.list {
  max-width: 650px;
  min-width: 300px;
  padding: 0px;
  position: relative;
  margin: 0px !important;
}
.like {
  position: absolute;
  top: 0px;
  padding: 5px;
  margin: 10px;
}
.basic-info {
  position: absolute;
  width: 50%;
  bottom: 0px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import Gallery from './gallery.vue';
import BasicInfo from './basicInfo.vue';
import DetailInfo from './detailInfo.vue';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'SingleList',
  props: ['singleListingData'],
  components: {
    'list-gallery': Gallery,
    'list-basic-info': BasicInfo,
    'list-detail-info': DetailInfo,
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    like() {
      return this.favorite.createdAt !== undefined;
    },
  },
  data() {
    return {
    };
  },
  created() {
    console.log('LIST ITEM', this.singleListingData);
    console.log(this.userId);
    this.$bindAsObject('favorite', db.ref(`buyerData/${this.userId}/favoriteHouses/${this.singleListingData._id}`));
  },
  methods: {
    likeListing() {
      console.log(this.favorite);
      const value = this.favorite.createdAt;
      if (value) {
        this.$firebaseRefs.favorite.remove();
      } else {
        this.$firebaseRefs.favorite.set({ createdAt: timeStamp });
      }
    },
  },
};
</script>
