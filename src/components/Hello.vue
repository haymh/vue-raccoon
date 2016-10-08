<template>
  <div class="hello">
    <div class="text">输入后匹配输入建议</div>
    <el-row>
    <el-col :span="20">
    <el-autocomplete
      v-model="autocompleteResult"
      :fetch-suggestions="querySearch"
      placeholder="请输入city, zip"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    </el-col>
    <el-col :span="4">
    <el-button type="primary" @click.native="addGuest">add one more</el-button>
    </el-col>
    </el-row>
    <pre>select: {{ autocompleteResult }}</pre>

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
import Vue from 'vue';
export default Vue.component('Hello', {
  data() {
    return {
      msg: 'Hello Vue!',
      people: [],
      guestList: [
        'Heng', 'Jeremy', 'Nelson', 'Davy',
      ],
      greetings: [],
      autocompleteResult: '',
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
    addGuest() {
      this.people.push(this.guestList[Math.floor(Math.random() * this.guestList.length)]);
      console.log(this.people);
    },
    querySearch(queryString, cb) {
      this.$http.get('http://127.0.0.1:3000/autocomplete',
      { params: { types: '(cities)', q: queryString } })
      .then((response) => {
        // success callback
        console.log('loaded', response);
        const res = response.body.predictions.map(obj =>
          ({ text: obj.description, value: obj.description }));
        cb(res);
      }, (response) => {
        // error callback
        console.log('err', response);
      });
    },
    handleSelect() {
      console.log('select', this.autocompleteResult);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
