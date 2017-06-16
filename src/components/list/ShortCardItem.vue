<template>
  <v-card hover raised horizontal v-show="show" @mouseover="hover" class="mt-1">
    <v-card-row>
      <v-card-text>
        <strong>{{house.address | formatAddress}}</strong>
        <div>{{house.price | formatNumber(0, '$')}}</div>
      </v-card-text>
    </v-card-row>
    <v-card-row>
      <v-card-text>
        <div>{{house.beds}} Beds</div>
        <div>{{house.baths}} Baths</div>
      </v-card-text>
    </v-card-row>
    <v-card-row>
      <v-card-text>
        <div>{{house.sizeInSF}} Sq. Ft.</div>
        <div>{{house.unitPriceInSF | formatNumber(2, '$')}} / <i>Sq. Ft.</i></div>
      </v-card-text>
    </v-card-row>
    <v-card-row actions>
      <v-btn icon v-bind:class="[like ? 'red--text' : 'grey--text']" @click.native="likeListing">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon v-bind:class="[itemSelected ? 'green--text' : '']" @click.native="selectItem">
        <v-icon>done</v-icon>
      </v-btn>
    </v-card-row>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'ShortCardItem',
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
