<template>
      <div class="columns has-text-centered">
        <div class="column is-3">
          <p class="subtitle is-5">
            <!-- <strong>{{propertyDetail.address.address1}}</strong><br> -->
            {{propertyDetail.address | formatAddress}}
          </p>
        </div>
        <div class="column is-6">
          <div class="has-right-border">
            <p class="title is-4 is-marginless">{{propertyDetail.price | formatNumber(0, '$')}}</p>
            <p class="heading">Price</p>
          </div>
          <div class="has-right-border">
            <p class="title is-4 is-marginless">{{propertyDetail.beds}}</p>
            <p class="heading">beds</p>
          </div>
          <div class="has-right-border">
            <p class="title is-4 is-marginless">{{propertyDetail.baths}}</p>
            <p class="heading">baths</p>
          </div>
          <div style="display: inline-block;">
            <p class="title is-4 is-marginless">{{propertyDetail.sizeInSF | formatNumber(2, '$')}} <i class="subtitle is-6">Sq. Ft.</i></p>
            <p class="title is-6">{{propertyDetail.unitPriceInSF | formatNumber(2, '$')}} / <i>Sq. Ft.</i></p>
          </div>
        </div>
        <div class="column is-3">
          <p class="control has-addons">
            <a class="button">
              <span>favorite</span>
              <span class="icon">
                <i class="fa fa-heart"></i>
              </span>
            </a>
            <a class="button">
              <span>share</span>
              <span class="icon">
                <i class="fa fa-share"></i>
              </span>
            </a>
          </p>
        </div>
      </div>
</template>
<style scoped>
.has-right-border{
  display: inline-block;
  border-right: solid #BBBBBB;
  border-right-width: 1px;
  padding-left: 3px;
  padding-right: 3px;
}
</style>
<script>
export default {
  name: 'Summary',
  props: ['propertyDetail'],
  filters: {
    formatAddress(address) {
      return `${address.city}, ${address.state} ${address.zip}`;
    },
  },
};
</script>
