<template>
<div>
  <p class="title">School And Neighborhood</p>
  <v-layout row wrap>
    <v-flex xs12 md6 lg4 v-if="elementarySchool">
      <ul>
        <li class="heading" v-if="elementarySchool">Elementary School</li>
        <li v-if="elementarySchool">{{elementarySchool}}</li>
        <li v-if="elementarySchoolExtra">{{elementarySchoolExtra}}</li>
      </ul>
    </v-flex>

    <v-flex xs12 md6 lg4 v-if="middleOrJuniorSchool">
      <ul>
        <li class="heading" v-if="middleOrJuniorSchool">Middle School</li>
        <li v-if="middleOrJuniorSchool">{{middleOrJuniorSchool}}</li>
        <li v-if="middleOrJuniorSchoolExtra">{{middleOrJuniorSchoolExtra}}</li>
      </ul>
    </v-flex>

    <v-flex xs12 md6 lg4 v-if="highSchool || highSchoolDistrict">
      <ul>
        <li class="heading" v-if="highSchool">High School</li>
        <li v-if="highSchool">{{highSchool}}</li>
        <li class="heading" v-if="highSchoolDistrict">High school District</li>
        <li v-if="highSchoolDistrict">{{highSchoolDistrict}}</li>
      </ul>
    </v-flex>
  </v-layout>
</div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'SchoolNeighborhood',
  props: ['schoolAndNeighborhood'],
  computed: {
    elementarySchool() { return this.schoolAndNeighborhood.school.elementarySchool; },
    elementarySchoolExtra() { return this.schoolAndNeighborhood.school.elementarySchoolExtra; },
    highSchool() { return this.schoolAndNeighborhood.school.highSchool; },
    highSchoolDistrict() { return this.schoolAndNeighborhood.school.highSchoolDistrict; },
    middleOrJuniorSchool() { return this.schoolAndNeighborhood.school.middleOrJuniorSchool; },
    middleOrJuniorSchoolExtra() {
      return this.schoolAndNeighborhood.school.middleOrJuniorSchoolExtra;
    },
  },
};
</script>
