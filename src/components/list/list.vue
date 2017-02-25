<template>
  <div>
    <div class="singlelist" v-for="item in houseList" :key="item._id">
      <single-list :singleListingData="item" :showOnlyWhenSelected="selectedOnly"></single-list>
    </div>
  </div>
</template>
<style>
 .singlelist {
   margin-bottom: 4px;
   max-width: 650px;
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
   /*max-width: 650px;*/
   /*min-width: 300px;*/
   overflow: hidden;
   padding: 0px;
   position: relative;
   /*margin: 0px !important;*/
   margin: auto;
 }
 .singlelist .list .actions {
   position: absolute;
   width: 50%;
   bottom: 0px;
 }
 .singlelist .list .like {
   z-index: 1;
   position: absolute;
   top: 0px;
   padding: 5px;
   margin: 10px;
 }
 .singlelist .list .basic-info {
   z-index: 1;
   position: absolute;
   width: 50%;
   bottom: 0px;
 }
</style>
<script>
import SingleList from '../singlelist/singlelisting.vue';

export default {
  name: 'List',
  props: {
    houseList: Array,
    selectedOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'single-list': SingleList,
  },
};
</script>
