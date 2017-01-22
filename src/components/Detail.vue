<template>
<div>
  <div class="section">
    <div class="container">
      <rac-summary :propertyDetail="currentHouse"></rac-summary>
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
        </div>
      </div>
    </nav>
  </div>
  <div class="section columns is-paddingless">
    <div class="column is-7 is-offset-1">

      <div class="section is-paddingless">
        <!-- title, pictures and description -->
        <div class="overview section">
          <!-- <A NAME=overview></A> -->
          <div class="header">
            <section class="hero">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">
                    {{currentHouse.title}}
                  </h1>
                  <h2 class="subtitle">
                    {{currentHouse.views}} views / {{currentHouse.likes}} likes
                  </h2>
                </div>
              </div>
            </section>
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
                <p class="heading">Price</p>
                <p class="title">{{currentHouse.price}}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">Propery Type</p>
                <p class="title">{{currentHouse.propertyType}}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">Stories</p>
                <p class="title">{{currentHouse.stories}}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">Built</p>
                <p class="title">{{currentHouse.built | formatDate('MMMM YYYY')}}</p>
              </div>
            </div>
            <div class="level">
              <div class="level-item has-text-centered">
                <p class="heading">HOA Dues</p>
                <p class="title">{{currentHouse.hoa.fee}}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">Community</p>
                <p class="title">{{currentHouse.address.city}}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">County</p>
                <p class="title">{{currentHouse.address.county}}</p>
              </div>
              <div class="level-item has-text-centered">
                <p class="heading">MLS #</p>
                <p class="title">{{currentHouse.mlsNumber}}</p>
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
        <!-- <pre>{{ [currentHouse] }}</pre> -->
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
import API from '../api';
import { defaultHouse } from '../api/house';

export default {
  name: 'Detail',
  data() {
    return {
      currentHouse: defaultHouse,
    };
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
    'rac-summary': Summary,
    StaticMap,
  },
};
</script>
