<template>
<div class="search-container">
  <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
  <v-dialog v-model="showFullFilter" persistent fullscreen transition="v-dialog-bottom-transition" :overlay=false>
    <v-btn small dark slot="activator" @click="toggleFilter">full filter</v-btn>
    <v-card>
      <v-card-row>
        <v-toolbar light>
          <v-btn icon="icon" @click.native="showFullFilter = false" light>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Filter</v-toolbar-title>
          <v-btn light flat @click.native="dialog = false">Save</v-btn>
        </v-toolbar>
        <SortBar></SortBar>
      </v-card-row>
      <v-card-text>
        <FilterFullSize></FilterFullSize>
      </v-card-text>
    </v-card>
  </v-dialog>
</div>
</template>
<style scoped>
.search-container {
  height: 100%;
}
</style>

<script>
import HouseSearchBar from '../components/search/HouseSearchBar.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';

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
  },
};
</script>
