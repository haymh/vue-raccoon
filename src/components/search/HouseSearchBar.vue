<template>
  <AddressAutocomplete @newQuery="handleNewQuery"></AddressAutocomplete>
</template>

<script>
import AddressAutocomplete from './AddressAutocomplete.vue';

export default {
  name: 'HouseSearchBar',
  components: { AddressAutocomplete },
  created() {
  },
  data() {
    return {};
  },
  methods: {
    search() {
      // construct search terms for house searching
      // this.$store.dispatch('searchHouse');
    },
    handleNewQuery(newQuery) {
      console.log('new query', newQuery.value);
      // query value is either "San Diego, CA, United States"
      // or "San Diego, CA 92122, United States"
      const query = newQuery.text.split(', ');
      const secondaryQuery = query[1].split(' ');
      console.log('split #1', query);
      console.log('split #2', secondaryQuery);
      const zip = parseInt(secondaryQuery[1], 10);
      let queryObject = {
        city: query[0],
        state: query[1],
      };
      if (zip) {
        queryObject = {
          zip,
        };
      }
      this.$store.dispatch('searchHouse', queryObject);
      this.$router.push('/main');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
