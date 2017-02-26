<template>
<div class="columns">
  <div class="column is-4">
    <pre v-show="shareObject.shareByFilter()">
      {{shareObject.houses.filter}}
    </pre>
    <a v-show="!shareObject.shareByFilter()">{{shareObject.houses.list.length}} houses</a>
  </div>
  <div class="column is-4">
    <pre>
      {{shareObject.shareSchedule}}
    </pre>
  </div>
  <div class="column is-4">
    <a>{{shareObject.customers.length}} customers</a>
  </div>
</div>
</template>
<script>

export default {
  name: 'ShareSummary',
  props: {
    shareObject: Object,
  },
};
</script>
