<template>
<div class="columns">
  <div class="column is-4">
    <pre v-show="shareObject.byFilter">
      Filter: {{lastFilter}}
    </pre>
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

export default {
  name: 'ShareSummary',
  props: {
    shareObject: Object,
  },
  computed: {
    ...mapGetters([
      'selectedHouses',
      'lastFilter',
      'selectedCustomers',
    ]),
  },
};
</script>
