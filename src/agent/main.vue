<template>
  <div class="columns is-gapless is-mobile content-container">
    <div class="column is-narrow left-container">
      <header class="toolbar-container">
        <FilterBar>
        </FilterBar>
        <div class="columns is-narrow is-gapless toolbar">
          <div class="column is-5">
            <SortBar></SortBar>
          </div>
          <div class="column is-5" v-show="showList">
            <Pagination
              :currentPage="currentPage"
              :pageSize="pageSize"
              :total="filterResults.length"
              :size="5"
              :chunk="true"
              @currentChanged="changeCurrent">
            </Pagination>
          </div>
          <div class="column is-2">
            <span class="select">
              <select v-model="selectedView">
                <option
                  v-for="item in viewMode"
                  :label="item"
                  :value="item">
                </option>
              </select>
            </span>
          </div>
        </div>
      </header>
      <div class="tabs" v-show="showList">
        <ul>
          <li v-bind:class="{'is-active': !showSelected}"><a @click="setShowSelected(false)">Search Results</a></li>
          <li v-bind:class="{'is-active': showSelected}"><a @click="setShowSelected(true)">Selected Houses</a></li>
        </ul>
      </div>
      <div id="list" class="list-container" v-show="showList">
        <house-list :houseList="showSelected ? currentSelected : currentList"></house-list>
      </div>
      <RaccoonMap v-show="showMap" class="map" :houses="allHouses" :searchByGeo="searchByGeo">
      </RaccoonMap>

      <div class="has-text-centered" v-show="showList">
        <Pagination
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="filterResults.length"
          :size="10"
          :chunk="true"
          @currentChanged="changeCurrent">
        </Pagination>
      </div>
    </div>
    <div class="column right-container">
      <ShareList class="share-list" title="预定分享" :list="list" :plus="true" :removable="true" :editable="true"></ShareList>
      <ShareList class="share-list"title="历史分享" :list="list"></ShareList>
    </div>
  </div>
</template>
<style>
.content-container {
  height: 100%;
}
.left-container {
  height: 100%;
}
.left-container .toolbar-container {
  height: 74px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.left-container .toolbar-container .toolbar {
  padding: 0 5px;
}
.right-container {
  height: 100%;
}
.right-container .share-list {
  height: 50%;
  margin: 10px;
  padding: 10px;
}
.map-container .map {
}
.list-container {
  padding-top: 5px;
  height: calc(100% - 106px);
  position: relative;
  overflow-y: scroll;
}


</style>
<script>
import { mapGetters } from 'vuex';
import list from '../components/list/list.vue';
import SortBar from '../components/list/SortBar.vue';
import Pagination from '../components/list/Pagination.vue';
import FilterBar from '../components/filter/Filter-element.vue';
import Map from '../components/map/Map.vue';
import ShareList from './components/share/ShareList.vue';

export default {
  name: 'main',
  data() {
    return {
      position: 0,
      currentPage: 0,
      pageSize: 20,
      scrollUnit: 260,
      viewMode: ['map', 'cards', 'table'],
      selectedView: 'map',
      showSelected: false,
      list: [
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
      ],
    };
  },
  components: {
    FilterBar,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
    Pagination,
    ShareList,
  },
  computed: {
    ...mapGetters([
      'allHouses',
      'hoveredHouse',
      'filterResults',
      'selectedHouses',
    ]),
    currentList() {
      const begin = this.currentPage * this.pageSize;
      const end = begin + this.pageSize;
      return this.filterResults.slice(begin, end);
    },
    currentSelected() {
      const begin = this.currentPage * this.pageSize;
      const end = begin + this.pageSize;
      return this.selectedHouses.slice(begin, end);
    },
    showMap() {
      return this.selectedView === this.viewMode[0];
    },
    showList() {
      return this.selectedView !== this.viewMode[0];
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
  },
  methods: {
    scrollTo(y) {
      document.getElementById('list').scrollTop = y;
    },
    changeCurrent(current) {
      this.currentPage = current;
    },
    searchByGeo(lat, lng) {
      this.$store.dispatch('searchHouse', { lat, lng, byGeo: true });
    },
    getAllHouses() {
      return this.$store.getters.allHouses;
    },
    findHouseIndex(id) {
      const index = this.filterResults.findIndex(house => house._id === id);
      return { page: Math.floor(index / this.pageSize), index: index % this.pageSize };
    },
    setShowSelected(showSelected) {
      this.showSelected = showSelected;
    },
  },
};
</script>
