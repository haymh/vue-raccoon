<style scoped>
  .swiper-container {
    width: 100%;
    background-color: #000;
  }
  /*.swiper-slide {
    background-size: cover;
    background-position: center;
  }*/
  .gallery-top {
    height:250px;
    width: 100%;
  }
  .gallery-top .swiper-slide {
    width:100%;
  }
  .gallery-top .swiper-slide img {
    object-fit: cover;
    width: 325px;
    height: 100%;
    display: inline-block;
    margin: 0;
  }
  @media (max-width: 979px) {
   .gallery-top .swiper-slide img {
      width: 380px;
    }
  }
</style>

<template>
  <div class="swiper-container">
    <swiper class="gallery-top" :options="swiperOptionTop">
      <swiper-slide v-for="url in images" :key="index">
        <img v-lazy="url" @click="clickHandler" />
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import BasicInfo from './basicInfo.vue';

export default {
  name: 'Slider',
  props: ['images', 'clickHandler'],
  data() {
    return {
      swiperOptionTop: {
        // name: 'swiperTop',
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        // // spaceBetween: 12,
        // centeredSlides: true,
        // lazyLoading: true,
        // mousewheelControl: true,
        // // loop: true,
        // effect: 'coverflow',
        // slidesPerView: 'auto',
        // coverflow: {
        //   rotate: 50,
        //   stretch: 0,
        //   depth: 100,
        //   modifier: 1,
        //   slideShadows: true,
        // },
        notNextTick: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 5,
        loop: true,
        centeredSlides: true,
        lazyLoading: true,
        preloadImages: false,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
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
    swiper,
    swiperSlide,
  },
};
</script>
