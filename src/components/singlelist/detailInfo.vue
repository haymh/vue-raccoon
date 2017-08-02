<template>
  <v-card flat>
    <v-card-title>{{viewLike}}</v-card-title>
    <v-container fluid grid-list-lg class="pb-0">
      <v-layout row>
        <v-flex xs6 class="pa-0">
          <p>$/Sq. Ft.: <b>{{listingData.unitPriceInSF | formatNumber(2, '$')}}</b></p>
          <p>Year Built: <b>{{listingData.built | formatDate}}</b></p>
          <p>HOA: <b>{{hoa}}</b></p>
        </v-flex>
        <v-flex xs6 class="pa-0">
          <p>Days Online: <b>{{daysOnline}}</b></p>
          <p>Lot Size: <b>{{lot}}</b></p>
          <p>Status: <b>{{listingData.status}}</b></p>
        </v-flex>
      </v-layout>
    </v-container>
    <!--<v-card-text>
      <v-chip v-for="(tag, i) in listingData.tags" :key="i">{{tag}}</v-chip>
    </v-card-text>-->
    <slot></slot>
  </v-card>
</template>

<style scoped>
.title {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail {
  margin-bottom: 0px;
}
.detail-info-wrapper {
  color: #727272;
  padding: 5px;
}
</style>

<script>
export default {
  name: 'DetailInfo',
  props: ['listingData'],
  created() {
    this.viewLike = this.$options.filters.formatNumber(this.listingData.views, 0, '')
      .concat(' views/')
      .concat(this.$options.filters.formatNumber(this.listingData.likes, 0, ''))
      .concat(' likes');
    if (this.listingData.timestamps.onMarket) {
      this.daysOnline = this.daysFromToday(this.listingData.timestamps.onMarket);
    }
    if (this.listingData.lotSizeInSF) {
      this.lot = this.$options.filters.formatNumber(this.listingData.lotSizeInSF, 0, '');
    } else {
      this.lot = '-';
    }
    if (this.listingData.hoa) {
      this.hoa = this.$options.filters.formatNumber(this.listingData.hoa.fee, 0, '$');
    } else {
      this.hoa = 'None';
    }
  },
  data() {
    return {
      daysOnMarket: '-',
    };
  },
  filters: {
    formatDate(date) {
      if (typeof date === 'string' || typeof date === 'number') {
        const d = new Date(date);
        return d.toLocaleDateString();
      }
      return null;
    },
    sqftToAcre(sqft) {
      return (sqft / 43560).toFixed(1);
    },
  },
  methods: {
    daysFromToday(dateStr) {
      this.d = new Date(dateStr);
      this.today = new Date();
      return parseInt((this.today - this.d) / (24 * 3600 * 1000), 10);
    },
    tagStyle(tagStr) {
      if (tagStr === 'Newly Constructed') {
        return 'is-success';
      } else if (tagStr === 'Open House') {
        return 'is-danger';
      } else if (tagStr === 'School') {
        return 'is-info';
      }
      return '';
    },
  },
};
</script>
