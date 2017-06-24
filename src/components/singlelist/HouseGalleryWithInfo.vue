<template>
<carousel-3d :perspective="180" :controls-visible="true" :display="1" border="0">
  <slide v-for="(url, index) in house.pics" :index="index" :key="index">
    <img v-lazy="url" @click="clickHandler">
    <div class="basic-info">
      <div class="price ml-2">{{price}}</div>
      <div class="value-label ml-2">{{beds}}</div>
      <div class="value-label">{{baths}}</div>
      <div class="value-label">{{sizeInSF}}</div>
      <div class="address ml-2">{{address}}</div>
    </div>
  </slide>
</carousel-3d>
</template>

<style scoped>
.address {
  padding-left: 3px;
  color: white;
}
.basic-info {
  display: inline-block;
  width: 100%;
  padding: 5px;
  z-index: 1;
  position: absolute;
  bottom: 0px;
  background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */
}
.basic-info .price {
  font-size: 30px;
  color: white;
}
.basic-info .value-label {
  font-size: 17px;
  display: inline-block;
  border-right: solid white;
  border-right-width: 1px;
  color: white;
  padding-left: 3px;
  padding-right: 3px;
}
</style>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'HouseGalleryWithInfo',
  props: [
    'house',
    'clickHandler',
  ],
  components: {
    Carousel3d,
    Slide,
  },
  computed: {
    price() {
      return this.$options.filters.formatNumber(this.house.price, 0, '$');
    },
    beds() {
      return `${this.house.beds} Beds`;
    },
    baths() {
      return `${this.house.baths} Baths`;
    },
    sizeInSF() {
      return `${this.$options.filters.formatNumber(this.house.sizeInSF, 0, '')} Sq.Ft.`;
    },
    address() {
      if (this.house) {
        const addr = this.house.address;
        return `${addr.streetNumberNumeric || ''} ${addr.streetName || ''} ${addr.streetSuffix || ''}, ${addr.city || ''},
          ${addr.stateOrProvince || ''}, ${addr.postalCode || ''}`;
      }
      return '';
    },
  },
};
</script>
