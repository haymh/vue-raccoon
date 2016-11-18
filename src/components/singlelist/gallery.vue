<template>
  <div>
    <div class="listing-image" :style="{backgroundImage: 'url(' + listingData.media[index] + ')'}" >
      <div class="arrows">
        <a class="icon is-medium leftArrow" v-on:click="prevImage">
          <i class="fa fa-caret-left" aria-hidden="true"></i>
        </a>
        <a class="icon is-medium rightArrow" v-on:click="nextImage">
          <i class="fa fa-caret-right" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 979px) {
  .rightArrow {
    right: 0px !important;
  }
}
.listing-image{
  background-size: cover;
  min-height: 250px;
}
.arrows {
  color: white;
}
.leftArrow {
  position: absolute;
  left: 0px;
  top: 45%;
  color: white;
}
.rightArrow {
  position: absolute;
  right: 50%;
  top: 45%;
  color: white;
}
</style>

<script>
export default {
  name: 'Gallery',
  props: ['listingData'],
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    nextImage() {
      this.index = (this.index === this.listingData.media.length - 1) ? 0 : this.index += 1;
    },
    prevImage() {
      this.index = (this.index === 0) ?
       this.index = this.listingData.media.length - 1 : this.index -= 1;
    },
  },
};
</script>
