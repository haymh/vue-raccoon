<template>
  <div>
    <Pagination
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="houseList.length"
      :size="10"
      :chunk="true"
      @currentChanged="changeCurrent">
    </Pagination>
    <div id="list" class="scrollable-list">
      <div class="singlelist" v-for="item in currentList" :key="item._id">
        <single-list :singleListingData="item" :showOnlyWhenSelected="selectedOnly"></single-list>
      </div>
    </div>
  </div>
</template>
<style>
 .scrollable-list {
   height: calc(100% - 32px);
   overflow-y: scroll;
 }
 .singlelist {
   margin-bottom: 4px;
   max-width: 650px;
 }
 @media (max-width: 979px) {
  .singlelist .list {
     width: 380px;
   }
  .singlelist .list .left-column {
     width: 100% !important;
   }
  .singlelist .list .basic-info {
     width: 100% !important;
   }
  .singlelist .list .right-column {
     display: none;
   }
 }
 .singlelist .list {
   /*max-width: 650px;*/
   /*min-width: 300px;*/
   overflow: hidden;
   padding: 0px;
   position: relative;
   /*margin: 0px !important;*/
   margin: auto;
 }
 .singlelist .list .actions {
   position: absolute;
   width: 50%;
   bottom: 0px;
 }
 .singlelist .list .like {
   z-index: 1;
   position: absolute;
   top: 0px;
   padding: 5px;
   margin: 10px;
 }
 .singlelist .list .basic-info {
   z-index: 1;
   position: absolute;
   width: 50%;
   bottom: 0px;
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
      currentPage: 0,
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
    ]),
    currentList() {
      const begin = this.currentPage * this.pageSize;
      const end = begin + this.pageSize;
      return this.houseList.slice(begin, end);
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
