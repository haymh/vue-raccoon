<template>
<div class="search-container">
  <HouseSearchBar class="autocomplete-input" route="main"></HouseSearchBar>
  <v-dialog v-model="showFullFilter" persistent fullscreen transition="v-dialog-bottom-transition" :overlay=false>
    <v-btn small dark slot="activator" @click="toggleFilter">full filter</v-btn>
    <v-toolbar light>
      <v-btn icon="icon" @click.native="showFullFilter = false" light>
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Filter</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn light flat @click.native="dialog = false">Save</v-btn>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <SortBar></SortBar>
      </v-card-text>
      <v-card-text>
        <FilterFullSize></FilterFullSize>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>
<style scoped>
.search-container {
  flex-grow: 2;
}
</style>

<script>
import HouseSearchBar from '../components/search/HouseSearchBar.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';
import SortBar from '../components/list/SortBar.vue';

export default {
  name: 'Search',
  data() {
    return {
      showFullFilter: false,
    };
  },
  components: {
    HouseSearchBar,
    FilterFullSize,
    SortBar,
  },
  methods: {
    toggleFilter(event) {
      console.log('show filter');
      this.showFullFilter = !this.showFullFilter;
      event.stopPropagation();
    },
  },
};
</script>
