<template>
  <router-link :to="`/articleView/${this.singleArticleListingData.storageName}`">
    <v-list-tile avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ singleArticleListingData.name }}</v-list-tile-title>
        <v-list-tile-sub-title class="grey--text text--darken-4">
          Created On: {{ singleArticleListingData.createdAt | formatDate('MMM Do YY')}}
        </v-list-tile-sub-title>
        <v-list-tile-sub-title>
          <div>
            <v-chip small label outline class="red red--text" v-for="item in singleArticleListingData.categories" :key="item.name">{{item.name}}</v-chip>
          </div>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
  </router-link>
</template>
<script>
export default {
  props: {
    singleArticleListingData: Object,
  },
  created() {
    console.log('singlelist data', this.singleArticleListingData);
  },
};
</script>
<style>
</style>
