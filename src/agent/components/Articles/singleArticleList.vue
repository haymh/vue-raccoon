<template>
  <div class="box">
    <h4 class="title is-4">
      <router-link :to="`/articleView/${this.singleArticleListingData.fileName}`">{{this.singleArticleListingData.fileName}}</router-link>
    </h4>
  </div>
</template>
<script>
export default {
  props: {
    singleArticleListingData: Object,
  },
};
</script>
<style>
</style>
