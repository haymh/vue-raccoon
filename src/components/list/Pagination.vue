<template>
<nav class="pagination">
  <ul>
    <li>
      <a class="button">
        <span class="icon">
          <i class="fa fa-angle-left"></i>
        </span>
      </a>
    </li>
    <li>
      <a class="button">
        <span class="icon">
          <i class="fa fa-angle-right"></i>
        </span>
      </a>
    </li>
    <li>
      <a class="button" v-if="show(1)">1</a>
    </li>
    <li>
      <a class="button" v-if="show(2)">2</a>
    </li>
    <li>
      <a class="button" v-if="show(3)">3</a>
    </li>
    <li>
      <span>...</span>
    </li>
    <li>
      <a class="button">86</a>
    </li>
  </ul>
</nav>
</template>
<script>

export default {
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
  },
  created() {
  },
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    show(page) {
      return page <= this.totalPages;
    },
  },
};
</script>
