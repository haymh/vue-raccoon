<template>
  <div>
    <a class="button" @click="readUserLocally">load user from local storage</a>
    <a class="button" @click="searchHouse">search house</a>
    <FilterElement></FilterElement>
    <Pagination
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
    </Pagination>
    <MortgageCalculator :price="price" :hoa="hoa"></MortgageCalculator>
    <!-- <h1>User</h1>
    <pre>{{ user }}</pre>
    <h1>All Houses</h1>
    <pre>{{ allHouses }}</pre>
    <h1>Filter Results</h1>
    <pre>{{ filterResults }}</pre> -->

    <ChatBar></ChatBar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import FilterElement from '../components/filter/Filter-element.vue';
import ChatBar from '../components/chat/ChatBar.vue';
import MortgageCalculator from '../components/mortgage_calculator/MortgageCalculator.vue';
import Pagination from '../components/list/Pagination.vue';

export default {
  name: 'view1',
  data() {
    return {
      price: 30000,
      hoa: 300,
      current: 0,
    };
  },
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
  },
};
</script>
