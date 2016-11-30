<style scoped>
  .swiper-container {
    width: 100%;
    background-color: #000;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    /*height: 300px;*/
  }
  .gallery-top {
    width: 100%;
  }
  .basic-info {
    position: absolute;
    width: 100%;
    bottom: 0px;
  }
</style>

<template>
  <div>
    <swiper :options="swiperOptionTop">
      <swiper-slide v-for="url in listingData.pics">
        <list-basic-info class="basic-info" v-bind:listingData="listingData"></list-basic-info>
        <img :data-src="url" class="swiper-lazy" @click="clickHandler">
        <!-- <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div> -->
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
  </div>
</template>
<script>
import BasicInfo from './basicInfo.vue';

export default {
  name: 'Slider',
  props: ['listingData', 'clickHandler'],
  data() {
    return {
      swiperOptionTop: {
        name: 'swiperTop',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // spaceBetween: 12,
        centeredSlides: true,
        lazyLoading: true,
        mousewheelControl: true,
        // loop: true,
        effect: 'coverflow',
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
    };
  },
  methods: {
    backgroundImage(url) {
      return {
        'background-image': `url(${url})`,
      };
    },
  },
  components: {
    'list-basic-info': BasicInfo,
  },
};
</script>
