<template>
<div class="container">
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a class="nav-item is-tab is-active" href="#overview">Overview</a>
        <a class="nav-item is-tab" href="#feature">Feature</a>
        <a class="nav-item is-tab" href="#calculator">Mortgage Calculator</a>
        <a class="nav-item is-tab" href="#map">Map</a>
        <a class="nav-item is-tab">Message</a>
      </div>
    </div>
  </nav>
  <!-- title, pictures and description -->
  <div class="section">
    <A NAME=overview></A>
    <div class="heading">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{currentHouse.title}}
            </h1>
            <h2 class="subtitle">
              {{currentHouse.views}} views / {{currentHouse.visits}} visits
            </h2>
          </div>
        </div>
      </section>
    </div>
    <div class="body">
      <thumb-slider v-if="currentHouse" :images="currentHouse.pics"></thumb-slider>
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
    <div class="body">
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
          <p class="title">{{currentHouse.floors}}</p>
        </div>
        <div class="level-item has-text-centered">
          <p class="heading">Built</p>
          <p class="title">{{currentHouse.built}}</p>
        </div>
      </div>
      <div class="level">
        <div class="level-item has-text-centered">
          <p class="heading">HOA Dues</p>
          <p class="title">{{currentHouse.hoa}}</p>
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
          <p class="title">{{currentHouse.APN}}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- map -->
  <!-- <div class="section">
    <div class="body">
      <RaccoonMap class='map' :houses="[currentHouse]"></RaccoonMap>
    </div>
  </div> -->

  <!-- mortgage calculator -->
  <div class="section">
    <A NAME=calculator></A>
    <div class="body">
      <mortgage-calculator :price="currentHouse.price" :hoa="currentHouse.hoa"></mortgage-calculator>
    </div>
  </div>
  <!-- <pre>{{ [currentHouse] }}</pre> -->
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import ThumbSlider from './singlelist/ThumbSlider.vue';
import Map from './map/Map.vue';
import MortgageCalculator from './mortgage_calculator/MortgageCalculator.vue';

export default {
  computed: mapGetters([
    'currentHouse',
  ]),
  watch: {
    '$route'() {
      this.$store.dispatch('findHouseById', { id: this.$route.params.id });
    },
  },
  components: {
    'thumb-slider': ThumbSlider,
    'mortgage-calculator': MortgageCalculator,
    RaccoonMap: Map,
  },
  created() {
    this.$store.dispatch('findHouseById', { id: this.$route.params.id });
  },
};
</script>
