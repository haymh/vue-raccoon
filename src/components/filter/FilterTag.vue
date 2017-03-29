<template>
  <span class="tag is-primary">
    {{tagText}}
    <button class="delete is-small"></button>
  </span>
</template>
<script>
import { BETWEEN, LESS, GREATER, ONEOF, NO_MIN, NO_MAX } from './filter-schema';

export default {
  props: ['filterCondition'],
  computed: {
    tagText() {
      let noMin = true;
      let noMax = true;
      switch (this.filterCondition.type) {
        case BETWEEN:
          noMin = this.filterCondition.min === NO_MIN;
          noMax = this.filterCondition.max === NO_MAX;
          break;
        case LESS:
          noMax = this.filterCondition.max === NO_MAX;
          break;
        case GREATER:
          noMin = this.filterCondition.min === NO_MIN;
          break;
        case ONEOF:
        default:
          return '';
      }
      let res = '';
      const name = this.$t(`filter.${this.filterCondition.name}`);
      if (!noMin) {
        res = `${this.filterCondition.min} < ${name}`;
      }
      if (!noMax) {
        res = `${res} < ${this.filterCondition.max}`;
      }
      return res;
    },
    // methods: {
    //   formatChoice: this.$options.filters.formatChoice,
    // },
  },
};
</script>
