<template>
  <div>
      <v-toolbar fixed class="white hidden-sm-and-up">
        <v-btn icon light slot="activator">
          <v-icon class="grey--text text--darken-2">list</v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--darken-4">
          <!--<v-text-field
              name="input-1"
              prepend-icon="search"
              id="testing"
              class="ma-0"
            ></v-text-field>-->
            <HouseSearchBar class="autocomplete-input"></HouseSearchBar>
        </v-toolbar-title>
        <v-btn icon light>
          <v-icon class="grey--text text--darken-2">filter</v-icon>
        </v-btn>
      </v-toolbar>
      <!--<v-layout row wrap>
        <v-flex xs3 class="text-xs-center pa-0">
          <v-btn small dark flat>List</v-btn>
        </v-flex>
        <v-flex xs6 class="pa-0">
          <v-text-field
              name="input-1"
              prepend-icon="search"
              id="testing"
              class="ma-0"
            ></v-text-field>
        </v-flex>
        <v-flex xs3 class="text-xs-center pa-0">
          <v-btn small dark flat>Filter</v-btn>
        </v-flex>
      </v-layout>
    <main>
      <a class="button" @click="readUserLocally">load user from local storage</a>
      <a class="button" @click="searchHouse">search house</a>
      <FilterElement></FilterElement>
      <!--<div class="dropdown">
        <a class="button is-primary" @click="showFilter">show full filter</a>
        <div class="filter" v-show="showFullFilter" v-on-clickaway="hideFilter">
          <FilterFullSize></FilterFullSize>
        </div>
      </div>-->
    
    <!--This is hacking for toolbar in both mobile and desktop-->
    <!-- <main class="hidden-sm-and-up"></main> -->
    <div>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Filter</div>
          <FilterFullSize></FilterFullSize>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <MortgageCalculator :price="price" :hoa="hoa"></MortgageCalculator>
      <!-- <h1>User</h1>
      <pre>{{ user }}</pre>
      <h1>All Houses</h1>
      <pre>{{ allHouses }}</pre>
      <h1>Filter Results</h1>
      <pre>{{ filterResults }}</pre> -->

      <!--<ChatBar></ChatBar>-->
      <ShareList class="share-list" title="预定分享" :headers="headers" :list="list" :plus="true" :removable="true" :editable="true"></ShareList>
    </div>
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import ChatBar from '../components/chat/ChatBar.vue';
import MortgageCalculator from '../components/mortgage_calculator/MortgageCalculator.vue';
import Pagination from '../components/list/Pagination.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';
import ShareList from '../agent/components/share/ShareList.vue';
import HouseSearchBar from '../components/search/HouseSearchBar.vue';


export default {
  name: 'view1',
  data() {
    return {
      price: 30000,
      hoa: 300,
      current: 0,
      showFullFilter: false,
      dialog: false,
      headers: [
        {
          text: 'Share Schedule',
          left: true,
          sortable: false,
          value: 'Schedule',
        },
        { text: 'Created At', value: 'Created' },
        { text: 'Share Title', value: 'Title' },
        { text: 'Customer Group', value: 'Customers' },
      ],
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
  mixins: [clickaway],
  computed: mapGetters([
    'user',
    'allHouses',
    'filterResults',
  ]),
  components: {
    ChatBar,
    MortgageCalculator,
    Pagination,
    FilterFullSize,
    ShareList,
    HouseSearchBar,
  },
  methods: {
    searchHouse() {
      this.$store.dispatch('searchHouse');
    },
    filter() {
      this.$store.dispatch('filterHouses');
    },
    readUserLocally() {
      this.$store.dispatch('setUser', {
        id: 123,
        isTemp: false,
        favoriteHouses: [
          { id: 1 },
        ],
        searches: [],
      });
    },
    changeCurrent(current) {
      this.current = current;
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
  },
};
</script>
