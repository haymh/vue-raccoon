<template>
<div class="wrap container-fluid">
  <nav-bar></nav-bar>
  <div class="columns is-gapless is-mobile">
    <div class="column">
      <div class="map-container" style="background-color:green">
        <a class="button is-danger save-button">Save Search</a>
      </div>
    </div>
    <div class="column is-narrow">
      <filter-element>
      </filter-element>
      <house-list></house-list>
    </div>
  </div>
</div>
</template>
<style>
.save-button {
  float: right;
  margin: 10px;
}
.map-container,.list-container {
  height: calc(100vh - 65px);
  padding: 0;
  margin: 0;
}
.list-container {
  overflow: hidden;
  overflow-y: scroll;
}
.box-card {
  height: 100px;
}

</style>
<script>
import navbar from './navbar.vue';
import list from './list/list.vue';
import filter from './filter/Filter-element.vue';

export default {
  name: 'main',
  data() {
    return {
      position: 0,
    };
  },
  components: {
    'nav-bar': navbar,
    'filter-element': filter,
    'house-list': list,
  },
  methods: {
    scrollTo() {
      /* eslint-disable no-undef */
      document.getElementById('list').scrollTop = 20 * 100;
    },
  },
};
</script>
