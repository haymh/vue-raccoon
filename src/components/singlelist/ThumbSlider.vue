<style scoped>
  .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%;
    width: 100%;
  }
  .gallery-top .swiper-slide img {
    width: 100%;
    height: auto;
  }
  .gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
  .swiper-button-white {
    background-color: rgba(51,101,138, 0.2);
  }
</style>

<template>
  <div style="height:500px;max-width:750px;margin: auto">
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
      <swiper-slide v-for="url in images" :key="index">
        <img v-lazy="url"/>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide v-for="url in images" :key="index">
        <img v-lazy="url"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'ThumbSlider',
  props: ['images'],
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOptionTop: {
        notNextTick: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
        centeredSlides: true,
        lazyLoading: true,
        preloadImages: false,
        mousewheelControl: true,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
      },
      swiperOptionThumbs: {
        notNextTick: true,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },
  computed: {
    swiperTop() {
      return this.$refs.swiperTop.swiper;
    },
    swiperThumbs() {
      return this.$refs.swiperThumbs.swiper;
    },
  },
  mounted() {
    // TODO: fix this, params not found
    this.swiperTop.params.control = this.swiperThumbs;
    this.swiperThumbs.params.control = this.swiperTop;
  },
  methods: {
    backgroundImage(url) {
      return {
        'background-image': `url(${url})`,
      };
    },
  },
};
</script>
