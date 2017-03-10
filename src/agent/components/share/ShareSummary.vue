<template>
<div class="columns">
  <div class="column is-4">
    <div v-for="c in lastFilter">
      <FilterTag :filterCondition="c"></FilterTag>
    </div>
    <a v-show="!shareObject.byFilter">{{selectedHouses.length}} houses</a>
  </div>
  <div class="column is-4">
    <pre>
      {{shareObject}}
    </pre>
  </div>
  <div class="column is-4">
    <a>{{selectedCustomers.length}} customers</a>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { generateQuery } from '../../../components/filter/filter-schema';
import FilterTag from '../../../components/filter/FilterTag.vue';

export default {
  name: 'ShareSummary',
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
    ]),
    query() {
      return generateQuery(this.lastFilter);
    },
  },
};
</script>
