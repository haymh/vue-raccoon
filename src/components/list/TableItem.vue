<template>
  <tr v-show="show" @mouseover="hover">
      <td>{{house.address | formatAddress}}</td>
      <td>{{house.price | formatNumber(0, '$')}}</td>
      <td>{{house.beds}}</td>
      <td>{{house.baths}}</td>
      <td>{{house.sizeInSF}}</td>
      <td>{{house.unitPriceInSF | formatNumber(2, '$')}} / <i>Sq. Ft.</i></td>
      <td>
        <a class="like" v-bind:style="{color: like? '#ff3860':'grey'}">
          <span class="icon is-medium" v-on:click="likeListing">
            <i v-bind:class="['fa',like ? 'fa-heart' : 'fa-heart-o']"></i>
          </span>
        </a>
      </td>
      <td @click="selectItem">
        <a v-bind:style="{color: itemSelected? '#1B998B':'grey'}">
          <span class="icon is-medium">
            <i class="fa fa-check"></i>
          </span>
        </a>
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
      return this.selectedHouses.indexOf(this.house._id) !== -1;
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
          id: this.house._id,
        });
      } else {
        this.$store.dispatch({
          type: 'unselectHouse',
          id: this.house._id,
        });
      }
    },
    hover() {
      this.$emit('hoverHouse', this.house);
    },
  },
};
</script>
