<template>
  <div>
    <div>
      <div class="columns is-marginless toolbar-container">
        <div class="column is-6 is-paddingless">
          <header>
            <div class="columns is-multiline is-gapless toolbar">
              <div class="column is-4">
                  <a class="button is-primary" @click="toggleFilter">show full filter</a>
              </div>
              <div class="column is-4">
                <p class="control" v-show="showList || showTable">
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
              <div class="column is-12 filter-dropdown">
                <div class="filter" v-show="showFullFilter" v-on-clickaway="hideFilter">
                  <FilterFullSize></FilterFullSize>
                </div>
              </div>
              <div class="column is-2">
                <SortBar class="sort-bar"></SortBar>
              </div>
              <div class="column is-5">
                <div v-html="searchResultSummary"></div>
              </div>
              <div class="column is-5">
                <div class="tabs is-fullwidth">
                  <ul>
                    <li v-for="item in viewMode" v-bind:class="isTabActive(item) ? 'is-active' : ''">
                      <a @click="changeView(item)">{{item}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div class="column is-6 is-paddingless">
          <header>
            <div class="columns is-multiline is-gapless toolbar">
              <div class="column is-12">
                <h1 class="title">Selected House</h1>
              </div>
              <div class="column is-6">
                <h2 class="subtitle">You have selected {{selectedHouses.length}} houses</h2>
              </div>
              <div class="column is-6">
                <a :class="[ isLoading ? 'is-loading' : '', 'button', 'is-danger']" @click="generateLink">QR Code</a>
              </div>
              <div class="column is-12">
                <div class="box qr-code" v-show="showQrcode" v-on-clickaway="hideQrcode">
                  <p v-show="link === ''">Please Search House First</p>
                  <div class="has-text-centered">
                    <qrcode :value="link" :size="150" v-show="link && link !== ''"></qrcode>
                  </div>
                  <div class="has-addons" v-show="link !== ''">
                    <p class="control">
                      <input class="input" v-model="link" type="text">
                    </p>
                    <p class="control">
                      <button v-clipboard="link" class="button is-info">Copy</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
      <div class="columns content-container">
        <div class="column is-half left-container">
          <house-list class="list-container"
                  v-show="showList"
                  :houseList="filterResults"
                  :selectAll="selectAll">
          </house-list>
          <TableList class="table-container"
                    :houseList="filterResults"
                    v-show="showTable">
          </TableList>
          <RaccoonMap v-show="showMap" class="map" :houses="allHouses" :searchByGeo="searchByGeo">
          </RaccoonMap>
        </div>
        <div class="column is-half right-container">
          
          <TableList class="table-container"
                    :houseList="selectedHouses"
                    :selectedOnly="true">
          </TableList>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.content-container {
  height: calc(100vh - 120px);
  max-width: 1300px;
  margin: auto;
}
.left-container {
  height: 100%;
  margin-left: 4px;
  padding: 0;
}
.toolbar-container {
  margin-top: 4px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
.toolbar-container .toolbar {
  padding: 0 5px;
}
.right-container {
  height: 100%;
  margin-left: 4px;
  margin-right: 4px;
  padding: 0;
}
.right-container .share-list {
  height: calc(50% - 4px);
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 4px;
  padding: 10px;
}
.list-container {
  padding-top: 5px;
  height: 100%;
  position: relative;
}
.table-container {
  padding-top: 5px;
  height: 100%;
  position: relative;
}
.filter-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.sort-bar {
  position: absolute;
  z-index: 2;
  display: inline-block;
}
.qr-code {
  position: absolute;
  z-index: 2;
  display: inline-block;
}
.filter {
  position: absolute;
  z-index: 3;
  left: 0px;
}

</style>
<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import qrcode from 'v-qrcode';
import list from '../components/list/list.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';
import SortBar from '../components/list/SortBar.vue';
import Map from '../components/map/Map.vue';
import ShareList from './components/share/ShareList.vue';
import TableList from '../components/list/TableList.vue';
import API from '../api';
import { generateQuery } from '../components/filter/filter-schema';


export default {
  name: 'main',
  mixins: [clickaway],
  data() {
    return {
      viewMode: ['cards', 'map', 'table'],
      selectedView: 'cards',
      selectAll: false,
      showFullFilter: false,
      isLoading: false,
      showQrcode: false,
      queryChanged: false,
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
    RaccoonMap: Map,
    ShareList,
    TableList,
    SortBar,
    qrcode,
  },
  computed: {
    ...mapGetters([
      'allHouses',
      'filterResults',
      'selectedHouses',
      'searchTerms',
      'lastFilter',
      'userId',
      'shareId',
    ]),
    showMap() {
      return this.selectedView === this.viewMode[1];
    },
    showList() {
      return this.selectedView === this.viewMode[0];
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
    searchResultSummary() {
      if (this.searchTerms && this.filterResults) {
        return `<p>Found <i>${this.filterResults.length}</i> houses in <strong>${this.searchTerms.city}, ${this.searchTerms.state}</strong></p>`;
      }
      return '';
    },
    link() {
      if (this.shareId && this.shareId !== '') {
        return `www.zhaofangabc.com/share/${this.shareId}`;
      }
      return '';
    },
    query() {
      const query = generateQuery(this.lastFilter);
      if (this.searchTerms && this.searchTerms.state) {
        query.push({
          key: 'address.stateOrProvince',
          value: (new RegExp(`^${this.searchTerms.state}$`, 'i')).toString(),
        });
        if (this.searchTerms.county) {
          query.push({
            key: 'county',
            value: (new RegExp(`^${this.searchTerms.county}$`, 'i')).toString(),
          });
        } else {
          query.push({
            key: 'city',
            value: (new RegExp(`^${this.searchTerms.city}$`, 'i')).toString(),
          });
        }
      }
      console.log('QUERY', query);
      return query;
    },
  },
  watch: {
    query: {
      handler() {
        this.queryChanged = true;
      },
    },
  },
  methods: {
    changeView(view) {
      this.selectedView = view;
    },
    isTabActive(view) {
      return this.selectedView === view;
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
    toggleFilter(event) {
      console.log('show filter');
      this.showFullFilter = !this.showFullFilter;
      event.stopPropagation();
    },
    hideFilter() {
      console.log('hide filter');
      this.showFullFilter = false;
    },
    hideQrcode() {
      console.log('hide qrcode');
      this.showQrcode = false;
    },
    share() {
      if (this.filterResults.length === 0) {
        console.log('nothing to share');
        return;
      }
      if (this.selectedHouses.length === 0) {
        this.$store.dispatch('setByFilter', true);
        this.$router.push('/editShareInfo');
        return;
      }
      this.$store.dispatch('setByFilter', false);
      this.$router.push('/editShareInfo');
    },
    clearSelectedHouse() {
      this.$store.dispatch({
        type: 'unselectAllHouses',
      });
    },
    generateLink(event) {
      event.stopPropagation();
      if (this.showQrcode) {
        this.showQrcode = false;
        return;
      }
      if (!this.queryChanged) {
        // link hasn't changed, no new request
        this.showQrcode = true;
        return;
      }
      this.isLoading = true;
      const obj = {
        uid: this.userId,
        sharedObject: {
          query: this.query,
          emailFrom: 'jeremynangjizi@redoujiang.com',
        },
      };
      API.createShare(obj).then((data) => {
        console.log(data);
        this.$store.dispatch('setShareId', data);
        this.queryChanged = false;
        this.isLoading = false;
        this.showQrcode = true;
      });
    },
  },
};
</script>
