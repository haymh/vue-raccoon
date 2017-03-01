<template>
  <div class="columns content-container">
      <div class="column is-half left-container">
        <header class="toolbar-container">
          <div class="columns is-multiline is-gapless toolbar">
            <div class="column is-5">
                <a class="button is-primary" @click="showFilter">show full filter</a>
            </div>
            <div class="column is-5">
              <SortBar></SortBar>
            </div>
            <!-- <div class="column is-5" v-show="showList || showTable">
              <Pagination
                :currentPage="currentPage"
                :pageSize="pageSize"
                :total="filterResults.length"
                :size="5"
                :chunk="true"
                @currentChanged="changeCurrent">
              </Pagination>
            </div> -->
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
            <div class="column is-12 filter-dropdown">
              <div class="filter" v-show="showFullFilter" v-on-clickaway="hideFilter">
                <FilterFullSize></FilterFullSize>
              </div>
            </div>
            <div class="column is-12">
              <div class="columns">
                <div class="column is-6">
                  <div class="tabs">
                    <ul v-show="showList || showTable">
                      <li v-bind:class="{'is-active': !showSelected}"><a @click="setShowSelected(false)">Search Results</a></li>
                      <li v-bind:class="{'is-active': showSelected}"><a @click="setShowSelected(true)">Selected Houses</a></li>
                    </ul>
                  </div>
                </div>
                <div class="column is-2">
                  <p class="control" v-show="!showSelected && (showList || showTable)">
                    <label class="checkbox">
                      <input type="checkbox" v-model="selectAll">
                      This Page
                    </label>
                  </p>
                </div>

                <div class="column is-4">
                  <p class="control has-addons">
                    <a class="button is-primary" @click="share">{{shareButtonText}}</a>
                    <a class="button is-danger" @click="clearSelectedHouse">Clear All</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="list" class="list-container" v-show="showList">
          <house-list :houseList="currentList" :selectedOnly="showSelected"></house-list>
        </div>
        <div class="table-container" v-show="showTable">
          <TableList :houseList="currentList" :selectedOnly="showSelected"></TableList>
        </div>
        <RaccoonMap v-show="showMap" class="map" :houses="allHouses" :searchByGeo="searchByGeo">
        </RaccoonMap>

        <div class="has-text-centered" v-show="showList || showTable">
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
  height: calc(100vh - 50px);
  max-width: 1300px;
  margin: auto;
}
.left-container {
  height: 100%;
  margin-left: 4px;
  padding: 0;
}
.left-container .toolbar-container {
  margin-top: 4px;
  height: auto;
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.left-container .toolbar-container .toolbar {
  padding: 0 5px;
}
.right-container {
  height: 100%;
  padding: 0;
}
.right-container .share-list {
  height: calc(50% - 4px);
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 4px;
  padding: 10px;
}
.map-container .map {
}
.list-container {
  padding-top: 5px;
  height: calc(100% - 113.5px);
  position: relative;
  overflow-y: scroll;
}
.table-container {
  padding-top: 5px;
  height: calc(100% - 106px);
  position: relative;
}
.filter-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.filter {
  position: absolute;
  z-index: 100;
  left: 0px;
}

</style>
<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import list from '../components/list/list.vue';
import SortBar from '../components/list/SortBar.vue';
import Pagination from '../components/list/Pagination.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';
import Map from '../components/map/Map.vue';
import ShareList from './components/share/ShareList.vue';
import TableList from '../components/list/TableList.vue';

export default {
  name: 'main',
  mixins: [clickaway],
  data() {
    return {
      position: 0,
      currentPage: 0,
      scrollUnit: 260,
      viewMode: ['map', 'cards', 'table'],
      selectedView: 'cards',
      showSelected: false,
      selectAll: false,
      showFullFilter: false,
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
    FilterFullSize,
    'house-list': list,
    SortBar,
    RaccoonMap: Map,
    Pagination,
    ShareList,
    TableList,
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
    showMap() {
      return this.selectedView === this.viewMode[0];
    },
    showList() {
      return this.selectedView === this.viewMode[1];
    },
    showTable() {
      return this.selectedView === this.viewMode[2];
    },
    pageSize() {
      if (this.showList) {
        return 20;
      } else if (this.showTable) {
        return 50;
      }
      return 0;
    },
    shareButtonText() {
      if (this.selectedHouses.length === 0) {
        return 'Share All';
      }
      return `Share ${this.selectedHouses.length}`;
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
            ids: this.currentList.map(h => h._id),
          });
        } else {
          this.$store.dispatch({
            type: 'unselectHouses',
            ids: this.currentList.map(h => h._id),
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
    showFilter(event) {
      console.log('show filter');
      this.showFullFilter = true;
      event.stopPropagation();
    },
    hideFilter() {
      console.log('hide filter');
      this.showFullFilter = false;
    },
    share() {
      if (this.filterResults.length === 0) {
        console.log('nothing to share');
        return;
      }
      if (this.selectedHouses.length === 0) {
        this.$router.push('/shareSetting/true');
        return;
      }
      this.$router.push('/shareSetting/false');
    },
    clearSelectedHouse() {
      this.$store.dispatch({
        type: 'unselectAllHouses',
      });
    },
  },
};
</script>
