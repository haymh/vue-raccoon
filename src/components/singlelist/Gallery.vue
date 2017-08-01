<template>
  <swiper :options="options">
    <swiper-slide v-for="(url, index) in images" :key="index">
      <img v-lazy="url" />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
      <!-- <a class="icon is-medium leftArrow" v-on:click="prevImage">
        <i class="fa fa-caret-left" aria-hidden="true"></i>
      </a>
      <a class="icon is-medium rightArrow" v-on:click="nextImage">
        <i class="fa fa-caret-right" aria-hidden="true"></i>
      </a> -->
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Gallery',
  props: ['images'],
  components: { swiper, swiperSlide },
  data() {
    return {
      options: {
        // notNextTick: true, wtf is this
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true,
        // Disable preloading of all images
        preloadImages: false,
        // // Enable lazy loading, useless here
        // lazyLoading: true,
      },
    };
  },
  created() {
    console.log(this.images.length);
  },
  methods: {
  },
};
</script>

<style scoped>
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #444!important;
  }
  .swiper-slide img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  }
</style>