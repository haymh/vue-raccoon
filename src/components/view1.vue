<template>
  <div>
    <el-button type="primary" @click.native="readUserLocally">load user from local storage</el-button>
    <el-button type="primary" @click.native="searchHouse">search house</el-button>
    <el-button type="primary" @click.native="filter">filter</el-button>
    <FilterElement></FilterElement>
    <!-- <h1>User</h1>
    <pre>{{ user }}</pre> -->
    <h1>All Houses</h1>
    <pre>{{ allHouses }}</pre>
    <h1>Filter Results</h1>
    <pre>{{ filterResults }}</pre>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import FilterElement from './filter/Filter-element.vue';

export default {
  name: 'view1',
  computed: mapGetters([
    'user',
    'allHouses',
    'filterResults',
  ]),
  components: { FilterElement },
  methods: {
    searchHouse() {
      this.$store.dispatch('searchHouse');
    },
    filter() {
      this.$store.dispatch('filterHouses');
    },
    readUserLocally() {
      this.$store.dispatch('setUser', {
        id: 123,
        isTemp: false,
        favoriteHouses: [
          { id: 1 },
        ],
        searches: [],
      });
    },
  },
};
</script>
