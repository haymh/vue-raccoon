<template>
  <div>
    <p class="panel-heading">
      Assessment
    </p>
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
