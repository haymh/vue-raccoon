<template>
<div>
  <v-layout row wrap>
    <v-flex xs12 md3>
      <p class="title">{{propertyDetail.address | formatAddress}}
      <v-btn icon raised v-bind:class="[like ? 'red--text' : 'grey--text']" @click.native="likeListing">
        <v-icon>favorite</v-icon>
      </v-btn>
      </p>
    </v-flex>
    <v-flex xs12 md5>
      <div class="has-right-border">
        <p>{{propertyDetail.price | formatNumber(0, '$')}}</p>
        <p>Price</p>
      </div>
      <div class="has-right-border">
        <p>{{propertyDetail.beds}}</p>
        <p>beds</p>
      </div>
      <div class="has-right-border">
        <p>{{propertyDetail.baths}}</p>
        <p>baths</p>
      </div>
      <div class="has-right-border">
        <p>{{propertyDetail.sizeInSF}}</p>
        <p>Sq.Ft</p>
      </div>
      <div style="display: inline-block;">
        <p>{{propertyDetail.unitPriceInSF | formatNumber(2, '$')}}</p>
        <p>Per <i>Sq. Ft.</i></p>
      </div>
    </v-flex>
    <v-flex md3 class="hidden-xs-only">
      <v-btn icon raised v-bind:class="[like ? 'red--text' : 'grey--text']" @click.native="likeListing">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn>
        share
        <v-icon>share</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</div>
  
</template>
<style scoped>
.has-right-border{
  display: inline-block;
  border-right: solid #BBBBBB;
  border-right-width: 1px;
  padding-left: 3px;
  padding-right: 3px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'Summary',
  props: ['propertyDetail'],
  created() {
    console.log(this.userId);
    this.$bindAsObject('favorite', db.ref(`buyerData/${this.userId}/favoriteHouses/${this.propertyDetail._id}`));
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    like() {
      return this.favorite.createdAt !== undefined;
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
  },
};
</script>
