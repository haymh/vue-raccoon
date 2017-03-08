<template>
  <div class="card" v-on:click="selectCard" v-show="show">
    <header class="card-header">
      <p class="card-header-title">
        {{customer.name}}
      </p>
      <a class="card-header-icon" v-bind:style="{color: cardSelected? '#1B998B':'grey'}">
        <span class="icon">
          <i class="fa fa-check"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image" style="height: 40px; width: 40px;">
            <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">John Smith</p>
          <p class="subtitle is-6">@johnsmith</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a>#css</a> <a>#responsive</a>
        <br>
        <small>11:09 PM - 1 Jan 2016</small>
      </div>
    </div>
  </div>
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
    cardSelected() {
      return this.selectedCustomers.indexOf(this.customer.id) !== -1;
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
