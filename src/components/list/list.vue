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
