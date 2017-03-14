<template>
<div class="columns">
  <div class="column is-6">
    <div v-for="c in lastFilter">
      <FilterTag :filterCondition="c"></FilterTag>
    </div>
    <a v-show="!shareObject.byFilter">{{selectedHouses.length}} houses</a>
  </div>
  <div class="column is-6">
    <div class="content" v-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.NOW">
      <p>
        You are going to send <a href="#">{{numberOfHouse}} houses
        <span class="icon"><i class="fa fa-home"></i></span></a>
         to <a href="#">{{selectedCustomers.length}} customers
         <span class="icon"><i class="fa fa-users"></i></span></a> <strong>now</strong>.
      </p>
    </div>
    <div class="content" v-else-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
      <p>
        You are going to send <a href="#">{{numberOfHouse}} houses
        <span class="icon"><i class="fa fa-home"></i></span></a>
         to <a href="#">{{selectedCustomers.length}} customers
         <span class="icon"><i class="fa fa-users"></i></span></a> on <strong>{{shareObject.shareOn}}</strong>
      </p>
    </div>
    <div class="content" v-else-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
      <p>
        You are going to send <a href="#">{{numberOfHouse}} houses
        <span class="icon"><i class="fa fa-home"></i></span></a>
         to <a href="#">{{selectedCustomers.length}} customers
         <span class="icon"><i class="fa fa-users"></i></span></a> <strong>{{frequency}}</strong>
      </p>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { generateQuery } from '../../../components/filter/filter-schema';
import FilterTag from '../../../components/filter/FilterTag.vue';
import { PERIODICAL_OPTIONS, SHARE_SCHEDULE_TYPES } from './shareSchema';

export default {
  name: 'ShareSummary',
  data() {
    return {
      SHARE_SCHEDULE_TYPES,
      PERIODICAL_OPTIONS,
    };
  },
  props: {
    shareObject: Object,
  },
  components: {
    FilterTag,
  },
  computed: {
    ...mapGetters([
      'selectedHouses',
      'lastFilter',
      'selectedCustomers',
      'filterResults',
    ]),
    query() {
      return generateQuery(this.lastFilter);
    },
    numberOfHouse() {
      if (this.shareObject.byFilter) {
        return this.filterResults.length;
      }
      return this.selectedHouses.length;
    },
    frequency() {
      switch (this.shareObject.frequency) {
        case PERIODICAL_OPTIONS.DAILY:
          return 'every day';
        case PERIODICAL_OPTIONS.WEEKLY:
          return 'every week';
        case PERIODICAL_OPTIONS.BI_WEEKLY:
          return 'every two weeks';
        case PERIODICAL_OPTIONS.MONTHILY:
          return 'every month';
        default:
          return '';
      }
    },
  },
};
</script>
