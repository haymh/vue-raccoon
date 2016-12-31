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
      console.log('new query', newQuery);
      const query = newQuery.text.split(', ');
      console.log('split', query);
      this.$store.dispatch('searchHouse', {
        city: query[0],
        state: query[1],
      });
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
