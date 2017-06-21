<template>
  <div>
    <p class="title">Assessment</p>
    <v-layout row wrap>
      <v-flex xs12 md6 lg4 v-if="assessment.assessments && assessment.hasAssessments === '1'">
        <ul>
          <li v-for="item in assessment.assessments">{{item}}</li>
        </ul>
      </v-flex>
    </v-layout>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: 'Assessment',
  props: ['assessment'],
};
</script>
