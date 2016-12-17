<template>
  <div>
    <div class="singlelist" v-for="list in filterResults">
      <single-list  v-bind:singleListingData="list"></single-list>
    </div>
  </div>
</template>
<style>
 .singlelist {
   margin-bottom: 10px;
 }
 @media (max-width: 979px) {
  .singlelist .list {
     width: 380px;
   }
  .singlelist .list .left-column {
     width: 100% !important;
   }
  .singlelist .list .basic-info {
     width: 100% !important;
   }
  .singlelist .list .right-column {
     display: none;
   }
 }
 .singlelist .list {
   max-width: 650px;
   min-width: 300px;
   padding: 0px;
   position: relative;
   margin: 0px !important;
 }
 .singlelist .list .actions {
   position: absolute;
   width: 50%;
   bottom: 0px;
 }
 .singlelist .list .like {
   position: absolute;
   top: 0px;
   padding: 5px;
   margin: 10px;
 }
 .singlelist .list .basic-info {
   position: absolute;
   width: 50%;
   bottom: 0px;
 }
</style>
<script>
import { mapGetters } from 'vuex';
import SingleList from '../singlelist/singlelisting.vue';

export default {
  name: 'List',
  components: {
    'single-list': SingleList,
  },
  computed: {
    ...mapGetters([
      'user',
      'allHouses',
      'filterResults',
    ]),
  },
  created() {
    this.$store.dispatch('searchHouse');
  },
  data() {
    return {
      like: false,
    };
  },
};
</script>
