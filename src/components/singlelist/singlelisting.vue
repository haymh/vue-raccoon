<template>
  <v-card class="box list mt-1" @mouseover="select" v-show="show" hover>
    <v-layout row :style="{height: height + 'px'}">
      <v-flex xs12 sm12 md6 class="pa-0">
        <HouseGalleryWithInfo :house="singleListingData" :clickHandler="onClickHandler" style="height:100%; margin: 0 auto;"></HouseGalleryWithInfo>
        
        <v-btn class="like" icon raised v-bind:class="[like ? 'red--text' : 'grey--text']" @click.native="likeListing">
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn icon outline v-bind:class="[cardSelected ? 'green--text' : 'grey--text', 'check', 'hidden-md-and-up']" @click.native="selectCard">
          <v-icon>done</v-icon>
        </v-btn>
      </v-flex>
      <v-flex md6 class="hidden-sm-and-down pa-0" style="z-index:1">
        <list-detail-info v-bind:listingData="singleListingData">
          <v-card-actions>
            <v-btn icon v-bind:class="[cardSelected ? 'green--text' : 'grey--text']" @click.native="selectCard">
              <v-icon>done</v-icon>
            </v-btn>
            <v-btn :to="`/house/${singleListingData._id}`">View Detail</v-btn>
          </v-card-actions>
          
        </list-detail-info>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<style>
.list {
  overflow: hidden;
  padding: 0px;
  position: relative;
}

.list .like {
  z-index: 1;
  position: absolute;
  top: 0px;
  padding: 5px;
  margin: 10px;
}

.list .check {
  z-index: 1;
  position: absolute;
  float: right;
  top: 0px;
  right: 0px;
  padding: 5px;
  margin: 10px;
}

.list .actions {
  position: absolute;
  width: 50%;
  bottom: 0px;
}

</style>

<script>
import { mapGetters } from 'vuex';
import HouseGalleryWithInfo from './HouseGalleryWithInfo.vue';
import DetailInfo from './detailInfo.vue';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'SingleList',
  props: {
    singleListingData: Object,
    showOnlyWhenSelected: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 250,
    },
  },
  components: {
    'list-detail-info': DetailInfo,
    HouseGalleryWithInfo,
  },
  computed: {
    ...mapGetters([
      'userId', 'selectedHouses',
    ]),
    like() {
      return this.favorite.createdAt !== undefined;
    },
    cardSelected() {
      return this.selectedHouses.indexOf(this.singleListingData) !== -1;
    },
    show() {
      if (this.showOnlyWhenSelected) {
        return this.cardSelected;
      }
      return true;
    },
  },
  data() {
    return {
    };
  },
  created() {
    console.log('LIST ITEM', this.singleListingData);
    console.log(this.userId);
    this.$bindAsObject('favorite', db.ref(`buyerData/${this.userId}/favoriteHouses/${this.singleListingData._id}`));
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
    onClickHandler() {
      this.$router.push(`/house/${this.singleListingData._id}`);
    },
    select() {
      console.log(`select this guy ${this.singleListingData._id}`);
    },
    selectCard() {
      console.log('hey', this.singleListingData._id);
      if (!this.cardSelected) {
        this.$store.dispatch({
          type: 'selectHouse',
          house: this.singleListingData,
        });
      } else {
        this.$store.dispatch({
          type: 'unselectHouse',
          house: this.singleListingData,
        });
      }
    },
  },
};
</script>

<style scoped>
Slider {
max-width: 325px;
}
</style>
