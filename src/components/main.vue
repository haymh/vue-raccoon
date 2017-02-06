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
          <div class="column is-7">
            <Pagination
              :currentPage="currentPage"
              :pageSize="pageSize"
              :total="filterResults.length"
              :size="10"
              :chunk="true"
              @currentChanged="changeCurrent">
            </Pagination>
          </div>
        </div>
      </header>
      <div class="list-container">
        <house-list :houseList="currentList"></house-list>
      </div>
      <div class="has-text-centered">
        <Pagination
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="filterResults.length"
          :size="10"
          :chunk="true"
          @currentChanged="changeCurrent">
        </Pagination>
      </div>
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
  height: calc(100% - 106px);
  position: relative;
  overflow: scroll;
}
.list-container::-webkit-scrollbar {
  display: none;
}
.box-card {
  height: 100px;
}

</style>
<script>
import { mapGetters } from 'vuex';
import list from './list/list.vue';
import SortBar from './list/SortBar.vue';
import Pagination from './list/Pagination.vue';
import FilterBar from './filter/Filter-element.vue';
import Map from './map/Map.vue';

export default {
  name: 'main',
  data() {
    return {
      position: 0,
      currentPage: 0,
      pageSize: 5,
    };
  },
  components: {
    FilterBar,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
    Pagination,
  },
  computed: {
    ...mapGetters([
      'allHouses',
      'selectedHouse',
      'filterResults',
    ]),
    currentList() {
      const begin = this.currentPage * this.pageSize;
      const end = begin + this.pageSize;
      return this.filterResults.slice(begin, end);
    },
  },
  watch: {
    selectedHouse: (val) => {
      console.log('Selected house passed down');
      console.log(val);
    },
  },
  methods: {
    scrollTo() {
      /* eslint-disable no-undef */
      document.getElementById('list').scrollTop = 20 * 100;
    },
    changeCurrent(current) {
      this.currentPage = current;
    },
    searchByGeo(lat, lng) {
      this.$store.dispatch('searchHouse', { lat, lng, byGeo: true });
    },
  },
};
</script>
