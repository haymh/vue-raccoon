<template>
  <v-card raised horizontal>
    <v-card-row img="http://bulma.io/images/placeholders/96x96.png"></v-card-row>
    <v-card-column>
      <v-card-row class="brown white--text">
        <v-card-text>
          <strong>{{customer.name}}</strong>
          <div>Feb 23, 7:00pm</div>
        </v-card-text>
      </v-card-row>
      <v-card-row actions class="brown darken-2">
        <v-checkbox label="select" v-model="cardSelected" dark></v-checkbox>
      </v-card-row>
    </v-card-column>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CustomerCard',
  props: {
    customer: Object,
    showOnlyWhenSelected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters([
      'selectedCustomers',
    ]),
    cardSelected: {
      set() {
        if (!this.cardSelected) {
          this.$store.dispatch({
            type: 'selectCustomer',
            id: this.customer.id,
          });
        } else {
          this.$store.dispatch({
            type: 'unselectCustomer',
            id: this.customer.id,
          });
        }
      },
      get() {
        return this.selectedCustomers.indexOf(this.customer.id) !== -1;
      },
    },
    show() {
      if (this.showOnlyWhenSelected) {
        return this.cardSelected;
      }
      return true;
    },
  },
  methods: {
    selectCard() {
      if (!this.cardSelected) {
        this.$store.dispatch({
          type: 'selectCustomer',
          id: this.customer.id,
        });
      } else {
        this.$store.dispatch({
          type: 'unselectCustomer',
          id: this.customer.id,
        });
      }
    },
  },
};
</script>
