<template>
  <div class="box list">
    <div class="columns is-gapless">
      <div class="column is-half left-column">
        <list-basic-info class="basic-info" v-bind:listingData="listingData"></list-basic-info>
        <list-gallery v-bind:listingData="listingData"></list-gallery>
        <a class="like" v-bind:style="{color: like? '#ff3860':'white'}">
          <span class="icon is-medium" v-on:click="likeListing">
            <i v-bind:class="['fa',like ? 'fa-heart' : 'fa-heart-o']"></i>
          </span>
        </a>
      </div>
      <div class="column is-half is-hidden-touch">
        <list-detail-info v-bind:listingData="listingData"></list-detail-info>
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
    width: 350px;
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
import Gallery from './gallery.vue';
import BasicInfo from './basicInfo.vue';
import DetailInfo from './detailInfo.vue';

export default {
  name: 'List',
  components: {
    'list-gallery': Gallery,
    'list-basic-info': BasicInfo,
    'list-detail-info': DetailInfo,
  },
  data() {
    return {
      like: false,
      listingData: {
        media: ['http://photos.zillowstatic.com/p_f/ISi3yvrxmnj2l71000000000.jpg',
          'http://photos.zillowstatic.com/p_f/IS2jvvwrekug081000000000.jpg',
          'http://photos.zillowstatic.com/p_f/ISa52ebg17zh291000000000.jpg',
          'http://photos.zillowstatic.com/p_f/ISuctjelacmj081000000000.jpg',
          'http://photos.zillowstatic.com/p_f/ISuwk274vh3gw91000000000.jpg'],
        price: 800000,
        beds: 3,
        baths: 2,
        sqft: 1244,
        title: '南北双通透 精装三居室 好位置 仅有契税',
        sqftPrice: 69,
        yearBuilt: 2004,
        postDate: '2016-11-01',
        lotSize: 0,
        hoa: 0,
        status: 'Active',
        tags: ['Open House', 'Newly Constructed', 'School'],
        views: 200,
        visits: 60,
        streetNumber: 3819,
        address1: 'Vinyard Ave.',
        address2: '#42',
        state: 'CA',
        city: 'Pleasanton',
        zip: 94566,
        like: true,
      },
    };
  },
  created() {
    this.like = this.listingData.like;
  },
  methods: {
    likeListing() {
      this.like = !this.like;
    },
  },
};
</script>
