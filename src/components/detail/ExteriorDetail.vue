<template>
  <div>
    <p class="title">Exterior Features</p>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 v-if="parking">
        <v-subheader>Parking Information</v-subheader>
        <div v-if="parking.parkingFeatures && parking.parkingFeatures.length > 0">
          <p class="subheading">Features</p>
          <ul>
            <li v-for="item in parking.parkingFeatures">{{item}}</li>
          </ul>
        </div>
        
        <p class="subheading">Basic Info</p>
        <ul>
          <li v-if="parking.parkingTotal"># of Parking: {{parking.parkingTotal}}</li>
          <li v-if="parking.hasAttachedGarage === '1'">Garage is attached</li>
          <li v-if="parking.garageSpaces">Garage: {{parking.garageSpaces}}</li>
          <li v-if="parking.RVParkingDimensions">RV Parking: {{parking.RVParkingDimensions}}</li>
        </ul>
      </v-flex>

      <v-flex xs12 md6 lg4 v-if="homeownerAssociation && homeownerAssociation.hasAssociation === '1'">
        <ul>
          <li v-if="homeownerAssociation.associationFee">{{homeownerAssociation.associationFee}}</li>
          <li v-if="homeownerAssociation.associationFeeFrequency">Frequency: {{homeownerAssociation.associationFeeFrequency}}</li>
          <li v-if="homeownerAssociation.associationFee2">Fee2: {{homeownerAssociation.associationFee}}</li>
          <li v-if="homeownerAssociation.associationFee2Frequency">Frequency2: {{homeownerAssociation.associationFeeFrequency}}</li>
        </ul>
        <ul v-if="homeownerAssociation.associationAmenities">
          <li v-for="item in homeownerAssociation.associationAmenities">{{item}}</li>
        </ul>
      </v-flex>

      <v-flex xs12 md6 lg4 v-if="patio && patio.hasPatio === '1'">
        <v-subheader>
          Patio Information
        </v-subheader>
        <ul>
          <li v-for="item in patio.patioAndPorchFeatures">{{item}}</li>
        </ul>
      </v-flex>

      <v-flex xs12 md6 lg4 v-if="exteriorFeatures">
        <v-subheader>
          Exterior Information
        </v-subheader>
        <ul>
          <li v-for="item in exteriorFeatures">{{item}}</li>
        </ul>
      </v-flex>

      <v-flex xs12 md6 lg4 v-if="pool && pool.hasPool === '1'">
        <v-subheader>
          Pool Information
        </v-subheader>
        <ul>
          <li v-for="item in pool.poolFeatures">{{item}}</li>
        </ul>
      </v-flex>

      <v-flex xs12 md6 lg4 v-if="utilities">
        <v-subheader>
          Utilities Information
        </v-subheader>
        <ul>
          <li v-for="item in utilities">{{item}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'ExteriorDetail',
  props: ['exterior'],
  computed: {
    parking() { return this.exterior.parking; },
    patio() { return this.exterior.patio; },
    exteriorFeatures() { return this.exterior.exteriorFeatures; },
    homeownerAssociation() { return this.exterior.homeownerAssociation; },
    utilities() { return this.exterior.utilities; },
    pool() { return this.exterior.pool; },
  },
};
</script>
