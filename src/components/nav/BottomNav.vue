<template>
  <v-bottom-nav
    absolute
    value="true"
    class="transparent"
  >
    <v-btn flat dark class="indigo--text" v-for="(n, i) in navs"
      :key="i"
      @click.native="select(i)"
      :value="selected === i">
      <span>{{n.text}}</span>
      <v-icon>{{n.icon}}</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>
<script>

export default {
  name: 'BottomNav',
  data() {
    return {
      selected: 0,
    };
  },
  props: ['navs'],
  methods: {
    select(index) {
      this.selected = index;
      const page = this.navs[index].page;
      this.$router.push(page);
    },
  },
};
</script>
