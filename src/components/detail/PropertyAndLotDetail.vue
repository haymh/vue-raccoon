<template>
  <div>
    <p class="panel-heading">
      Property And Lot
    </p>
    <div class="columns is-multiline">
      <div class="column is-6" v-if="lot">
        <p class="subtitle is-6">
          Lot Information
        </p>
        <ul v-if="lot.lotFeatures && lot.lotFeatures.length > 0">
          <li class="heading">Features</li>
          <li v-for="item in lot.lotFeatures">{{item}}</li>
        </ul>
        <ul>
          <li class="heading">Basic Info</li>
          <li v-if="lot.lotSizeUnits">Unit: {{lot.lotSizeUnits}}</li>
          <li v-if="lot.lotSizeArea">Size: {{lot.lotSizeArea}}</li>
          <li v-if="lot.lotSizeDimensions">Dimension: {{lot.lotSizeDimensions}}</li>
          <li v-if="lot.lotSizeSource">Source: {{lot.lotSizeSource}}</li>
          <li v-if="lot.elevation">Elevation: {{lot.elevation}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="property">
        <p class="subtitle is-6">
          Property Information
        </p>
        <ul>
          <li class="heading" v-if="property.propertyCondition">Condition</li>
          <li v-if="property.propertyCondition" v-for="item in property.propertyCondition">
            {{item}}
          </li>
          <li class="heading" v-if="property.commonWalls">Common Walls</li>
          <li v-if="property.commonWalls" v-for="item in property.commonWalls">
            {{item}}
          </li>
          <li class="heading" v-if="property.view">View</li>
          <li v-if="property.view" v-for="item in property.view">{{item}}</li>
          <li class="heading" v-if="property.fencing">Fencing</li>
          <li v-if="property.fencing" v-for="item in property.fencing">{{item}}</li>
          <li class="heading" v-if="property.directions">Directions</li>
          <li v-if="property.directions">{{property.directions}}</li>
        </ul>
      </div>
    </div>
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
