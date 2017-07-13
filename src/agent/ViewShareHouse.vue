<template>
  <div class="columns is-gapless is-mobile content-container">
    <div class="column map-container">
        <RaccoonMap class="map" :houses="allHouses">
        </RaccoonMap>
    </div>
    <div class="column is-narrow right-container">
      <header class="toolbar-container">
        <FilterCondensed>
        </FilterCondensed>
        <div class="columns is-narrow is-gapless toolbar">
          <div class="column is-5">
            <SortBar></SortBar>
          </div>
        </div>
      </header>
      <house-list :houseList="allHouses" class="list-container"></house-list>
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
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.right-container .toolbar-container .toolbar {
  padding: 0 5px;
}
.map-container .save-button {
  position: absolute;
  z-index: 1;
  margin-top: 10px;
}
.map-container {
  height: 100%;
}
.list-container {
  padding-top: 5px;
  height: calc(100% - 74px);
  position: relative;
  overflow-y: scroll;
}


</style>
<script>
import list from '../components/list/list.vue';
import SortBar from '../components/list/SortBar.vue';
import FilterCondensed from '../components/filter/FilterCondensed.vue';
import Map from '../components/map/Map.vue';
import API from '../api';

export default {
  name: 'ViewShareHouse',
  data() {
    return {
      allHouses: [],
    };
  },
  mounted() {
    API.getShare(this.$route.params.id).then((res) => {
      console.log('share houses', res.data);
      this.allHouses = res.data;
    });
  },
  components: {
    FilterCondensed,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
  },
};
</script>
