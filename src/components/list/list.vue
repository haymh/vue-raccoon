<template>
  <div>
    <div class="singlelist" v-for="list in houseList">
      <single-list  v-bind:singleListingData="list"></single-list>
    </div>
  </div>
</template>
<style>
 .singlelist {
   margin-bottom: 10px;
 }
</style>
<script>
import SingleList from '../singlelist/singlelisting.vue';

export default {
  name: 'List',
  props: ['houseList'],
  components: {
    'single-list': SingleList,
  },
};
</script>
