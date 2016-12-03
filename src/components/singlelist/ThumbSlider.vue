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
</style>

<template>
  <div style="height: 500px">
    <swiper :options="swiperOptionTop" class="gallery-top">
      <swiper-slide v-for="url in images">
        <img :data-src="url" class="swiper-lazy">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs">
      <swiper-slide v-for="url in images" :style="backgroundImage(url)"></swiper-slide>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'ThumbSlider',
    props: ['images'],
    data() {
      return {
        swiperOptionTop: {
          name: 'swiperTop',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,
          centeredSlides: true,
          lazyLoading: true,
          mousewheelControl: true,
        },
        swiperOptionThumbs: {
          name: 'swiperThumbs',
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
        },
      };
    },
    mounted() {
      const swiperTop = this.$children.find(children => children.options.name === 'swiperTop').swiper;
      const swiperThumbs = this.$children.find(children => children.options.name === 'swiperThumbs').swiper;
      swiperTop.params.control = swiperThumbs;
      swiperThumbs.params.control = swiperTop;
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
