<template>
  <swiper :options="options">
    <swiper-slide v-for="(url, index) in images" :key="index">
      <img v-lazy="`${baseImageTransformURL}/${url}`" />
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css';
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
      },
      baseImageTransformURL: 'http://res.cloudinary.com/raccoon-test/image/fetch/w_450,h_250,c_fill,g_auto,f_auto',
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
    background: white;
    height: 100%;
  }
   .swiper-slide img {
    width: auto;
     height: 100%; 
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