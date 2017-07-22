<template>
  <router-link :to="`/articleView/${this.singleArticleListingData.dbName}`">
    <v-list>
      <v-list-tile avatar ripple>
        <v-list-tile-content>
          <v-list-tile-title>{{ singleArticleListingData.name }}</v-list-tile-title>
          <v-list-tile-sub-title class="grey--text text--darken-4">{{ singleArticleListingData.createdAt }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </router-link>
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
