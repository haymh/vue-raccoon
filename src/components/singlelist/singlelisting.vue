<template>
  <div class="box list">
    <div class="columns is-gapless is-mobile">
      <div class="column is-half left-column">
        <list-gallery :images="singleListingData.pics"></list-gallery>
        <list-basic-info class="basic-info" v-bind:listingData="singleListingData"></list-basic-info>

        <a class="like" v-bind:style="{color: like? '#ff3860':'white'}">
          <span class="icon is-medium" v-on:click="likeListing">
            <i v-bind:class="['fa',like ? 'fa-heart' : 'fa-heart-o']"></i>
          </span>
        </a>
      </div>
      <div class="column is-half right-column">
        <list-detail-info v-bind:listingData="singleListingData"></list-detail-info>
        <footer class="card-footer actions">
          <router-link class="card-footer-item" :to="`/house/${singleListingData._id}`">View Detail</router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Gallery from './gallery.vue';
import BasicInfo from './basicInfo.vue';
import DetailInfo from './detailInfo.vue';

export default {
  name: 'SingleList',
  props: ['singleListingData'],
  components: {
    'list-gallery': Gallery,
    'list-basic-info': BasicInfo,
    'list-detail-info': DetailInfo,
  },
  data() {
    return {
      like: false,
    };
  },
  created() {
  },
  methods: {
    likeListing() {
      this.like = !this.like;
    },
  },
};
</script>
