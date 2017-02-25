<template>
<div>
  <div class="singlelist">
    <single-list :singleListingData="hoveredHouse"
                v-if="hoveredHouse !== undefined && hoveredHouse !== null">
    </single-list>
  </div>
  <div class="scrollable">
    <table class="table is-striped is-narrow">
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
                :house="house"
                :showOnlyWhenSelected="selectedOnly"
                v-on:hoverHouse="select">
      </TableItem>
      <tfoot>
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
      </tfoot>
    </table>
  </div>
</div>
</template>
<style>
.scrollable {
  padding: 0px;
  height:auto;
  overflow-y: scroll;
  margin-top: 4px;
}

</style>
<script>
import TableItem from './TableItem.vue';
import SingleList from '../singlelist/singlelisting.vue';

export default {
  name: 'TableList',
  data() {
    return {
      hoveredHouse: null,
    };
  },
  props: {
    houseList: Array,
    selectedOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TableItem,
    SingleList,
  },
  methods: {
    select(house) {
      this.hoveredHouse = house;
      console.log(this.hoveredHouse);
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
  },
};
</script>
