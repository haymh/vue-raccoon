<template>
<div class="hello container">
  <div class="text">输入后匹配输入建议</div>
  <el-row>
    <el-col :span="12">
      <Autocomplete v-model="searchQuery"
        :options="searchResult"
        placeholder="请输入city, zip"
        @select="handleSelect">

        <template slot="item" scope="option">
     <article class="media">
       <figure class="media-left">
         <p class="image is-64x64">
           <img :src="option.thumbnail">
         </p>
       </figure>
       <p>
         <strong>{{ option.title }}</strong>
         <br> {{ option.description }}
       </p>
     </article>
   </template>
        <!-- <el-button slot="append" icon="search" @click.native="search"></el-button> -->
      </Autocomplete>
    </el-col>
    <el-col :span="2">
    </el-col>
  </el-row>
  <pre>select: {{ searchQuery }}</pre>

  <el-row>
    <el-col :span="4">
      <el-button type="primary" @click.native="addGuest">add one more</el-button>
    </el-col>
  </el-row>


  <h1>{{ msg }}</h1>
  <ul>
    <li v-for="greeting in greetings">
      {{ greeting }}
    </li>
  </ul>
  <pre>{{ greetings }}</pre>

</div>
</template>

<script>
import debounce from 'lodash.debounce';
import API from '../api';
import Autocomplete from './search/AutoComplete.vue';

export default {
  name: 'Search',
  created() {
  },
  components: {
    Autocomplete,
  },
  computed: {
  },
  data() {
    return {
      msg: 'Hello Vue!',
      people: [],
      guestList: [
        'Heng', 'Jeremy', 'Nelson', 'Davy',
      ],
      greetings: [],
      searchQuery: '',
      searchQueryIsDirty: false,
      searchResult: [],
    };
  },
  watch: {
    people: {
      handler(val, oldVal) {
        console.log('oldVal', oldVal);
        console.log('val', val);
        this.greetings = val.map(person => `Hello ${person}`);
        console.log(this.greetings);
      },
      deep: false,
    },
    searchQuery: {
      handler(val, oldVal) {
        console.log('oldVal', oldVal);
        console.log('val', val);
        this.querySearch(val, (res) => {
          this.searchResult = res;
        });
      },
    },
  },
  methods: {
    search() {
      console.log('Search: ', this.searchQuery);
    },
    addGuest() {
      this.people.push(this.guestList[Math.floor(Math.random() * this.guestList.length)]);
      console.log(this.people);
    },
    querySearch(queryString, cb) {
      console.log('querySearchWrapper');
      this.searchQueryIsDirty = true;
      this.querySearchDebounced(this, queryString, cb);
    },
    querySearchDebounced: debounce((crap, queryString, cb) => {
      console.log('loading');
      console.log('Dirty: ', crap.searchQueryIsDirty);
      API.getAutoComplete(queryString)
      .then((json) => {
        // success
        console.log('loaded', json);
        const res = json.predictions.map(obj =>
          ({ text: obj.description, value: obj.description }));
        console.log(res);
        crap.searchQueryIsDirty = false;
        cb(res);
      }, (err) => {
        console.log('err', err);
      });
    }, 1000),
    handleSelect(val) {
      console.log('select', val);
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
