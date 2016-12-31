<template>
  <div class="control is-horizontal">
    <p class="control has-addons">
      <span class="label">Sort:</span>
      <span class="select">
        <select v-model="sortBy" @change="setSort">
          <option v-for="item in options">{{item}}</option>
        </select>
      </span>
      <a class="button is-primary is-outlined" v-on:click="toggleUpAndDown">
        <span class="icon is-small">
          <i v-bind:class="upOrDown"></i>
        </span>
        <span>{{highOrLow}}</span>
      </a>
    </p>
  </div>
</template>
<style>
</style>
<script>

export default {
  name: 'SortBar',
  data() {
    return {
      options: [
        'price', 'beds', 'baths', 'lots',
      ],
      sortBy: '',
      lowToHigh: true,
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
    toggleUpAndDown() {
      this.lowToHigh = !this.lowToHigh;
      this.setSort();
    },
    setSort() {
      this.$store.dispatch('setSort', { key: this.sortBy, asc: this.lowToHigh });
    },
  },
};
</script>
