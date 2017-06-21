<template>
  <div>
    <p class="title">Interior Features</p>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 v-if="bath">
        <v-subheader>
          Bathroom Information
        </v-subheader>
        <ul>
          <li v-show="bath.bathroomsFull">Full Bath: {{bath.bathroomsFull}}</li>
          <li v-show="bath.bathroomsThreeQuarter">3/4 Bath: {{bath.bathroomsFull}}</li>
          <li v-show="bath.bathroomsHalf">Half Bath: {{bath.bathroomsFull}}</li>
          <li v-show="bath.bathroomsOneQuarter">1/4 Bath: {{bath.bathroomsFull}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="laundry && laundry.laundryFeatures">
        <v-subheader>
          Laundry Information
        </v-subheader>
        <ul>
          <li v-for="item in laundry.laundryFeatures">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="cooling && cooling.coolingType">
        <v-subheader>
          Cooling Information
        </v-subheader>
        <ul>
          <li v-for="item in cooling.coolingType">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="heating && heating.heatingType">
        <v-subheader>
          Heating Information
        </v-subheader>
        <ul>
          <li v-for="item in heating.heatingType">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="roomInfo">
        <v-subheader>
          Room Information
        </v-subheader>
        <ul>
          <li v-for="item in roomInfo">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="fireplace && fireplace.fireplaceFeatures">
        <v-subheader>
          Fireplace Information
        </v-subheader>
        <ul>
          <li v-for="item in fireplace.fireplaceFeatures">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="appliances && appliances.appliancesType">
        <v-subheader>
          Appliances Information
        </v-subheader>
        <ul>
          <li v-for="item in appliances.appliancesType">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="interiorFeatures">
        <v-subheader>
          Interior Information
        </v-subheader>
        <ul>
          <li v-for="item in interiorFeatures">{{item}}</li>
        </ul>
      </v-flex>
      <v-flex xs12 md6 lg4 v-if="other && other.flooring">
        <v-subheader>
          Other Information
        </v-subheader>
        <ul>
          <li class="heading" v-if="other.flooring">Flooring</li>
          <li v-for="item in other.flooring">{{item}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'InteriorDetail',
  props: ['interior'],
  computed: {
    bath() { return this.interior.bath; },
    cooling() { return this.interior.cooling; },
    roomInfo() { return this.interior.roomType; },
    fireplace() { return this.interior.fireplace; },
    heating() { return this.interior.heating; },
    appliances() { return this.interior.appliances; },
    laundry() { return this.interior.laundry; },
    interiorFeatures() { return this.interior.interiorFeatures; },
    other() { return this.interior.other; },
  },
};
</script>
