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
        <div class="map">
          <StaticMap :house="currentHouse"></StaticMap>
        </div>
        <mortgage-calculator
          class="mt-4"
          :price="parseFloat(currentHouse.price)"
          :hoa="parseFloat(currentHouse.hoa.fee || '0')">
        </mortgage-calculator>
        
      </v-flex>
      <v-flex md5 class="hidden-xs-only">
      </v-flex>
    </v-layout>
  </v-container>

  <div class="header">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item is-tab is-active" href="#overview">Overview</a>
          <a class="nav-item is-tab" href="#feature">Feature</a>
          <a class="nav-item is-tab" href="#map">Map</a>
          <a class="nav-item is-tab" href="#calculator">Mortgage Calculator</a>
          <a class="nav-item is-tab" href="#detail">Property Detail</a>
        </div>
      </div>
    </nav>
  </div>
  <div class="section columns is-paddingless">
    <div class="column is-7 is-offset-1">

      <div class="section is-paddingless">
        <!-- title, pictures and description -->
        <div class="overview section">
          <A NAME=overview></A>
        </div>

        <!-- property features -->
        <div class="section">
          <A NAME=feature></A>
        </div>

        <!-- map -->
        <div class="section">
          <A NAME=map></A>
        </div>

        <!-- mortgage calculator -->
        <div class="section">
          <A NAME=calculator></A>
        </div>

        <div class="section">
          <A NAME=detail></A>
          <div class="box">
            <InteriorDetail :interior="interior" v-if="interior"></InteriorDetail>
            <hr />
            <ExteriorDetail :exterior="exterior" v-if="exterior"></ExteriorDetail>
            <hr />
            <SchoolNeighborhood
              :schoolAndNeighborhood="schoolAndNeighborhood"
              v-if="schoolAndNeighborhood">
            </SchoolNeighborhood>
            <hr />
            <Assessment :assessment="assessment" v-if="assessment"></Assessment>
            <hr />
            <PropertyAndLot :propertyAndLot="propertyAndLot" v-if="propertyAndLot"></PropertyAndLot>
          </div>
          <pre>{{currentHouse.feature}}</pre>
        </div>
      </div>
    </div>
  </div>
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
