<template>
  <div>
    <el-select v-model="schema.conditions.price.min" @change="validateMinMax('price', 'min')">
      <el-option
        v-for="item in schema.conditions.price.minChoices"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-select v-model="schema.conditions.price.max" @change="validateMinMax('price', 'max')">
      <el-option
        v-for="item in schema.conditions.price.maxChoices"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>
<script>
import * as filterSchema from './filter-schema';

export default {
  name: 'Filter-element',
  data() {
    return {
      schema: filterSchema.schema,
    };
  },
  watch: {
  },
  computed: {
  },
  methods: {
    validateMinMax(key, changed) {
      const min = this.schema.conditions[key].min;
      const max = this.schema.conditions[key].max;
      if (changed === 'min') {
        if (max !== filterSchema.NO_MAX && min !== filterSchema.NO_MIN) {
          this.schema.conditions[key].max = min > max ? min : max;
        }
      } else if (changed === 'max') {
        if (max !== filterSchema.NO_MAX && min !== filterSchema.NO_MIN) {
          this.schema.conditions[key].min = max < min ? max : min;
        }
      }
    },
  },
};
</script>
