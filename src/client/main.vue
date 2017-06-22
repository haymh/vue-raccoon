<template>
<div>
  <v-toolbar fixed class="white hidden-sm-and-up">
    <v-btn icon light @click.native="setShowMap(true)">
      <v-icon class="grey--text text--darken-2">map</v-icon>
    </v-btn>
    <v-toolbar-title class="grey--text text--darken-4">
      <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
    </v-toolbar-title>
    <v-btn icon light @click.native="setShowMap(false)">
      <v-icon class="grey--text text--darken-2">list</v-icon>
    </v-btn>
  </v-toolbar>
  <main class="hidden-sm-and-up"></main>
  <v-layout row class="content-container">
    <v-flex xs12 sm6>
      <div v-bind:class="mapClasses">
      <RaccoonMap :houses="allHouses" :searchByGeo="searchByGeo">
      </RaccoonMap>
      <div class="singlelist">
        <SingleList :singleListingData="hoveredHouse" v-if="hoveredHouse !== undefined && hoveredHouse !== null">
        </SingleList>
      </div>
      </div>
    </v-flex>
    <v-flex sm6 v-bind:class="[showMap? 'hidden-xs-only' : '', 'pa-0']">
      <div class="elevation-2">
        <v-layout row wrap>
          <v-flex xs1>
            <SortBar></SortBar>
          </v-flex>
          <v-flex xs11>
            <FilterCondensed>
            </FilterCondensed>
          </v-flex>
        </v-layout>
      </div>
      <house-list :houseList="filterResults" class="list-container"></house-list>
    </v-flex>
  </v-layout>
</div>
</template>
<style>
.content-container {
  height: calc(100vh - 56px);
  max-width: 1300px;
  margin: auto;
}
.right-container {
  height: 100%;
}
.right-container .toolbar-container {
  height: 74px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.right-container .toolbar-container .toolbar {
  padding: 0 5px;
}
.map-container .save-button {
  position: absolute;
  z-index: 1;
  margin-top: 10px;
}
.small-map {
  height: calc(100% - 250px);
}
.list-container {
  padding-top: 5px;
  /*height: 100%;*/
  height: calc(100vh - 144px);
  position: relative;
  overflow-y: scroll;
}


</style>
<script>
import { mapGetters } from 'vuex';
import list from '../components/list/list.vue';
import SortBar from '../components/list/SortBar.vue';
import FilterCondensed from '../components/filter/FilterCondensed.vue';
import HouseSearchBar from '../components/search/HouseSearchBar.vue';
import Map from '../components/map/Map.vue';
import SingleList from '../components/singlelist/singlelisting.vue';

export default {
  name: 'main',
  data() {
    return {
      showMap: true,
    };
  },
  components: {
    FilterCondensed,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
    HouseSearchBar,
    SingleList,
  },
  computed: {
    ...mapGetters([
      'allHouses',
      'filterResults',
      'hoveredHouse',
    ]),
    mapClasses() {
      return {
        'hidden-xs-only': !this.showMap,
        'small-map': this.showMap,
        'pa-0': true,
      };
    },
  },
  methods: {
    searchByGeo(lat, lng) {
      this.$store.dispatch('searchHouse', { lat, lng, byGeo: true });
    },
    getAllHouses() {
      return this.$store.getters.allHouses;
    },
    findHouseIndex(id) {
      const index = this.filterResults.findIndex(house => house._id === id);
      return { page: Math.floor(index / this.pageSize), index: index % this.pageSize };
    },
    setShowMap(showMap) {
      console.log('wut', showMap);
      this.showMap = showMap;
    },
  },
};
</script>
