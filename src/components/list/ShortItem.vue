<template>
  <v-list-item v-show="show" v-bind:key="house._id" @mouseover="hover">
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>{{house.address | formatAddress}}</v-list-tile-title>
        <v-list-tile-sub-title>Price: {{house.price | formatNumber(0, '$')}}</v-list-tile-sub-title>
        <v-list-tile-sub-title>Beds: {{house.beds}} Bath: {{house.baths}}</v-list-tile-sub-title>
        <v-list-tile-sub-title>{{house.sizeInSF}} Sq. Ft. | {{house.unitPriceInSF | formatNumber(2, '$')}} / <i>Sq. Ft.</i></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon v-bind:class="[like ? 'red--text' : 'grey--text']" @click.native="likeListing">
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon v-bind:class="[itemSelected ? 'green--text' : '']" @click.native="selectItem">
          <v-icon>done</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider v-if="divider"></v-divider>
  </v-list-item>
</template>
<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'ShortItem',
  data() {
    return {};
  },
  props: {
    house: Object,
    showOnlyWhenSelected: {
      type: Boolean,
      default: false,
    },
    divider: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log('SHORT ITEM', this.house);
    console.log(this.userId);
    this.$bindAsObject('favorite', db.ref(`buyerData/${this.userId}/favoriteHouses/${this.house._id}`));
  },
  computed: {
    ...mapGetters([
      'userId', 'selectedHouses',
    ]),
    like() {
      return this.favorite.createdAt !== undefined;
    },
    itemSelected() {
      return this.selectedHouses.indexOf(this.house) !== -1;
    },
    show() {
      if (this.showOnlyWhenSelected) {
        return this.itemSelected;
      }
      return true;
    },
    address() {
      return this.$options.filters.formatAddress(this.house.address);
    },
    price() {
      return this.$options.filters.formatNumber(this.house.price, 0, '$');
    },
  },
  methods: {
    likeListing() {
      console.log(this.favorite);
      const value = this.favorite.createdAt;
      if (value) {
        this.$firebaseRefs.favorite.remove();
      } else {
        this.$firebaseRefs.favorite.set({ createdAt: timeStamp });
      }
    },
    selectItem() {
      if (!this.itemSelected) {
        this.$store.dispatch({
          type: 'selectHouse',
          house: this.house,
        });
      } else {
        this.$store.dispatch({
          type: 'unselectHouse',
          house: this.house,
        });
      }
    },
    hover() {
      this.$emit('hoverHouse', this.house);
    },
  },
};
</script>
