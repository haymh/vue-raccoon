<template>
  <div>
    <p class="control has-addons">
      <span class="select">
        <select v-model="sortBy">
          <option v-for="item in options">{{item}}</option>
        </select>
      </span>
      <a class="button" v-on:click="toggleUpAndDown">
        <span class="icon is-small">
          <i v-bind:class="upOrDown"></i>
        </span>
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
      sortBy: 'price',
      lowToHigh: true,
    };
  },
  computed: {
    upOrDown() {
      return this.lowToHigh ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
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
    },
  },
};
</script>
