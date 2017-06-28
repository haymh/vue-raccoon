<template>
  <div>
    <div>
      <v-btn flat icon @click.native="toggleSortPanel">
        <v-icon>sort</v-icon>
      </v-btn>
    </div>
    <div class="box elevation-2" v-show="showSortPanel" v-on-clickaway="hide">
      <v-tabs
        id="sort-bar"
        grow
        scroll-bars
        v-model="active"
        light
      >
        <v-tabs-bar slot="activators">
          <v-tabs-item
            :key="1"
            href="sort-bar-az"
            ripple
          >
           A-Z
          </v-tabs-item>
          <v-tabs-item
            key="1"
            href="sort-bar-za"
            ripple
          >
           Z-A
          </v-tabs-item> 
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>

        <v-tabs-content
          key="1"
          id="sort-bar-az"
        >
          <v-list>
            <v-list-item v-for="item in options" :key="item">
              <v-list-tile ripple @click.native="setSort(item)">
                <v-list-tile-content>
                  <v-list-tile-sub-title>{{ item }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon>
                    <v-icon v-show="item === sortBy">done</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-tabs-content>
        
        <v-tabs-content
          key="2"
          id="sort-bar-za"
        >
          <v-list>
            <v-list-item v-for="item in options" :key="item">
              <v-list-tile ripple @click.native="setSort(item)">
                <v-list-tile-content>
                  <v-list-tile-sub-title>{{ item }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon>
                    <v-icon v-show="item === sortBy">done</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-tabs-content>
      </v-tabs>
    </div>
  </div>
  
</template>

<style scoped>
.box {
  background-color: white;
  position: absolute;
  z-index: 4;
}
</style>
<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'SortBar',
  mixins: [clickaway],
  data() {
    return {
      options: [
        'price', 'beds', 'baths', 'lots',
      ],
      sortBy: 'price',
      showSortPanel: false,
      active: 'sort-bar-az',
    };
  },
  computed: {
    lowToHigh() {
      return this.active === 'sort-bar-az';
    },
  },
  watch: {
    lowToHigh: {
      handler() {
        this.setSort(this.sortBy);
      },
    },
  },
  methods: {
    setSort(sortBy) {
      this.sortBy = sortBy;
      this.$store.dispatch('setSort', { key: sortBy, asc: this.lowToHigh });
    },
    toggleSortPanel(event) {
      this.showSortPanel = !this.showSortPanel;
      event.stopPropagation();
    },
    hide() {
      this.showSortPanel = false;
    },
  },
};
</script>
