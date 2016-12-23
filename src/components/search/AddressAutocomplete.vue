<template>
  <Autocomplete v-model="searchQuery"
    :options="searchResult"
    :isLoading="searchQueryIsLoading"
    placeholder="请输入city, zip"
    @select="handleSelect">
    <template slot="item" scope="data">
     <p>
       <strong>{{ data.option.text }}</strong>
     </p>
   </template>
  </Autocomplete>
</template>

<script>
import debounce from 'lodash.debounce';
import raccoonAPI from '../../api';
import Autocomplete from './AutoComplete.vue';

export default {
  name: 'AddressAutoComplete',
  components: {
    Autocomplete,
  },
  props: {
  },
  created() {
  },
  data() {
    return {
      searchQuery: '',
      searchQueryIsDirty: false,
      searchQueryIsLoading: false,
      searchResult: [],
    };
  },
  watch: {
    searchQuery: {
      handler(val, oldVal) {
        console.log('oldVal', oldVal);
        console.log('val', val);
        this.querySearch(val, (res) => {
          this.searchQueryIsLoading = false;
          this.searchResult = res;
        });
      },
    },
  },
  methods: {
    querySearch(queryString, cb) {
      console.log('querySearchWrapper');
      this.searchQueryIsDirty = true;
      this.searchQueryIsLoading = true;
      this.querySearchDebounced(this, queryString, cb);
    },
    querySearchDebounced: debounce((crap, queryString, cb) => {
      console.log('loading');
      console.log('Dirty: ', crap.searchQueryIsDirty);
      raccoonAPI.getAutoComplete(queryString)
      .then((json) => {
        // success
        console.log('loaded', json);
        const res = json.predictions.map(obj =>
          ({ text: obj.description, value: obj }));
        console.log(res);
        crap.searchQueryIsDirty = false;
        cb(res);
      }, (err) => {
        console.log('err', err);
        crap.searchQueryIsLoading = false;
      });
    }, 1000),
    handleSelect(selected) {
      this.$emit('newQuery', selected);
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
