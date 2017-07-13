<template>
  <div class="container">
    <v-layout row wrap>
      <v-flex xs6 v-show="!showSelected">
        <v-checkbox label="Select All" v-model="selectAll" dark></v-checkbox>
      </v-flex>
      <v-flex xs6 v-show="!showSelected">
        <v-select
          v-bind:items="groups"
          v-model="selectedGroup"
          label="Groups"
          dark
          single-line
          auto
        ></v-select>
      </v-flex>
      <v-flex v-for="(c, i) in customerList" :key="i" xs12 md6>
        <CustomerCard class="mt-2" :customer="c" :showOnlyWhenSelected="showSelected"></CustomerCard>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import CustomerCard from './CustomerCard.vue';

export default {
  name: 'CustomerList',
  data() {
    return {
      selectAll: false,
      selectedGroup: 'all customers',
      groups: [
        'all customers',
        'group A',
        'group B',
        'group C',
        'group D',
        'group E',
      ],
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
