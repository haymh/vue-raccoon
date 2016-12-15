<template>
<div class="wrap container-fluid">
  <nav-bar></nav-bar>
  <div class="columns is-gapless is-mobile">
    <div class="column">
      <div class="map-container" style="background-color:green">
        <a class="button is-danger save-button">Save Search</a>
        <RaccoonMap class='map' :houses="allHouses"></RaccoonMap>
        <span>{{ selectedHouse && selectedHouse.address }}</span>
      </div>
    </div>
    <div class="column is-narrow">
      <div>
        <filter-element>
        </filter-element>
        <div class="columns">
          <div class="column is-4">
            <SortBar></SortBar>
          </div>
          <div class="column is-8">
            <!-- <Pagination :totalPages="2"></Pagination> -->
            <el-pagination
              small
              layout="total, prev, pager, next, jumper"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="filterResults.length"
              @current-change="changeCurrent">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="list-container">
        <house-list :houseList="currentList"></house-list>
      </div>
      <el-pagination
        small
        layout="total, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filterResults.length"
        @current-change="changeCurrent">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<style>
.save-button {
  position: absolute !important;
  z-index: 100;
  right: 0px;
  margin: 10px;
}
.map-container {
  position: relative;
  height: calc(100vh - 65px);
  padding: 0;
  margin: 0;
}
.list-container {
  height: calc(100vh - 107px);
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
import navbar from './navbar.vue';
import list from './list/list.vue';
import SortBar from './list/SortBar.vue';
import filter from './filter/Filter-element.vue';
import Map from './map/Map.vue';

export default {
  name: 'main',
  data() {
    return {
      position: 0,
      currentPage: 1,
      pageSize: 1,
    };
  },
  components: {
    'nav-bar': navbar,
    'filter-element': filter,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
  },
  computed: {
    ...mapGetters([
      'allHouses',
      'selectedHouse',
      'filterResults',
    ]),
    currentList() {
      const begin = (this.currentPage - 1) * this.pageSize;
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
  created() {
    // TODO: need a server
    // this.$store.dispatch('fetchHouses');
    this.$store.dispatch('searchHouse');
  },
  methods: {
    scrollTo() {
      /* eslint-disable no-undef */
      document.getElementById('list').scrollTop = 20 * 100;
    },
    changeCurrent(current) {
      this.currentPage = current;
    },
  },
};
</script>
