<template>
  <v-layout row>
    <v-flex xs6 class="pa-0">
      <RaccoonMap class="map" :houses="allHouses" :searchByGeo="searchByGeo">
        </RaccoonMap>
    </v-flex>
    <v-flex xs6 class="pa-0">
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
</template>
<style>
.content-container {
  height: 100%;
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
.map-container {
  height: 100%;
}
.list-container {
  padding-top: 5px;
  /*height: 100%;*/
  height: calc(100% - 88px);
  position: relative;
  overflow-y: scroll;
}


</style>
<script>
import { mapGetters } from 'vuex';
import list from '../components/list/list.vue';
import SortBar from '../components/list/SortBar.vue';
import FilterCondensed from '../components/filter/FilterCondensed.vue';
import Map from '../components/map/Map.vue';

export default {
  name: 'main',
  data() {
    return {
    };
  },
  components: {
    FilterCondensed,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
  },
  computed: {
    ...mapGetters([
      'allHouses',
      'filterResults',
    ]),
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
  },
};
</script>
