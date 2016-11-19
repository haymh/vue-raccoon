<template>
<div class="container">
  <div class="section">
    <list-gallery v-bind:listingData="currentHouse"></list-gallery>
  </div>
  <!-- <pre>{{ currentHouse }}</pre> -->
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Gallery from './singlelist/gallery.vue';

export default {
  computed: mapGetters([
    'currentHouse',
  ]),
  watch: {
    '$route'() {
      this.$store.dispatch('findHouseById', { id: this.$route.params.id });
    },
  },
  components: {
    'list-gallery': Gallery,
  },
  created() {
    this.$store.dispatch('findHouseById', { id: this.$route.params.id });
  },
};
</script>
