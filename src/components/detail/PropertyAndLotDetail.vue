<template>
  <div>
    <p class="title">Property And Lot</p>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4>
        <div v-if="lot.lotFeatures && lot.lotFeatures.length > 0">
          <p class="subheading">Features</p>
          <ul>
            <li v-for="item in lot.lotFeatures">{{item}}</li>
          </ul>
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
          <ul>
            <li v-if="property.propertyCondition" v-for="item in property.propertyCondition">
              {{item}}
            </li>
          </ul>
        </div>
        <div v-if="property.commonWalls">
          <p class="subheading">Common Walls</p>
          <ul>
            <li v-if="property.commonWalls" v-for="item in property.commonWalls">
              {{item}}
            </li>
          </ul>
        </div>
        <div v-if="property.view">
          <p class="subheading">View</p>
          <ul>
            <li v-if="property.view" v-for="item in property.view">{{item}}</li>
          </ul>
        </div>
        <div v-if="property.fencing">
          <p class="subheading">Fencing</p>
          <ul>
            <li v-if="property.fencing" v-for="item in property.fencing">{{item}}</li>
          </ul>
        </div>
        <div v-if="property.directions">
          <p class="subheading">Directions</p>
          <ul>
            <li v-if="property.directions">{{property.directions}}</li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'PropertyAndLot',
  props: ['propertyAndLot'],
  computed: {
    lot() { return this.propertyAndLot.lot; },
    property() { return this.propertyAndLot.property; },
  },
};
</script>
