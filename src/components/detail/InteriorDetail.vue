<template>
  <div>
    <p class="panel-heading">
      Interior Features
    </p>
    <div class="columns is-multiline">
      <div class="column is-6" v-if="bath">
        <p class="subtitle is-6">
          Bathroom Information
        </p>
        <ul>
          <li v-show="bath.bathroomsFull">Full Bath: {{bath.bathroomsFull}}</li>
          <li v-show="bath.bathroomsThreeQuarter">3/4 Bath: {{bath.bathroomsFull}}</li>
          <li v-show="bath.bathroomsHalf">Half Bath: {{bath.bathroomsFull}}</li>
          <li v-show="bath.bathroomsOneQuarter">1/4 Bath: {{bath.bathroomsFull}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="laundry && laundry.hasLaundry === '1'">
        <p class="subtitle is-6">
          Laundry Information
        </p>
        <ul>
          <li v-for="item in laundry.laundryFeatures">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="cooling && cooling.hasCooling === '1'">
        <p class="subtitle is-6">
          Cooling Information
        </p>
        <ul>
          <li v-for="item in cooling.coolingType">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="heating && cooling.hasHeating === '1'">
        <p class="subtitle is-6">
          Heating Information
        </p>
        <ul>
          <li v-for="item in heating.heatingType">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="roomInfo">
        <p class="subtitle is-6">
          Room Information
        </p>
        <ul>
          <li v-for="item in roomInfo">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="fireplace && fireplace.hasFireplace === '1'">
        <p class="subtitle is-6">
          Fireplace Information
        </p>
        <ul>
          <li v-for="item in fireplace.fireplaceFeatures">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="appliances && appliances.hasAppliances === '1'">
        <p class="subtitle is-6">
          Appliances Information
        </p>
        <ul>
          <li v-for="item in appliances.appliancesType">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="interiorFeatures">
        <p class="subtitle is-6">
          Interior Information
        </p>
        <ul>
          <li v-for="item in interiorFeatures">{{item}}</li>
        </ul>
      </div>
      <div class="column is-6" v-if="other">
        <p class="subtitle is-6">
          Other Information
        </p>
        <ul>
          <li class="heading" v-if="other.flooring">Flooring</li>
          <li v-for="item in other.flooring">{{item}}</li>
        </ul>
      </div>
    </div>
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
