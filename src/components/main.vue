<template>
  <div class="columns is-gapless is-mobile content-container">
    <div class="column map-container">
        <a class="button is-danger save-button">Save Search</a>
        <RaccoonMap class="map" :houses="allHouses">
        </RaccoonMap>
    </div>
    <div class="column is-narrow right-container">
      <div class="toolbar-container">
        <filter-element>
        </filter-element>
        <div class="columns is-gapless">
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
      <div class="has-text-centered">
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
.content-container {
  height: 100%;
}
.right-container {
  height: 100%;
}
.right-container .toolbar-container {
  height: 74px;
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
import filter from './filter/Filter-element.vue';
import Map from './map/Map.vue';

export default {
  name: 'main',
  data() {
    return {
      position: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  components: {
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
