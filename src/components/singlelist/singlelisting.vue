<template>
  <v-card class="box list" @mouseover="select" v-show="show" hover>
    <v-layout row>
      <v-flex xs12 sm12 md6>
        <Slider :images="singleListingData.pics" :clickHandler="onClickHandler"></Slider>
        <list-basic-info class="basic-info" v-bind:listingData="singleListingData"></list-basic-info>
                <a class="like" v-bind:style="{color: like? '#ff3860':'white'}">
          <span class="icon is-medium" v-on:click="likeListing">
            <i v-bind:class="['fa',like ? 'fa-heart' : 'fa-heart-o']"></i>
          </span>
        </a>
      </v-flex>
      <v-flex md6 class="hidden-sm-and-down">
        <list-detail-info v-bind:listingData="singleListingData">
          <a v-bind:style="{color: cardSelected? '#1B998B':'grey'}">
            <span class="icon is-medium" v-on:click="selectCard">
              <i class="fa fa-check"></i>
            </span>
          </a>
        </list-detail-info>
        <footer class="card-footer actions">
          <router-link class="card-footer-item button is-white" :to="`/house/${singleListingData._id}`">View Detail</router-link>
        </footer>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Gallery from './gallery.vue';
import BasicInfo from './basicInfo.vue';
import DetailInfo from './detailInfo.vue';
import Slider from './Slider.vue';
import { db, timeStamp } from '../../api/fire';

export default {
  name: 'SingleList',
  props: {
    singleListingData: Object,
    showOnlyWhenSelected: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'list-gallery': Gallery,
    'list-basic-info': BasicInfo,
    'list-detail-info': DetailInfo,
    Slider,
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
