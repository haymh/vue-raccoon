<template>
<div>
  <div class="columns">
    <div class="column is-half">
      <div class="columns is-multiline is-mobile">
        <div class="column is-2">
          <label class="label">Price:</label>
        </div>
        <div class="column is-4">
          <span class="select">
          <select v-model="schema.conditions.price.min" @change="changeFilter('price', true, 'min')">
            <option
              v-for="item in schema.conditions.price.minChoices"
              :label="item"
              :value="item">
            </option>
          </select>
        </span>
        </div>
        <div class="column is-2">
          <div class="text">to</div>
        </div>
        <div class="column is-4">
          <span class="select">
          <select v-model="schema.conditions.price.max" @change="changeFilter('price', true, 'max')">
            <option
              v-for="item in schema.conditions.price.maxChoices"
              :label="item"
              :value="item">
            </option>
          </select>
        </span>
        </div>
        <div class="column is-2">
          <div class="text">Bed:</div>
        </div>
        <div class="column is-4">
          <span class="select">
          <select v-model="schema.conditions.bed.min" @change="changeFilter('bed', true, 'min')">
            <option
              v-for="item in schema.conditions.bed.minChoices"
              :label="item"
              :value="item">
            </option>
          </select>
        </span>
        </div>
        <div class="column is-2">
          <div class="text">to</div>
        </div>
        <div class="column is-4">
          <span class="select">
          <select v-model="schema.conditions.bed.max" @change="changeFilter('bed', true, 'max')">
            <option
              v-for="item in schema.conditions.bed.maxChoices"
              :label="item"
              :value="item">
            </option>
          </select>
        </span>
        </div>
        <div class="column is-2">
          <div class="text">Bath:</div>
        </div>
        <div class="column is-4">
          <span class="select">
          <select v-model="schema.conditions.bath.min" @change="changeFilter('bath', false)">
            <option
              v-for="item in schema.conditions.bath.minChoices"
              :label="item+'+'"
              :value="item">
            </option>
          </select>
        </span>
        </div>
      </div>
    </div>
    <div class="column is-half">
      <div class="columns is-multiline is-mobile">
        <div class="column is-4">
          <div class="text">Property Types:</div>
        </div>
        <div class="column is-8">
          <div v-for="choice in schema.conditions.propertyType.choices">
            <input type="checkbox" v-model="choice.checked" @change="changeFilter('propertyType', false)">{{ choice.value }}</input>
          </div>
        </div>
        <div class="column is-4">
          <div class="text">Listing Types:</div>
        </div>
        <div class="column is-8">
          <div v-for="choice in schema.conditions.listingType.choices">
            <input type="checkbox" v-model="choice.checked"  @change="changeFilter('listingType', false)">{{ choice.value }}</input>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
<style>
.text {
  display: inline-block;
  vertical-align: middle;
  align: center;
}
</style>
<script>
import { mapGetters } from 'vuex';
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
  computed: mapGetters([
    'lastFilter',
  ]),
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
    changeFilter(key, needValidation, changed) {
      if (needValidation) {
        this.validateMinMax(key, changed);
      }
      const oldConditionIndex = this.lastFilter.findIndex(condition => condition.key === key);
      const newCondition = filterSchema.cleanCopyCondition(this.schema.conditions[key]);
      const oldCondition = filterSchema.cleanCopyCondition(this.lastFilter[oldConditionIndex]);
      if (oldCondition === undefined) {
        // the condition is new
        if (!filterSchema.shouldRemoveCondition(newCondition)) {
          // fire filter event with deltaFilter
          this.$store.dispatch('filterHouses',
            {
              filter: [newCondition],
              isDelta: true,
            }
          );
        }
      } else {
        if (filterSchema.shouldRemoveCondition(newCondition)) {
          // removing this condition
          const newConditions = [...this.lastFilter];
          newConditions.splice(oldConditionIndex, 1);
          // fire filter event with completed filter
          this.$store.dispatch('filterHouses',
            {
              filter: newConditions,
              isDelta: false,
            }
          );
        } else {
          // calculate if new filter result will be subset of last filter result
          if (filterSchema.isNewResultSubset(oldCondition, newCondition)) {
            // fire filter event with delta filter
            this.$store.dispatch('filterHouses',
              {
                filter: [newCondition],
                isDelta: true,
              }
            );
          } else {
            const newConditions = [...this.lastFilter];
            // update conditions
            newConditions[oldConditionIndex] = newCondition;
            this.$store.dispatch('filterHouses',
              {
                filter: newConditions,
                isDelta: false,
              }
            );
          }
        }
      }
      console.log('conditions', this.lastFilter);
    },
  },
};
</script>
