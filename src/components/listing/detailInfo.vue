<template>
  <div class="detail-info-wrapper">
    <header class="card-header">
      <h1 class="title">{{listingData.title}}</h1>
    </header>
    <div class="heading" style="padding-left: 10px">{{viewVisit}}</div>
    <table class="table is-striped detail">
      <tbody>
        <tr>
          <td>$/Sq. Ft.: <b>{{'$'+numberFormat(listingData.sqftPrice)}}</b></td>
          <td>Year Built: <b>{{listingData.yearBuilt}}</b></td>
        </tr>
        <tr>
          <td>Days Online: <b>{{daysOnline}}</b></td>
          <td>Lot Size: <b>{{lot}}</b></td>
        </tr>
        <tr>
          <td>HOA: <b>{{hoa}}</b></td>
          <td>Status: <b>{{listingData.status}}</b></td>
        </tr>
      </tbody>
    </table>
    <div class="level">
      <div class="level-left">
        <div class="level-item" v-for="tag in listingData.tags">
          <a v-bind:class="['button',tagStyle(tag),'is-small','is-outlined']">{{tag}}</a>
        </div>
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
  font-family: serif;
  color: #727272;
  margin: 5px;
}
</style>

<script>
export default {
  name: 'DetailInfo',
  props: ['listingData'],
  created() {
    this.viewVisit = this.numberFormat(this.listingData.views)
                      .concat(' views/')
                      .concat(this.numberFormat(this.listingData.visits))
                      .concat(' visits');
    if (this.listingData.postDate) {
      this.daysOnline = this.daysFromToday(this.listingData.postDate);
    }
    if (this.listingData.lotSize) {
      this.lot = this.numberFormat(this.listingData.lotSize);
    } else {
      this.lot = '-';
    }
    if (this.listingData.hoa) {
      this.hoa = ('$').concat(this.numberFormat(this.listingData.hoa));
    } else {
      this.hoa = 'None';
    }
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
        this.number /= 1000;
      }
      this.k = (this.number).toString().concat(this.k);
      return this.k;
    },
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
