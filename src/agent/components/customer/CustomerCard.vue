<template>
  <v-card raised horizontal>
    <v-layout row wrap>
      <v-flex xs10>
        <v-card-text class="pt-0">
        <v-chip>
          <v-avatar class="teal">{{fullName[0]}}</v-avatar>
          {{fullName}}
        </v-chip>
        <v-chip v-for="(t, i) in customer.types" outline v-bind:class="chipClasses[i % 5]" :key="i">{{t}}</v-chip>
      </v-card-text>
      <v-card-text class="pt-0 pb-0">
        <v-chip v-for="(e, i) in customer.emails" outline :key="i" v-bind:class="chipClasses[i % 5]">
          {{e.email}}
          <v-icon right>{{e.type}}</v-icon>
        </v-chip>
      </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-actions>
        <v-btn icon>
          <v-icon>check</v-icon>
        </v-btn>
      </v-card-actions>
      </v-flex>
    </v-layout>
      
      
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
  data() {
    return {
      chipClasses: [
        { secondary: true, 'secondary--text': true },
        { primary: true, 'primary--text': true },
        { red: true, 'red--text': true },
        { indigo: true, 'indigo--text': true },
        { blue: true, 'blue--text': true },
      ],
    };
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
    fullName() {
      const fullName = `${this.customer.firstName || ''} ${this.customer.lastName || ''}`;
      return fullName === ' ' ? 'No Name' : fullName;
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
