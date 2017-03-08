<template>
  <div class="container">
    <p class="control" v-show="!showSelected">
      <label class="checkbox">
        <input type="checkbox" v-model="selectAll">
        Select All
      </label>
    </p>
    <div class="columns is-multiline">
      <div class="column is-4" v-for="c in customerList">
        <CustomerCard :customer="c" :showOnlyWhenSelected="showSelected"></CustomerCard>
      </div>
    </div>
  </div>
</template>
<script>
import CustomerCard from './CustomerCard.vue';

export default {
  name: 'CustomerList',
  data() {
    return {
      selectAll: false,
    };
  },
  props: {
    showSelected: Boolean,
    customerList: Array,
  },
  components: {
    CustomerCard,
  },
  watch: {
    selectAll: {
      handler() {
        if (this.selectAll) {
          this.$store.dispatch({
            type: 'selectCustomers',
            ids: this.customerList.map(c => c.id),
          });
        } else {
          this.$store.dispatch({
            type: 'unselectCustomers',
            ids: this.customerList.map(c => c.id),
          });
        }
      },
    },
  },
  methods: {
  },
};
</script>
