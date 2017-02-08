<template>
  <div>
    <div class="level">
      <div class="level-left">
        <p class="title is-4">Assessment</p>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-6" v-if="assessment.assessments && assessment.hasAssessments === '1'">
        <ul>
          <li v-for="item in assessment.assessments">{{item}}</li>
        </ul>
      </div>
    </div>
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
