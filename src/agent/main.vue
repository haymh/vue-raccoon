<template>
<div class="content-container">
  <v-layout row class="hidden-xs-only">
    <v-flex xs6 md6 class="pa-0">
      <v-tabs id="left-desktop-tabs" grow dark>
        <v-card class="primary white--text">
            <v-container fluid grid-list-lg class="pb-0">
              <v-layout row>
                <v-flex sm3 class="pa-0">
                  <v-dialog lazy v-model="showFullFilter" persistent fullscreen transition="dialog-bottom-transition" :overlay=false>
                    <v-btn small slot="activator" @click="toggleFilter">full filter</v-btn>
                    <v-toolbar>
                      <v-btn icon="icon" @click.native="showFullFilter = false" light>
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Filter</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn light flat @click.native="dialog = false">Save</v-btn>
                    </v-toolbar>
                    <v-card>
                      <v-card-text>
                        <SortBar></SortBar>
                      </v-card-text>
                      <v-card-text>
                        <FilterFullSize></FilterFullSize>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-flex>
                <v-flex sm3 class="pa-0">
                  <v-checkbox v-show="showList || showTable" label="This Page" v-model="selectAll" hide-details light></v-checkbox>
                </v-flex>
                <v-flex sm6 class="pa-0">
                  <v-btn small @click.native="share">{{shareButtonText}}</v-btn>
                  <v-btn small @click.native="clearSelectedHouse">Clear</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
        </v-card>
        <v-tabs-bar slot="activators">
          <v-tabs-slider></v-tabs-slider>
          <v-tabs-item v-for="(item, i) in viewMode" :key="i" :href="'#left-desktop-tabs-' + item">
            {{item}}
          </v-tabs-item>
        </v-tabs-bar>

        <v-tabs-content id="left-desktop-tabs-cards">
          <div class="cardlist-container mr-1 ml-1">
            <house-list :houseList="filterResults" :selectAll="selectAll" :cardHeight="200">
            </house-list>
          </div>
        </v-tabs-content>

        <v-tabs-content id="left-desktop-tabs-map">
          <v-card flat>
            <v-card-text>
              <!--<RaccoonMap class="map" :houses="allHouses" :searchByGeo="searchByGeo"></RaccoonMap>-->
            </v-card-text>
          </v-card>
        </v-tabs-content>

        <v-tabs-content id="left-desktop-tabs-table">
          <TableList class="left-tablelist-container" :houseList="filterResults"></TableList>
        </v-tabs-content>
      </v-tabs>
    </v-flex>

    <v-flex xs6 md6 class="pa-0">

      <TableList :houseList="selectedHouses" :selectedOnly="true" class="tablelist-container mr-3">
      </TableList>
      <v-toolbar fix class="indigo white--text">
        <v-toolbar-title>
          You have selected {{selectedHouses.length}} houses
        </v-toolbar-title>
        <QrcodeDialog v-model="showQrcode" :generateLink="generateLink" :isLoading="isLoading" :link="link" @next="share">
            </QrcodeDialog>
      </v-toolbar>
    </v-flex>
  </v-layout>

  <v-tabs id="mobile-tabs" grow dark class="hidden-sm-and-up" v-model="mobileSelectedView">
    <v-card class="primary white--text" v-show="mobileSelectedView === 'mobile-tabs-Search Results'">
      <v-container fluid grid-list-lg class="pb-0">
        <v-layout row>
          <v-flex xs4 class="pa-0">
            <v-dialog v-model="showFullFilter" lazy persistent fullscreen transition="dialog-bottom-transition" :overlay=false>
              <v-btn small dark slot="activator" @click="toggleFilter">full filter</v-btn>
              <v-toolbar light>
                <v-btn icon="icon" @click.native="showFullFilter = false" light>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Filter</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn light flat @click.native="dialog = false">Save</v-btn>
              </v-toolbar>
              <v-card>
                <v-card-text>
                  <SortBar></SortBar>
                </v-card-text>
                <v-card-text>
                  <FilterFullSize></FilterFullSize>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex xs4 class="pa-0">
            <v-checkbox v-show="showList || showTable" label="This Page" v-model="selectAll" hide-details light></v-checkbox>
          </v-flex>
          <v-flex xs4 class="pa-0">
            <v-btn small light flat @click.native="share">
              {{shareButtonText}}
              <v-icon>share</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card class="primary white--text" v-show="mobileSelectedView === 'mobile-tabs-Selected Houses'">
      <v-btn small flat light @click.native="clearSelectedHouse">Clear All</v-btn>
      <v-btn flat small light @click.native="share">
        {{shareButtonText}}
        <v-icon>share</v-icon>
      </v-btn>
    </v-card>
    <v-tabs-bar slot="activators">
      <v-tabs-slider></v-tabs-slider>
      <v-tabs-item :key="0" :href="'#mobile-tabs-' + mobileViewMode[0]">
        {{mobileViewMode[0]}}
      </v-tabs-item>
      <v-tabs-item :key="1" :href="'#mobile-tabs-' + mobileViewMode[1]">
        {{mobileViewMode[1]}} {{this.selectedHouses.length}}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content id="mobile-tabs-Search Results">
      <div class="cardlist-container mr-1 ml-1">
        <house-list :houseList="filterResults" :selectAll="selectAll">
        </house-list>
      </div>
    </v-tabs-content>
    <v-tabs-content id="mobile-tabs-Selected Houses">
      <TableList :houseList="selectedHouses" :selectedOnly="true" class="tablelist-container">
      </TableList>
    </v-tabs-content>
  </v-tabs>
