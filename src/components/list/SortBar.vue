<template>
  <div>
    <div>
      <a class="button" @click="toggleSortPanel">
        <span class="icon is-small">
          <i class="fa fa-sort-amount-desc"></i>
        </span>
      </a>
    </div>
    <div class="box sort-body" v-show="showSortPanel"  v-on-clickaway="hide">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div class="tabs is-fullwidth">
            <ul>
              <li :class="lowToHigh ? 'is-active': ''">
                <a @click="setLowToHigh(true)">A-Z</a>
              </li>
              <li :class="!lowToHigh ? 'is-active': ''">
                <a @click="setLowToHigh(false)">Z-A</a>
              </li>
            </ul>
          </div>
        </div>
        <table class="table is-narrow">
          <tr v-for="item in options" v-on:click="setSort(item)">
            <td>{{item}}</td>
            <td>
              <span class="icon is-small" v-show="item === sortBy">
                <i class="fa fa-check"></i>
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  
</template>
<style>
.sort-body {
  position: absolute;
  z-index: 100;
  left: 0px;
}
</style>
<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'SortBar',
  mixins: [clickaway],
  data() {
    return {
      options: [
        'price', 'beds', 'baths', 'lots',
      ],
      sortBy: 'price',
      lowToHigh: true,
      showSortPanel: false,
    };
  },
  computed: {
    upOrDown() {
      return this.lowToHigh ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    },
    highOrLow() {
      return this.lowToHigh ? 'Low to High' : 'High to Low';
    },
  },
  watch: {
    sortBy: {
      handler() {
        console.log(this.sortBy);
      },
    },
  },
  methods: {
    setLowToHigh(isLowToHigh) {
      this.lowToHigh = isLowToHigh;
      this.setSort(this.sortBy);
    },
    setSort(sortBy) {
      this.sortBy = sortBy;
      this.$store.dispatch('setSort', { key: sortBy, asc: this.lowToHigh });
    },
    toggleSortPanel(event) {
      this.showSortPanel = !this.showSortPanel;
      event.stopPropagation();
    },
    hide() {
      this.showSortPanel = false;
      console.log('sort bar hide');
    },
  },
};
</script>
