<template>
  <div class="columns is-gapless is-mobile content-container">
    <div class="column map-container">
        <RaccoonMap class="map" :houses="allHouses" :searchByGeo="searchByGeo">
        </RaccoonMap>
    </div>
    <div class="column is-narrow right-container">
      <header class="toolbar-container">
        <FilterBar>
        </FilterBar>
        <div class="columns is-narrow is-gapless toolbar">
          <div class="column is-5">
            <SortBar></SortBar>
          </div>
        </div>
      </header>
      <house-list :houseList="filterResults" class="list-container"></house-list>
    </div>
  </div>
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
.map-container .map {
}
.list-container {
  padding-top: 5px;
  height: calc(100% - 74px);
  position: relative;
  overflow-y: scroll;
}


</style>
<script>
import { mapGetters } from 'vuex';
import list from '../components/list/list.vue';
import SortBar from '../components/list/SortBar.vue';
import FilterBar from '../components/filter/Filter-element.vue';
import Map from '../components/map/Map.vue';

export default {
  name: 'main',
  data() {
    return {
    };
  },
  components: {
    FilterBar,
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
