<template>
  <div>
    <div class="gallery">
      <img v-for="(imgUrl, index) in images"
        v-show="index === currentIndex"
        v-lazy="imgUrl"
        :alt="index"
        class="listing-image"/>
        <a class="icon is-medium leftArrow" v-on:click="prevImage">
          <i class="fa fa-caret-left" aria-hidden="true"></i>
        </a>
        <a class="icon is-medium rightArrow" v-on:click="nextImage">
          <i class="fa fa-caret-right" aria-hidden="true"></i>
        </a>
    </div>
  </div>
</template>

<style scoped>
.listing-image{
  background-size: cover;
  min-height: 250px;
}
.gallery {
  position: relative;
}
.arrows {
  color: white;
  display: inline-block;
}
.leftArrow {
  position: absolute;;
  top: 45%;
  color: white;
}
.rightArrow {
  position: absolute;
  right: 0px;
  top: 45%;
  color: white;
}
</style>

<script>
export default {
  name: 'Gallery',
  props: ['images'],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex === this.images.length - 1)
      ? 0 : this.currentIndex += 1;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex === 0) ?
       this.currentIndex = this.images.length - 1 : this.currentIndex -= 1;
    },
  },
};
</script>
