<template>
<div>
  <v-layout row wrap class="ml-1">
    <v-flex xs4 lg2>
      <v-select
        v-on:input="changeFilter('price', ['price'], true, 'min')"
        v-bind:items="schema.conditions.price.minChoices"
        v-model="schema.conditions.price.min"
        label="Min Price"
        hide-details	
      >
        <template slot="selection" slot-scope="data">
          <v-list-tile-content :key="data.item">
              {{data.item | formatChoice(true)}}
          </v-list-tile-content>
        </template>
        <template slot="item" slot-scope="data">
          <v-list-tile-content>
              {{data.item | formatChoice(true)}}
          </v-list-tile-content>
        </template>
      </v-select>
    </v-flex>
    <v-flex xs4 lg2>
      <v-select
        v-on:input="changeFilter('price', ['price'], true, 'max')"
        v-bind:items="schema.conditions.price.maxChoices"
        v-model="schema.conditions.price.max"
        label="Max Price"
        hide-details
      >
        <template slot="selection" slot-scope="data">
          <v-list-tile-content :key="data.item">
              {{data.item | formatChoice(true)}}
          </v-list-tile-content>
        </template>
        <template slot="item" slot-scope="data">
          <v-list-tile-content>
              {{data.item | formatChoice(true)}}
          </v-list-tile-content>
        </template>
      </v-select>
    </v-flex>
    <v-flex lg2 class="hidden-md-and-down">
      <v-select
        v-on:input="changeFilter('beds', ['beds'], true, 'min')"
        v-bind:items="schema.conditions.beds.minChoices"
        v-model="schema.conditions.beds.min"
        label="Min Beds"
        hide-details
      >
        <template slot="selection" slot-scope="data">
          <v-list-tile-content :key="data.item">
              {{data.item | formatChoice(false)}}
          </v-list-tile-content>
        </template>
        <template slot="item" slot-scope="data">
          <v-list-tile-content>
              {{data.item | formatChoice(false)}}
          </v-list-tile-content>
        </template>
      </v-select>
    </v-flex>

    <v-flex lg2 class="hidden-md-and-down">
      <v-select
        v-on:input="changeFilter('beds', ['beds'], true, 'max')"
        v-bind:items="schema.conditions.beds.maxChoices"
        v-model="schema.conditions.beds.max"
        label="Max Beds"
        hide-details
      >
        <template slot="selection" slot-scope="data">
          <v-list-tile-content :key="data.item">
              {{data.item | formatChoice(false)}}
          </v-list-tile-content>
        </template>
        <template slot="item" slot-scope="data">
          <v-list-tile-content>
              {{data.item | formatChoice(false)}}
          </v-list-tile-content>
        </template>
      </v-select>
    </v-flex>

    <v-flex xs4 lg2>
      <v-btn flat v-on:click.native="toggleFilterView">
        More
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
  <div v-if="showFilter" class="drop-down elevation-2" v-on-clickaway="hideFilter">
    <v-layout row wrap class="ma-1">
      <v-flex xs6 class="hidden-lg-and-up">
        <v-select
          v-on:input="changeFilter('beds', ['beds'], true, 'min')"
          v-bind:items="schema.conditions.beds.minChoices"
          v-model="schema.conditions.beds.min"
          label="Min Beds"
          hide-details
        >
          <template slot="selection" slot-scope="data">
            <v-list-tile-content :key="data.item">
                {{data.item | formatChoice(false)}}
            </v-list-tile-content>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-content>
                {{data.item | formatChoice(false)}}
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>

      <v-flex xs6 class="hidden-lg-and-up">
        <v-select
          v-on:input="changeFilter('beds', ['beds'], true, 'max')"
          v-bind:items="schema.conditions.beds.maxChoices"
          v-model="schema.conditions.beds.max"
          label="Max Beds"
          hide-details
        >
          <template slot="selection" slot-scope="data">
            <v-list-tile-content :key="data.item">
                {{data.item | formatChoice(false)}}
            </v-list-tile-content>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-content>
                {{data.item | formatChoice(false)}}
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs6>
        <v-select
          v-on:input="changeFilter('baths', ['baths'], false)"
          v-bind:items="schema.conditions.baths.minChoices"
          v-model="schema.conditions.baths.min"
          label="Min Baths"
          hide-details
        >
          <template slot="selection" slot-scope="data">
            <v-list-tile-content :key="data.item">
                {{data.item | formatChoice(false, '', '+')}}
            </v-list-tile-content>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-content>
                {{data.item | formatChoice(false, '', '+')}}
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>

      <v-flex xs6>
        <v-select
          v-on:input="changeFilter('hoa', ['hoa', 'fee'], false)"
          v-bind:items="schema.conditions.hoa.maxChoices"
          v-model="schema.conditions.hoa.max"
          label="Max HOA"
          hide-details
        >
          <template slot="selection" slot-scope="data">
            <v-list-tile-content :key="data.item">
                {{data.item | formatChoice(false, '< ', '$/month')}}
            </v-list-tile-content>
          </template>
          <template slot="item" slot-scope="data">
            <v-list-tile-content>
                {{data.item | formatChoice(false, '< ', '$/month')}}
            </v-list-tile-content>
          </template>
        </v-select>
      </v-flex>

      <v-flex xs6 md6>
        <v-subheader>{{$t('filter.propertyType')}}</v-subheader>
        <v-checkbox v-for="(choice, index) in schema.conditions.propertyType.choices"
          :key="index"
          v-model="choice.checked"
          @input="changeFilter('propertyType', ['propertyType'], false)"
          :label="choice.value"
          hide-details>
        </v-checkbox>
      </v-flex>

      <v-flex xs6 md6>
        <v-subheader>{{$t('filter.status')}}</v-subheader>
        <v-checkbox v-for="(choice, index) in schema.conditions.status.choices"
          :key="index"
          v-model="choice.checked"
          @input="changeFilter('listingType', ['listingType'], false)"
          :label="choice.value"
          hide-details>
        </v-checkbox>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>
<style>
.drop-down {
  background-color: white;
  position: absolute;
  z-index: 3;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import * as filterSchema from './filter-schema';

export default {
  name: 'FilterBar',
  mixins: [clickaway],
  data() {
    return {
      showFilter: false,
      schema: filterSchema.schema,
      BETWEEN: filterSchema.BETWEEN,
      LESS: filterSchema.LESS,
      GREATER: filterSchema.GREATER,
      ONEOF: filterSchema.ONEOF,
    };
  },
  watch: {
  },
  computed: mapGetters([
    'lastFilter',
  ]),
  methods: {
    toggleFilterView() {
      this.showFilter = !this.showFilter;
    },
    hideFilter() {
      this.showFilter = false;
    },
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
