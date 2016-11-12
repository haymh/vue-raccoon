<template>
<div class="wrap container-fluid">
  <nav-bar></nav-bar>
  <div class="columns">
    <div class="column is-three-quarters">
      <div class="map-container" style="background-color:green">
        <a class="button is-danger save-button">Save Search</a>
      </div>
    </div>
    <div class="columns">
      <filter-element class="column"></filter-element>
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
  },
  methods: {
    scrollTo() {
      /* eslint-disable no-undef */
      document.getElementById('list').scrollTop = 20 * 100;
    },
  },
};
</script>
