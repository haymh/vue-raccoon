<template>
  <div class="box list" @mouseover="select">
    <div class="columns is-gapless is-mobile">
      <div class="column is-half left-column">
        <!-- <list-gallery :images="singleListingData.pics"></list-gallery> -->
        <Slider :images="singleListingData.pics" :clickHandler="onClickHandler"></Slider>
        <list-basic-info class="basic-info" v-bind:listingData="singleListingData"></list-basic-info>

        <a class="like" v-bind:style="{color: like? '#ff3860':'white'}">
          <span class="icon is-medium" v-on:click="likeListing">
            <i v-bind:class="['fa',like ? 'fa-heart' : 'fa-heart-o']"></i>
          </span>
        </a>
      </div>
      <div class="column is-half right-column" @click="selectCard">
        <list-detail-info v-bind:listingData="singleListingData">
          <a v-bind:style="{color: cardSelected? '#1B998B':'grey'}">
            <span class="icon is-medium">
              <i class="fa fa-check"></i>
            </span>
          </a>
        </list-detail-info>
        <footer class="card-footer actions">
          <router-link class="card-footer-item button is-white" :to="`/house/${singleListingData._id}`">View Detail</router-link>
        </footer>
      </div>
    </div>
  </div>
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
  props: ['singleListingData'],
  components: {
    'list-gallery': Gallery,
    'list-basic-info': BasicInfo,
    'list-detail-info': DetailInfo,
    Slider,
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    like() {
      return this.favorite.createdAt !== undefined;
    },
  },
  data() {
    return {
      cardSelected: false,
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
      this.cardSelected = !this.cardSelected;
      if (this.cardSelected) {
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
