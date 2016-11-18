<template>
  <div class="basic-info-wrapper">
    <div class="price">{{'$' + numberFormat(listingData.price)}}</div>
    <div class="value-label">{{listingData.beds + ' Beds'}}</div>
    <div class="value-label">{{listingData.baths + ' Baths'}}</div>
    <div class="value-label">{{numberFormat(listingData.sizeInSF) + ' Sq.Ft.'}}</div>
    <div class="address">{{address}}</div>
    </div>
</template>

<style scoped>
.address {
  padding-left: 3px;
  color: white;
}
.basic-info-wrapper {
  display: inline-block;
  font-family: serif;
  padding: 5px;
  background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */
}
.price {
  font-size: 30px;
  color: white;
}
.value-label {
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
export default {
  name: 'BasicInfo',
  props: ['listingData'],
  computed: {
    address() {
      if (this.listingData) {
        return this.listingData.address.address1
                  .concat(' ')
                  .concat(this.listingData.address.address2)
                  .concat(' ')
                  .concat(this.listingData.address.city)
                  .concat(', ')
                  .concat(this.listingData.address.state)
                  .concat(' ')
                  .concat(this.listingData.address.zip);
      }
      return '';
    },
  },
  methods: {
    numberFormat(n) {
      this.k = '';
      this.number = n;
      while (this.number > 1000) {
        this.m = this.number % 1000;
        this.d = '';
        if (this.m === 0) {
          this.d = '000';
        } else {
          this.d = this.m.toString();
        }
        this.k = (',').concat(this.d).concat(this.k);
        this.number = Math.floor(this.number / 1000);
      }
      this.k = (this.number).toString().concat(this.k);
      return this.k;
    },
  },
};
</script>
