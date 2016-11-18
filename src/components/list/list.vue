<template>
  <div>
    <div v-for="list in filterResults">
      <single-list v-bind:singleListingData="list"></single-list>
    </div>
    <h1>All Houses</h1>
    <pre>{{ allHouses }}</pre>
    <h1>Filter Results</h1>
    <pre>{{ filterResults }}</pre>
  </div>
</template>
<style>
</style>
<script>
import { mapGetters } from 'vuex';
import SingleList from '../singlelist/singlelisting.vue';

export default {
  name: 'List',
  components: {
    'single-list': SingleList,
  },
  computed: mapGetters([
    'user',
    'allHouses',
    'filterResults',
  ]),
  created() {
    this.$store.dispatch('searchHouse');
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
};
</script>
