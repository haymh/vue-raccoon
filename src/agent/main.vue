<template>
  <div class="content-container">
    <v-layout row class="hidden-xs-only">
      <v-flex md6 class="pa-0">
          <v-tabs id="left-desktop-tabs" grow light>
            <v-card class="primary white--text">
              <div>
                <v-card-row>
                  <v-btn small dark  @click="toggleFilter">full filter</v-btn>
                  <!--<v-spacer></v-spacer>-->
                  <v-checkbox v-show="showList || showTable" label="This Page" v-model="selectAll" hide-details light></v-checkbox>
                  <v-btn small @click.native="share">{{shareButtonText}}</v-btn>
                  <v-btn small @click.native="clearSelectedHouse">Clear All</v-btn>
                </v-card-row>
                <!--<v-card-row v-show="searchResultSummary !== ''">
                  <div v-html="searchResultSummary"></div>
                </v-card-row>-->
              </div>
            </v-card>
            <v-tabs-bar slot="activators">
              <v-tabs-slider></v-tabs-slider>
              <v-tabs-item v-for="(item, i) in viewMode"
                :key="i"
                :href="'#left-desktop-tabs-' + item"
              >
                {{item}}
              </v-tabs-item>
            </v-tabs-bar>

            <v-tabs-content id="left-desktop-tabs-cards">
              <div class="cardlist-container mr-1 ml-1">
                <house-list
                        :houseList="filterResults"
                        :selectAll="selectAll">
                </house-list>
              </div>
            </v-tabs-content>

             <v-tabs-content id="left-desktop-tabs-map">
              <v-card flat>
                <v-card-text>
                  <RaccoonMap class="map" :houses="allHouses" :searchByGeo="searchByGeo"></RaccoonMap>
                </v-card-text>
              </v-card>
            </v-tabs-content>

            <v-tabs-content id="left-desktop-tabs-table">
              <TableList class="tablelist-container" :houseList="filterResults"></TableList>
            </v-tabs-content>
          </v-tabs>
        </v-flex>

      

              <!--<v-toolbar-item class="column is-12 filter-dropdown">
                <div class="filter" v-show="showFullFilter" v-on-clickaway="hideFilter">
                  <FilterFullSize></FilterFullSize>
                </div>
              </v-toolbar-item>-->
              <!--<v-toolbar-item class="column is-2">
                <SortBar class="sort-bar"></SortBar>
              </v-toolbar-item>-->
      

 
        <v-flex md6 class="pa-0">
          
          <TableList
                    :houseList="selectedHouses"
                    :selectedOnly="true"
                    class="tablelist-container">
          </TableList>
          <v-toolbar>
            <v-toolbar-items>
              <v-toolbar-item>You have selected {{selectedHouses.length}} houses
              </v-toolbar-item>
              <v-toolbar-item>
                <v-dialog v-model="showQrcode">
                  <v-btn small primary light slot="activator" :loading="isLoading" @click.native="generateLink">Generate QR Code</v-btn>
                  <v-card>
                    <v-card-row>
                      <v-card-title v-show="link === ''">Please Search House First</v-card-title>
                    </v-card-row>
                    <v-card-row>
                      <v-card-text class="text-md-center">
                        <qrcode :value="link" :size="150" v-show="link && link !== ''"></qrcode>
                      </v-card-text>
                    </v-card-row>
                    <v-card-row>
                      <v-text-field :value="link" multi-line disabled></v-text-field>
                    </v-card-row>
                    <v-card-row actions>
                      <v-btn class="green--text darken-1" flat="flat" v-clipboard="link">Copy</v-btn>
                      <v-btn class="red--text darken-1" flat="flat" @click.native="showQrcode = !showQrcode">Close</v-btn>
                    </v-card-row>
                  </v-card>
                </v-dialog>
              </v-toolbar-item>
            </v-toolbar-items>
          </v-toolbar>
        </v-flex>
      </v-layout>

      <v-tabs id="mobile-tabs" grow light class="hidden-sm-and-up" v-model="mobileSelectedView">
        <v-card class="primary white--text" v-show="mobileSelectedView === 'mobile-tabs-Search Results'">
          <div>
            <v-card-row>
              <v-btn small light flat @click="toggleFilter">full filter</v-btn>
              <!--<v-spacer></v-spacer>-->
              <v-checkbox v-show="showList || showTable" label="This Page" v-model="selectAll" hide-details light></v-checkbox>
              <v-btn small light flat @click.native="share">{{shareButtonText}}</v-btn>
            </v-card-row>
            <!--<v-card-row v-show="searchResultSummary !== ''">
              <div v-html="searchResultSummary"></div>
            </v-card-row>-->
          </div>
        </v-card>
        <v-card class="primary white--text" v-show="mobileSelectedView === 'mobile-tabs-Selected Houses'">
          <div>
            <v-card-row>
              <v-btn small light flat @click.native="clearSelectedHouse">Clear All</v-btn>
            </v-card-row>
            <!--<v-card-row v-show="searchResultSummary !== ''">
              <div v-html="searchResultSummary"></div>
            </v-card-row>-->
          </div>
        </v-card>
        <v-tabs-bar slot="activators">
          <v-tabs-slider></v-tabs-slider>
          <v-tabs-item
            :key="0"
            :href="'#mobile-tabs-' + mobileViewMode[0]"
          >
            {{mobileViewMode[0]}}
          </v-tabs-item>
          <v-tabs-item
            :key="1"
            :href="'#mobile-tabs-' + mobileViewMode[1]"
          >
            {{mobileViewMode[1]}} {{this.selectedHouses.length}}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content id="mobile-tabs-Search Results">
          <div class="cardlist-container mr-1 ml-1">
            <house-list
                    :houseList="filterResults"
                    :selectAll="selectAll">
            </house-list>
          </div>
          <!--<TableList class="tablelist-container" :houseList="filterResults"></TableList>-->
        </v-tabs-content>
        <v-tabs-content id="mobile-tabs-Selected Houses">
          <TableList
                    :houseList="selectedHouses"
                    :selectedOnly="true"
                    class="tablelist-container">
          </TableList>
        </v-tabs-content>
      </v-tabs>
  </div>
</template>
<style scoped>
.content-container {
  height: calc(100vh - 56px);
  max-width: 1300px;
  margin: auto;
}
.cardlist-container {
  overflow-y: scroll;
  height: calc(100vh - 182px);
}
.tablelist-container {
  height: calc(100vh - 122px);
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
    hideQrcode() {
      console.log('hide qrcode');
      this.showQrcode = false;
    },
    share() {
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