</div>

</template>
<style scoped>
.content-container {
  height: calc(100vh - 56px);
  margin: auto;
}
.cardlist-container {
  overflow-y: scroll;
  height: calc(100vh - 182px);
}
.tablelist-container {
  height: calc(100vh - 120px);
}
.left-tablelist-container {
  height: calc(100vh - 188px);
}
.filter-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.sort-bar {
  position: relative;
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
import list from '../components/list/list.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';
import SortBar from '../components/list/SortBar.vue';
import Map from '../components/map/Map.vue';
import ShareList from './components/share/ShareList.vue';
import TableList from '../components/list/TableList.vue';
import QrcodeDialog from './components/share/QrcodeDialog.vue';
import API from '../api';
import { generateQuery } from '../components/filter/filter-schema';


export default {
  name: 'main',
  mixins: [clickaway],
  data() {
    return {
      viewMode: ['cards', 'map', 'table'],
      mobileViewMode: ['Search Results', 'Selected Houses'],
      mobileSelectedView: 'mobile-tabs-Search Results',
      selectedView: 'cards',
      selectAll: false,
      showFullFilter: false,
      isLoading: false,
      showQrcode: false,
      queryChanged: false,
    };
  },
  components: {
    FilterFullSize,
    'house-list': list,
    RaccoonMap: Map,
    ShareList,
    TableList,
    SortBar,
    QrcodeDialog,
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
          value: [
            {
              key: '$regex',
              value: `^${this.searchTerms.state}$`,
            },
            {
              key: '$options',
              value: 'i',
            },
          ],
        });
        if (this.searchTerms.county) {
          query.push({
            key: 'county',
            value: [
              {
                key: '$regex',
                value: `^${this.searchTerms.county}$`,
              },
              {
                key: '$options',
                value: 'i',
              },
            ],
          });
        } else {
          query.push({
            key: 'city',
            value: [
              {
                key: '$regex',
                value: `^${this.searchTerms.city}$`,
              },
              {
                key: '$options',
                value: 'i',
              },
            ],
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
    share() {
      this.showQrcode = false;
      if (this.filterResults.length === 0) {
        console.log('nothing to share');
        return;
      }
      this.$store.dispatch('setQuery', this.query);
      if (this.selectedHouses.length === 0) {
        this.$store.dispatch('setByFilter', true);
        this.$router.push('/editShareEmail');
        return;
      }
      this.$store.dispatch('setByFilter', false);
      this.$router.push('/editShareEmail');
    },
    clearSelectedHouse() {
      this.$store.dispatch({
        type: 'unselectAllHouses',
      });
    },
    generateLink(event) {
      console.log('generate link');
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
        query: this.query,
        createdBy: this.userId,
      };
      console.log('QR code');
      API.createShare(obj).then((data) => {
        console.log(data);
        this.$store.dispatch('setShareId', data._id);
        this.queryChanged = false;
        this.isLoading = false;
        this.showQrcode = true;
      });
    },
  },
};
</script>
