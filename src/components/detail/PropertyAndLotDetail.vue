<template>
  <div>
    <p class="title">Property And Lot</p>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <div v-if="lot.lotFeatures && lot.lotFeatures.length > 0">
          <p class="subheading">Features</p>
          <DetailItemList :item="property.lotFeatures"></DetailItemList>
        </div>
        <p class="subheading">Basic Info</p>
        <ul>
          <li v-if="lot.lotSizeUnits">Unit: {{lot.lotSizeUnits}}</li>
          <li v-if="lot.lotSizeArea">Size: {{lot.lotSizeArea}}</li>
          <li v-if="lot.lotSizeDimensions">Dimension: {{lot.lotSizeDimensions}}</li>
          <li v-if="lot.lotSizeSource">Source: {{lot.lotSizeSource}}</li>
          <li v-if="lot.elevation">Elevation: {{lot.elevation}}</li>
        </ul>
      </v-flex>

      <v-flex xs12 md6 lg4 v-if="property">
        <v-subheader>Property Information</v-subheader>
        <div v-if="property.propertyCondition">
          <p class="subheading">Condition</p>
          <DetailItemList :item="property.propertyCondition"></DetailItemList>
        </div>
        <div v-if="property.commonWalls">
          <p class="subheading">Common Walls</p>
          <DetailItemList :item="property.commonWalls"></DetailItemList>
        </div>
        <div v-if="property.view">
          <p class="subheading">View</p>
          <DetailItemList :item="property.view"></DetailItemList>
        </div>
        <div v-if="property.fencing">
          <p class="subheading">Fencing</p>
          <DetailItemList :item="property.fencing"></DetailItemList>
        </div>
        <div v-if="property.directions">
          <p class="subheading">Directions</p>
          <DetailItemList :item="property.directions"></DetailItemList>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<style scoped>
</style>
<script>
import DetailItemList from './DetailItemList.vue';

export default {
  name: 'PropertyAndLot',
  props: ['propertyAndLot'],
  components: { DetailItemList },
  computed: {
    lot() { return this.propertyAndLot.lot; },
    property() { return this.propertyAndLot.property; },
  },
};
</script>
