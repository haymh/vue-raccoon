<template>
  <div>
    <a class="button" @click="readUserLocally">load user from local storage</a>
    <a class="button" @click="searchHouse">search house</a>
    <FilterElement></FilterElement>
    <MortgageCalculator :price="price" :hoa="hoa"></MortgageCalculator>
    <h1>User</h1>
    <pre>{{ user }}</pre>
    <h1>All Houses</h1>
    <pre>{{ allHouses }}</pre>
    <h1>Filter Results</h1>
    <pre>{{ filterResults }}</pre>

    <ChatBar></ChatBar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import FilterElement from './filter/Filter-element.vue';
import ChatBar from './chat/ChatBar.vue';
import MortgageCalculator from './mortgage_calculator/MortgageCalculator.vue';

export default {
  name: 'view1',
  data() {
    return {
      price: 30000,
      hoa: 300,
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
  },
};
</script>
