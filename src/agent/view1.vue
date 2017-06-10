<template>
  <div>
    <a class="button" @click="readUserLocally">load user from local storage</a>
    <a class="button" @click="searchHouse">search house</a>
    <FilterElement></FilterElement>
    <div class="dropdown">
      <a class="button is-primary" @click="showFilter">show full filter</a>
      <div class="filter" v-show="showFullFilter" v-on-clickaway="hideFilter">
        <FilterFullSize></FilterFullSize>
      </div>
    </div>


    <!--<Pagination
      :currentPage="current"
      :pageSize="10"
      :total="1000"
      :size="6"
      :chunk="true"
      @currentChanged="changeCurrent">
    </Pagination>
    <Pagination
      :currentPage="current"
      :pageSize="10"
      :total="1000"
      :size="9"
      :chunkSize="6"
      :chunk="true"
      @currentChanged="changeCurrent">
    </Pagination>-->
    <MortgageCalculator :price="price" :hoa="hoa"></MortgageCalculator>
    <!-- <h1>User</h1>
    <pre>{{ user }}</pre>
    <h1>All Houses</h1>
    <pre>{{ allHouses }}</pre>
    <h1>Filter Results</h1>
    <pre>{{ filterResults }}</pre> -->

    <ChatBar></ChatBar>
    <ShareList class="share-list" title="预定分享" :headers="headers" :list="list" :plus="true" :removable="true" :editable="true"></ShareList>
  </div>
</template>
<style>
.dropdown {
  position: relative;
  display: inline-block;
  width: 50%;
}
.filter {
  /*width: 300px;*/
  position: absolute;
  z-index: 100;
  left: 0px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import FilterElement from '../components/filter/Filter-element.vue';
import ChatBar from '../components/chat/ChatBar.vue';
import MortgageCalculator from '../components/mortgage_calculator/MortgageCalculator.vue';
import Pagination from '../components/list/Pagination.vue';
import FilterFullSize from '../components/filter/FilterFullSize.vue';
import ShareList from '../agent/components/share/ShareList.vue';


export default {
  name: 'view1',
  data() {
    return {
      price: 30000,
      hoa: 300,
      current: 0,
      showFullFilter: false,
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
    FilterElement,
    ChatBar,
    MortgageCalculator,
    Pagination,
    FilterFullSize,
    ShareList,
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
