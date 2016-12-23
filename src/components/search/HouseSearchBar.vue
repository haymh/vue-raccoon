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
      this.$store.dispatch('searchHouse', {
        city: 'Rancho Cucamonga',
        state: 'ca',
      });
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
