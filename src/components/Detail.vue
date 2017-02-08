<template>
<div>
  <div class="section">
    <div class="container">
      <RaccoonSummary :propertyDetail="currentHouse"></RaccoonSummary>
    </div>
  </div>
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
          <div class="header">
            <div class="container">
              <h2 class="subtitle">
                {{currentHouse.views}} views / {{currentHouse.likes}} likes
              </h2>
            </div>
          </div>
          <div class="body">
            <thumb-slider v-if="currentHouse.pics" :images="currentHouse.pics"></thumb-slider>
          </div>
          <footer class="footer">
            <div class="container">
              <div class="content has-text-centered">
                <p>{{currentHouse.description}}</p>
                <p><i class="fa fa-home"></i></p>
              </div>
            </div>
          </footer>
        </div>

        <!-- property features -->
        <div class="section">
          <A NAME=feature></A>
          <div class="container">
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Price</p>
                  <p class="subtitle">{{currentHouse.price | formatNumber(0, '$')}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Propery Type</p>
                  <p class="subtitle">{{currentHouse.propertyType}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Stories</p>
                  <p class="subtitle">{{currentHouse.floors || 1}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Built</p>
                  <p class="subtitle">{{currentHouse.built | formatDate('MMMM YYYY')}}</p>
                </div>
              </div>
            </div>
            <div class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">HOA Dues</p>
                  <p class="subtitle">{{currentHouse.hoa.fee}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Community</p>
                  <p class="subtitle">{{currentHouse.address.city}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">County</p>
                  <p class="subtitle">{{currentHouse.county}}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">MLS #</p>
                  <p class="subtitle">{{currentHouse.mlsNumber}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- map -->
        <div class="section">
          <A NAME=map></A>
          <div class="map">
            <StaticMap :house="currentHouse"></StaticMap>
          </div>
        </div>

        <!-- mortgage calculator -->
        <div class="section">
          <A NAME=calculator></A>
          <div class="body">
            <mortgage-calculator :price="parseFloat(currentHouse.price)" :hoa="parseFloat(currentHouse.hoa.fee || '0')"></mortgage-calculator>
          </div>
        </div>

        <div class="section">
          <A NAME=detail></A>
          <div class="panel">
            <InteriorDetail :interior="interior" v-if="interior"></InteriorDetail>
            <ExteriorDetail :exterior="exterior" v-if="exterior"></ExteriorDetail>
            <SchoolNeighborhood
              :schoolAndNeighborhood="schoolAndNeighborhood"
              v-if="schoolAndNeighborhood">
            </SchoolNeighborhood>
            <Assessment :assessment="assessment" v-if="assessment"></Assessment>
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
import ThumbSlider from './singlelist/ThumbSlider.vue';
import StaticMap from './map/StaticMap.vue';
import MortgageCalculator from './mortgage_calculator/MortgageCalculator.vue';
import Summary from './detail/Summary.vue';
import InteriorDetail from './detail/InteriorDetail.vue';
import ExteriorDetail from './detail/ExteriorDetail.vue';
import SchoolNeighborhood from './detail/SchoolNeighborhoodDetail.vue';
import Assessment from './detail/AssessmentDetail.vue';
import PropertyAndLot from './detail/PropertyAndLotDetail.vue';
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
