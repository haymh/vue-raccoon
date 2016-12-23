<template>
  <AutoComplete></AutoComplete>
</template>

<script>
import AutoComplete from './AutoComplete.vue';

export default {
  name: 'HouseSearchBar',
  components: { AutoComplete },
  created() {
  },
  data() {
    return {
      query: null,
    };
  },
  methods: {
    search() {
      // construct search terms for house searching
      // this.$store.dispatch('searchHouse');
    },
    handleNewQuery(newQuery) {
      console.log('new query', newQuery);
      this.query = newQuery;
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
