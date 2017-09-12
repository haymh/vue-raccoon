<template>
  <div class="container-list">
    <div id="list" class="scrollable-list">
      <div v-html="searchResultSummary"></div>
      <div class="singlelist" v-for="item in currentList" :key="item._id">
        <single-list :singleListingData="item" :showOnlyWhenSelected="selectedOnly" :height="250"></single-list>
      </div>
    </div>
    <!--TODO: Need to make list full height and scroll on whole page. Pagination should be fix position.-->
    <Pagination
      v-show="houseList !== null && houseList.length !== 0"
      v-model="currentPage"
      :pageSize="pageSize"
      :total="houseList.length"
      @currentChanged="changeCurrent">
    </Pagination>
  </div>
</template>
<style>
 .container-list {
   height: 100%;
   overflow: hidden;
 }
 .scrollable-list {
   height: calc(100% - 50px);
   overflow-y: auto;
 }
</style>
<script>
import { mapGetters } from 'vuex';
import SingleList from '../singlelist/singlelisting.vue';
import Pagination from './Pagination.vue';


export default {
  name: 'List',
  data() {
    return {
      position: 0,
      currentPage: 1,
      scrollUnit: 260,
      pageSize: 20,
    };
  },
  props: {
    houseList: Array,
    selectedOnly: {
      type: Boolean,
      default: false,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'single-list': SingleList,
    Pagination,
  },
  computed: {
    ...mapGetters([
      'hoveredHouse',
      'searchTerms',
    ]),
    currentList() {
      const begin = (this.currentPage - 1) * this.pageSize;
      const end = begin + this.pageSize;
      return this.houseList.slice(begin, end);
    },
    searchResultSummary() {
      if (this.searchTerms && this.houseList) {
        return `<p>Found <i>${this.houseList.length}</i> houses in <strong>${this.searchTerms.city}, ${this.searchTerms.state}</strong></p>`;
      }
      return '';
    },
  },
  watch: {
    hoveredHouse: {
      handler(val) {
        console.log('hovered house passed down');
        console.log(val);
        const index = this.findHouseIndex(val._id);
        console.log('index', index);
        this.currentPage = index.page;
        this.scrollTo(index.index * this.scrollUnit);
      },
    },
    selectAll: {
      handler() {
        // adds all houses in currect page into selected house list
        if (this.selectAll) {
          this.$store.dispatch({
            type: 'selectHouses',
            houses: this.currentList,
          });
        } else {
          this.$store.dispatch({
            type: 'unselectHouses',
            houses: this.currentList,
          });
        }
      },
    },
    currentPage: {
      handler() {
        console.log('currentPage', this.currentPage);
        this.scrollTo(0);
      },
    },
  },
  methods: {
    scrollTo(y) {
      document.getElementById('list').scrollTop = y;
    },
    changeCurrent(current) {
      this.currentPage = current;
      this.scrollTo(0);
    },
    findHouseIndex(id) {
      const index = this.houseList.findIndex(house => house._id === id);
      return { page: Math.floor(index / this.pageSize), index: index % this.pageSize };
    },
  },
};
</script>
