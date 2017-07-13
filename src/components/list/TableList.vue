<template>
<div>
  <div class="singlelist" v-show="!empty" v-if="hoveredHouse !== undefined && hoveredHouse !== null">
    <single-list :singleListingData="hoveredHouse">
    </single-list>
  </div>
  <div class="scrollable mb-1 ma-1 pa-1" v-show="!empty">
    <!--<table class="table is-striped is-narrow">
      <thead>
        <tr>
          <th>Address</th>
          <th>Price</th>
          <th>Beds</th>
          <th>Baths</th>
          <th>Sq.Ft.</th>
          <th>$/Sq.Ft.</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <TableItem v-for="house in houseList"
                :key="house._id"
                :house="house"
                :showOnlyWhenSelected="selectedOnly"
                @mouseover.native="select(house)">
      </TableItem>
    </table>-->
    <ShortCardItem v-for="(house, index) in houseList"
              :key="house._id"
              :house="house"
              :showOnlyWhenSelected="selectedOnly"
              :divider="index + 1 < houseList.length"
              @mouseover.native="select(house)">
    </ShortCardItem>
    <!--<v-list three-line>
      <ShortItem v-for="(house, index) in houseList"
                :key="house._id"
                :house="house"
                :showOnlyWhenSelected="selectedOnly"
                :divider="index + 1 < houseList.length"
                @mouseover.native="select(house)">
      </ShortItem>
    </v-list>-->
  </div>
  <Pagination
    :currentPage="currentPage"
    :pageSize="pageSize"
    :total="houseList.length"
    :size="10"
    :chunk="true"
    @currentChanged="changeCurrent"
    v-show="!empty">
  </Pagination>
</div>
</template>
<style>
.scrollable {
  height: calc(100% - 296px);
  padding: 0px;
  overflow-y: scroll;
  margin-top: 4px;
}

</style>
<script>
import TableItem from './TableItem.vue';
import ShortItem from './ShortItem.vue';
import ShortCardItem from './ShortCardItem.vue';
import SingleList from '../singlelist/singlelisting.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'TableList',
  data() {
    return {
      currentPage: 0,
      pageSize: 50,
      hoveredHouse: null,
      headers: [
        { text: 'Address', value: 'address', sortable: false },
        { text: 'Price', value: 'price' },
        { text: 'Beds', value: 'beds' },
        { text: 'Baths', value: 'baths' },
        { text: 'Sq.Ft.', value: 'sizeInSF' },
        { text: '$/Sq.Ft.', value: 'unitPriceInSF' },
      ],
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
    TableItem,
    SingleList,
    Pagination,
    ShortItem,
    ShortCardItem,
  },
  computed: {
    currentList() {
      const begin = this.currentPage * this.pageSize;
      const end = begin + this.pageSize;
      return this.houseList.slice(begin, end);
    },
    empty() {
      return this.houseList === null || this.houseList.length === 0;
    },
  },
  methods: {
    select(house) {
      this.hoveredHouse = house;
      console.log(this.hoveredHouse);
    },
    changeCurrent(current) {
      this.currentPage = current;
    },
  },
  watch: {
    selectedOnly: {
      handler() {
        if (this.selectedOnly) {
          this.hoveredHouse = null;
        }
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
};
</script>
