<template>
<div class="hello container">
  <div class="text">输入后匹配输入建议</div>
  <el-row>
    <el-col :span="12">
      <el-autocomplete v-model="searchQuery"
        :fetch-suggestions="querySearch"
        placeholder="请输入city, zip"
        :trigger-on-focus="false"
        @select="handleSelect">
        <el-button slot="append" icon="search" @click.native="search"></el-button>
      </el-autocomplete>
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
import fetch from 'isomorphic-fetch';

export default {
  name: 'Search',
  created() {
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
  },
  methods: {
    search() {
      console.log('Search: ', this.searchQuery, ' proceed? ', !this.searchQueryIsDirty);
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
      fetch(`http://127.0.0.1:3000/autocomplete?types=(cities)&q=${queryString}`,
        {
          // body: { types: '(cities)', q: queryString },
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE0ODA3NTEzNzIsImV4cCI6MTQ4MDc1MjgxMn0.QB6GLuplqgUPQbxFP638bSJHSvjz_vzdI9-Sb191dfk',
          },
        })
      .then(response => response.json())
      .then((json) => {
        // success callback
        console.log('loaded', json);
        const res = json.predictions.map(obj =>
          ({ text: obj.description, value: obj.description }));
        console.log(res);
        crap.searchQueryIsDirty = false;
        cb(res);
      }, (err) => {
        // error callback
        console.log('err', err);
      });
    }, 1000),
    queryStringAsync() {},
    handleSelect() {
      console.log('select', this.searchQuery);
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
