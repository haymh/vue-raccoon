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
      let queryObject = {};
      if (query.length > 3) {
        console.log('Address search: ', query);
        queryObject = {
          placeId: newQuery.value.place_id,
        };
      } else {
        const zip = parseInt(secondaryQuery[1], 10);
        if (zip) {
          queryObject = {
            zip,
          };
        } else {
          queryObject = {
            city: query[0],
            state: query[1],
          };
        }
      }
      console.log('queryObject', queryObject);
      this.$store.dispatch('searchHouse', queryObject);
      this.$router.push('/search');
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
