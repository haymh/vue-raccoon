<template>
  <div class="detail-info-wrapper">
    <div class="heading" style="padding-left: 10px">{{viewLike}}</div>
    <table class="detail">
      <tbody>
        <tr>
          <td>$/Sq. Ft.: <b>{{listingData.unitPriceInSF | formatNumber(2, '$')}}</b></td>
          <td>Year Built: <b>{{listingData.built | formatDate}}</b></td>
        </tr>
        <tr>
          <td>Days Online: <b>{{daysOnline}}</b></td>
          <td>Lot Size: <b>{{lot}}</b> Sq.Ft.</td>
        </tr>
        <tr>
          <td>HOA: <b>{{hoa}}</b></td>
          <td>Status: <b>{{listingData.status}}</b></td>
        </tr>
      </tbody>
    </table>
    <div class="level">
      <div class="level-item" v-for="tag in listingData.tags">
        <span class="tag is-info">{{tag}}</span>
      </div>
      <div class="level-right">
        <slot></slot>
      </div>
    </div>
  </div>
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
