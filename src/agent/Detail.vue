<template>
<div>
  <v-toolbar fixed class="white hidden-sm-and-up">
    <v-btn icon>
      <v-icon class="grey--text text--darken-2">keyboard_arrow_left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn>
      share
      <v-icon>share</v-icon>
    </v-btn>
  </v-toolbar>
  <main></main>
  <v-container>
    <RaccoonSummary :propertyDetail="currentHouse"></RaccoonSummary>
    <v-layout row>
      <v-flex xs12 md7>
        <!-- title, pictures and description -->
        <A NAME=overview></A>
        <p class="title mt-4">
          {{currentHouse.views}} views / {{currentHouse.likes}} likes
        </p>
        <v-carousel height="80px">
          <v-carousel-item
            v-for="(item,i) in currentHouse.pics"
            :key="i"
            :src="item"
          ></v-carousel-item>
        </v-carousel>
        <p>{{currentHouse.description}}</p>
        <p class="text-xs-center"><v-icon>home</v-icon></p>
        <!-- property features -->
        <A NAME=feature></A>
        <v-flex xs12 md12>
          <v-layout row wrap>
            <v-flex xs6 md3>
              <v-subheader>Price</v-subheader>
              <p>{{currentHouse.price | formatNumber(0, '$')}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>Propery Type</v-subheader>
              <p>{{currentHouse.propertyType}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>Stories</v-subheader>
              <p>{{currentHouse.floors || 1}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>Built</v-subheader>
              <p>{{currentHouse.built | formatDate('MMMM YYYY')}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>HOA Dues</v-subheader>
              <p>{{currentHouse.hoa.fee}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>Community</v-subheader>
              <p>{{currentHouse.address.city}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>County</v-subheader>
              <p>{{currentHouse.county}}</p>
            </v-flex>
            <v-flex xs6 md3>
              <v-subheader>MLS #</v-subheader>
              <p>{{currentHouse.mlsNumber}}</p>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- map -->
        <A NAME=map></A>
        <div class="map">
          <StaticMap :house="currentHouse"></StaticMap>
        </div>
        <!-- mortgage calculator -->
        <A NAME=calculator></A>
        <mortgage-calculator
          class="mt-4"
          :price="parseFloat(currentHouse.price)"
          :hoa="parseFloat(currentHouse.hoa.fee || '0')">
        </mortgage-calculator>
        <!-- detail info -->
        <A NAME=detail></A>
        <InteriorDetail class="mt-4" :interior="interior" v-if="interior"></InteriorDetail>
        <v-divider></v-divider>
        <ExteriorDetail class="mt-4" :exterior="exterior" v-if="exterior"></ExteriorDetail>
        <v-divider></v-divider>
        <SchoolNeighborhood
          class="mt-4"
          :schoolAndNeighborhood="schoolAndNeighborhood"
          v-if="schoolAndNeighborhood">
        </SchoolNeighborhood>
        <v-divider></v-divider>
        <Assessment class="mt-4" :assessment="assessment" v-if="assessment"></Assessment>
        <v-divider></v-divider>
        <PropertyAndLot class="mt-4" :propertyAndLot="propertyAndLot" v-if="propertyAndLot"></PropertyAndLot>
        <v-divider></v-divider>
      </v-flex>
      <v-flex md5 class="hidden-xs-only">
        <!--Ads-->
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<style>
.map {
  height: 300px;
  /*width: 600px;*/
}
</style>
<script>
import ThumbSlider from '../components/singlelist/ThumbSlider.vue';
import StaticMap from '../components/map/StaticMap.vue';
import MortgageCalculator from '../components/mortgage_calculator/MortgageCalculator.vue';
import Summary from '../components/detail/Summary.vue';
import InteriorDetail from '../components/detail/InteriorDetail.vue';
import ExteriorDetail from '../components/detail/ExteriorDetail.vue';
import SchoolNeighborhood from '../components/detail/SchoolNeighborhoodDetail.vue';
import Assessment from '../components/detail/AssessmentDetail.vue';
import PropertyAndLot from '../components/detail/PropertyAndLotDetail.vue';
import API from '../api';
import { defaultHouse } from '../api/house';

export default {
  name: 'Detail',
  data() {
    return {
      currentHouse: defaultHouse,
    };
  },
  computed: {
    interior() { return this.currentHouse.feature.interior; },
    exterior() { return this.currentHouse.feature.exterior; },
    schoolAndNeighborhood() { return this.currentHouse.feature.schoolAndNeighborhood; },
    assessment() { return this.currentHouse.feature.assessment; },
    propertyAndLot() { return this.currentHouse.feature.propertyAndLot; },
    other() { return this.currentHouse.feature.other; },
  },
  beforeRouteEnter(to, from, next) {
    API.getHouse(to.params.id).then((h) => {
      console.log(h);

      next((vm) => {
        vm.currentHouse = h;
      });
    }, (error) => {
      next(error);
    });
  },
  watch: {
    $route() {
      this.currentHouse = defaultHouse;
      API.getHouse(this.$route.params.id).then((h) => {
        this.currentHouse = h;
      }, (error) => {
        console.log(error);
      });
    },
  },
  components: {
    'thumb-slider': ThumbSlider,
    'mortgage-calculator': MortgageCalculator,
    RaccoonSummary: Summary,
    StaticMap,
    InteriorDetail,
    ExteriorDetail,
    SchoolNeighborhood,
    Assessment,
    PropertyAndLot,
  },
  methods: {
    notString(s) {
      if (s === undefined || s === '') {
        return false;
      }
      return true;
    },
  },
};
</script>
