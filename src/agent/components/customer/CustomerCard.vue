<template>
  <v-card raised horizontal>
    <v-container fluid grid-list-lg>
      <v-layout row>
        <v-flex xs5>
          <v-card-media contain src="https://randomuser.me/api/portraits/men/35.jpg" height="125px"></v-card-media>
        </v-flex>
        <v-flex xs7>
          <v-card-text>
            <strong>{{customer.name}}</strong>
            <div>Feb 23, 7:00pm</div>
          </v-card-text>
          <v-card-text>
            <v-checkbox label="select" v-model="cardSelected"></v-checkbox>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
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
