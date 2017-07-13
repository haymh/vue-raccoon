<template>
  <v-pagination v-bind:length.number="totalPages" v-bind:value="currentPage" @input="currentChanged"></v-pagination>
</template>
<script>

export default {
  name: 'Pagination',
  model: {
    prop: 'currentPage',
    event: 'input',
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  data() {
    return {};
  },
  methods: {
    currentChanged(val) {
      this.$emit('currentChanged', val);
    },
  },
};
</script>
