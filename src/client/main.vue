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
    <div class="content-container ml-1 mr-1">
      <v-layout row style="height: 100%">
        <v-flex xs12 sm6 v-bind:class="[!showMap? 'hidden-xs-only' : '', 'pa-0']" style="height: 100%">
          <div class="map-container">
            <RaccoonMap class="map" :houseData="allHouses" :searchByGeo="searchByGeo">
            </RaccoonMap>
            <div class="singlelist hidden-sm-and-up">
              <SingleList :singleListingData="hoveredHouse" v-if="hoveredHouse !== undefined && hoveredHouse !== null">
              </SingleList>
            </div>
          </div>
        </v-flex>
        <v-flex xs12 sm6 v-bind:class="[showMap? 'hidden-xs-only' : '', 'pa-0']" style="height: 100%">
          <div class="list-container ml-2 mr-2">
            <div class="elevation-2 hidden-xs-only sort-filter">
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
            <div class="house-list">
              <house-list :houseList="filterResults" :cardHeight="200"></house-list>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<style>
  .content-container {
    height: calc(100vh - 56px);
  }

  .map-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    height: 100%;
  }

  .map-container .save-button {
    position: absolute;
    z-index: 1;
    margin-top: 10px;
  }

  .map-container .map {
    flex: 1 0 auto;
    /* The above is shorthand for:
    flex-grow: 1,
    flex-shrink: 0,
    flex-basis: auto
    */
  }

  .map-container .singlelist {
    flex: 0 1 250px;
  }

  .list-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column;
    flex-flow: column;
    height: calc(100vh - 56px);
  }

  .list-container .filter-sort {
    flex: 0 1 88px;
  }

  .list-container .house-list {
    flex: 1 0 auto;
    overflow-y: auto;
    height: 0px;
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
        showMap: false,
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
    },
    methods: {
      searchByGeo(lat, lng) {
        this.$store.dispatch('searchHouse', {
          lat,
          lng,
          byGeo: true,
        });
      },
      getAllHouses() {
        return this.$store.getters.allHouses;
      },
      findHouseIndex(id) {
        const index = this.filterResults.findIndex(house => house._id === id);
        return {
          page: Math.floor(index / this.pageSize),
          index: index % this.pageSize,
        };
      },
      setShowMap(showMap) {
        console.log('wut', showMap);
        this.showMap = showMap;
      },
    },
  };

</script>
