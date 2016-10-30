<template>
  <div>
    <RaccoonMap class='map' :houses="allHouses"></RaccoonMap>
    <span>{{ selectedHouse && selectedHouse.address }}</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Map from './map/Map.vue';

  export default {
    name: 'Map-View',
    computed: mapGetters([
      'allHouses',
      'selectedHouse',
    ]),
    data() {
      return {};
    },
    components: {
      RaccoonMap: Map,
    },
    watch: {
      selectedHouse: (val) => {
        console.log('Selected house passed down');
        console.log(val);
      },
    },

    created() {
      this.$store.dispatch('fetchHouses');
    },
  };
</script>
