<template>
  <div>
    <div v-for="item in filterResults">
      <single-list v-bind:singleListingData="item"></single-list>
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
    };
  },
};
</script>
