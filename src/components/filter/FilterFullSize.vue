<template>
<div class="box">
  <div class="columns is-multiline is-mobile">
    <div class="column is-6">

      <label class="label">Price:</label>
      <p class="control has-addons">
        <span class="select">
          <select v-model="schema.conditions.price.min" @change="changeFilter('price', ['price'], true, 'min')">
            <option
              v-for="item in schema.conditions.price.minChoices"
              :label="item | formatChoice(true)"
              :value="item">
            </option>
          </select>
        </span>
        <label class="label">to</label>
        <span class="select">
          <select v-model="schema.conditions.price.max" @change="changeFilter('price', ['price'], true, 'max')">
            <option
              v-for="item in schema.conditions.price.maxChoices"
              :label="item | formatChoice(true)"
              :value="item">
            </option>
          </select>
        </span>
      </p>
    </div>

    <div class="column is-6">
      <label class="label">Beds:</label>
      <p class="control has-addons">
        <span class="select">
          <select v-model="schema.conditions.beds.min" @change="changeFilter('beds', ['beds'], true, 'min')">
            <option
              v-for="item in schema.conditions.beds.minChoices"
              :label="item | formatChoice(false)"
              :value="item">
            </option>
          </select>
        </span>
        <label class="label">to</label>
        <span class="select">
            <select v-model="schema.conditions.beds.max" @change="changeFilter('beds', ['beds'], true, 'max')">
              <option
              v-for="item in schema.conditions.beds.maxChoices"
              :label="item | formatChoice(false)"
              :value="item">
            </option>
          </select>
        </span>
      </p>
    </div>

    <div class="column is-6">
      <div class="label">Baths</div>
      <span class="select">
        <select v-model="schema.conditions.baths.min" @change="changeFilter('baths', ['baths'], false)">
          <option
            v-for="item in schema.conditions.baths.minChoices"
            :label="item | formatChoice(false, '', '+')"
            :value="item">
          </option>
        </select>
      </span>
    </div>

    <div class="column is-6">
      <div class="label">Max HOA</div>
      <span class="select">
        <select v-model="schema.conditions.hoa.max" @change="changeFilter('hoa', ['hoa', 'fee'], false)">
          <option
            v-for="item in schema.conditions.hoa.maxChoices"
            :label="item | formatChoice(false, '< ', '$/month')"
            :value="item">
          </option>
        </select>
      </span>
    </div>

    <div class="column is-6">
      <div class="label">Property Types</div>
      <div v-for="choice in schema.conditions.propertyType.choices">
        <input type="checkbox" v-model="choice.checked" @change="changeFilter('propertyType', ['propertyType'], false)">{{ choice.value }}</input>
      </div>
    </div>

    <div class="column is-6">
      <div class="label">Listing Types</div>
      <div v-for="choice in schema.conditions.status.choices">
        <input type="checkbox" v-model="choice.checked"  @change="changeFilter('listingType', ['listingType'], false)">{{ choice.value }}</input>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import * as filterSchema from './filter-schema';

export default {
  name: 'FilterBar',
  data() {
    return {
      schema: filterSchema.schema,
      BETWEEN: filterSchema.BETWEEN,
      LESS: filterSchema.LESS,
      GREATER: filterSchema.GREATER,
      ONEOF: filterSchema.ONEOF,
    };
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
    changeFilter(key, keyPath, needValidation, changed) {
      if (needValidation) {
        this.validateMinMax(key, changed);
      }
      const oldConditionIndex = this.lastFilter.findIndex(condition =>
        JSON.stringify(condition.key) === JSON.stringify(keyPath));
      const newCondition = filterSchema.cleanCopyCondition(this.schema.conditions[key]);
      const oldCondition = filterSchema.cleanCopyCondition(this.lastFilter[oldConditionIndex]);
      console.log(key, this.lastFilter, oldConditionIndex, newCondition);
      if (oldCondition === undefined) {
        // the condition is new
        if (!filterSchema.shouldRemoveCondition(newCondition)) {
          console.log('new, shouldn\'t remove');
          // fire filter event with deltaFilter
          this.$store.dispatch('filterHouses',
            {
              filter: [newCondition],
              isDelta: true,
            });
        }
      } else {
        if (filterSchema.shouldRemoveCondition(newCondition)) {
          console.log('should remove');
          // removing this condition
          const newConditions = [...this.lastFilter];
          newConditions.splice(oldConditionIndex, 1);
          // fire filter event with completed filter
          this.$store.dispatch('filterHouses',
            {
              filter: newConditions,
              isDelta: false,
            });
        } else {
          // calculate if new filter result will be subset of last filter result
          if (filterSchema.isNewResultSubset(oldCondition, newCondition)) {
            console.log('subset');
            // fire filter event with delta filter
            this.$store.dispatch('filterHouses',
              {
                filter: [newCondition],
                isDelta: true,
              });
          } else {
            console.log('not subset');
            const newConditions = [...this.lastFilter];
            // update conditions
            newConditions[oldConditionIndex] = newCondition;
            this.$store.dispatch('filterHouses',
              {
                filter: newConditions,
                isDelta: false,
              });
          }
        }
      }
      console.log('conditions', this.lastFilter);
    },
  },
};
</script>
