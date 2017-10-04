<template>
  <div>
    <v-list-tile avatar>
      <v-list-tile-content>
        <router-link :to="`/articleView/${this.singleArticleListingData.storageName}`">
          <v-list-tile-title>{{ singleArticleListingData.name }}</v-list-tile-title>
          <v-list-tile-sub-title class="grey--text text--darken-4">
            Created On: {{ singleArticleListingData.createdAt | formatDate('MMM Do YY')}}
          </v-list-tile-sub-title>
          <v-list-tile-sub-title>
            <div>
              <v-chip small label outline class="red red--text" v-for="item in singleArticleListingData.categories" :key="item.name">{{item.name}}</v-chip>
            </div>
          </v-list-tile-sub-title>
        </router-link>
      </v-list-tile-content>
      <v-list-tile-action>
        <div>
          <v-btn v-if="!user.isTemp && user.id === singleArticleListingData.userId" icon :to="{ path: `/articleView/${this.singleArticleListingData.storageName}`, query: { edit: true }}">
            <v-icon>edit</v-icon>
          </v-btn>
          <deleteArticle v-if="!user.isTemp && user.id === singleArticleListingData.userId" :articleInfo="singleArticleListingData"></deleteArticle>
        </div>
      </v-list-tile-action>
    </v-list-tile>
    <v-divider></v-divider>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import deleteArticle from './deleteArticle.vue';

export default {
  props: {
    singleArticleListingData: Object,
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  components: {
    deleteArticle,
  },
};
</script>
