<template>
  <tr class="" v-show="show">
      <td>{{house.address | formatAddress}}</td>
      <td>{{house.price | formatNumber(0, '$')}}</td>
      <td>{{house.beds}}</td>
      <td>{{house.baths}}</td>
      <td>{{house.sizeInSF}}</td>
      <td>{{house.unitPriceInSF | formatNumber(2, '$')}} / <i>Sq. Ft.</i></td>
      <td>
        <v-btn icon v-bind:class="[like ? 'red--text' : 'grey--text']" @click.native="likeListing">
          <v-icon>favorite</v-icon>
        </v-btn>
      </td>
      <td>
        <v-btn icon v-bind:class="[itemSelected ? 'green--text' : '']" @click.native="selectItem">
          <v-icon>done</v-icon>
        </v-btn>
      </td>
  </tr>
</template>
<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'TableItem',
  data() {
    return {
      elevation: 1,
    };
  },
  props: {
    house: Object,
    showOnlyWhenSelected: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log('LIST ITEM', this.house);
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
      console.log('e');
      this.elevation = 5;
      this.$emit('hoverHouse', this.house);
    },
  },
};
</script>
