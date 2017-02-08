<template>
  <div>
    <div class="level">
      <div class="level-left">
        <p class="title is-4">Exterior Features</p>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-6" v-if="parking && parking.hasParking === '1'">
        <p class="subtitle is-6">
          Parking Information
        </p>
        <ul v-if="parking.parkingFeatures && parking.parkingFeatures.length > 0">
          <li class="heading">Features</li>
          <li v-for="item in parking.parkingFeatures">{{item}}</li>
        </ul>
        <ul>
          <li class="heading">Basic Info</li>
          <li v-if="parking.parkingTotal"># of Parking: {{parking.parkingTotal}}</li>
          <li v-if="parking.hasAttachedGarage === '1'">Garage is attached</li>
          <li v-if="parking.garageSpaces">Garage: {{parking.garageSpaces}}</li>
          <li v-if="parking.RVParkingDimensions">RV Parking: {{parking.RVParkingDimensions}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="homeownerAssociation && homeownerAssociation.hasAssociation === '1'">
        <ul>
          <li v-if="homeownerAssociation.associationFee">{{homeownerAssociation.associationFee}}</li>
          <li v-if="homeownerAssociation.associationFeeFrequency">Frequency: {{homeownerAssociation.associationFeeFrequency}}</li>
          <li v-if="homeownerAssociation.associationFee2">Fee2: {{homeownerAssociation.associationFee}}</li>
          <li v-if="homeownerAssociation.associationFee2Frequency">Frequency2: {{homeownerAssociation.associationFeeFrequency}}</li>
        </ul>
        <ul v-if="homeownerAssociation.associationAmenities">
          <li v-for="item in homeownerAssociation.associationAmenities">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="patio && patio.hasPatio === '1'">
        <p class="subtitle is-6">
          Patio Information
        </p>
        <ul>
          <li v-for="item in patio.patioAndPorchFeatures">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="exteriorFeatures">
        <p class="subtitle is-6">
          Exterior Information
        </p>
        <ul>
          <li v-for="item in exteriorFeatures">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="pool && pool.hasPool === '1'">
        <p class="subtitle is-6">
          Pool Information
        </p>
        <ul>
          <li v-for="item in pool.poolFeatures">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="utilities">
        <p class="subtitle is-6">
          Utilities Information
        </p>
        <ul>
          <li v-for="item in utilities">{{item}}</li>
        </ul>
      </div>
    </div>
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
