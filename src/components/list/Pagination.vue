<template>
<nav class="pagination">
  <ul class="pagination-list">
    <li>
      <a class="pagination-link" v-if="chunk" @click="previousChunk">
        <span class="icon">
          <i class="fa fa-angle-double-left"></i>
        </span>
      </a>
    </li>
    <li>
      <a class="pagination-link" @click="previous">
        <span class="icon">
          <i class="fa fa-angle-left"></i>
        </span>
      </a>
    </li>
    <li v-for="number in realSize">
      <a :class="selected(number + first - 1)" @click="select(number + first - 1)">{{first + number}}</a>
    </li>
    <li>
      <a class="pagination-link" @click="next">
        <span class="icon">
          <i class="fa fa-angle-right"></i>
        </span>
      </a>
    </li>
    <li>
      <a class="pagination-link"  v-if="chunk" @click="nextChunk">
        <span class="icon">
          <i class="fa fa-angle-double-right"></i>
        </span>
      </a>
    </li>
  </ul>
</nav>
</template>
<script>

export default {
  name: 'Pagination',
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
    chunk: {
      type: Boolean,
      default: false,
    },
    chunkSize: {
      type: Number,
      default: 5,
    },
    size: {
      type: Number,
      default: 5,
    },
  },
  watch: {
    current: {
      handler() {
        this.$emit('currentChanged', this.current);
      },
    },
    currentPage: {
      handler() {
        if (this.currentPage < this.totalPages) {
          this.current = this.currentPage;
        }
        if (this.currentPage <= this.totalPages - this.realSize
          && this.currentPage >= this.first + this.size) {
          this.first = this.currentPage;
        }
      },
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    realSize() {
      return this.size > this.totalPages ? this.totalPages : this.size;
    },
  },
  data() {
    return {
      current: this.currentPage,
      first: this.currentPage,
    };
  },
  methods: {
    selected(number) {
      return {
        button: true,
        'is-primary': number === this.current,
      };
    },
    select(number) {
      this.current = number;
    },
    next() {
      if (this.current < this.totalPages - 1) {
        this.current += 1;
      }
      if (this.first < this.totalPages - this.realSize) {
        this.first += 1;
      }
    },
    previous() {
      if (this.current > 0) {
        this.current -= 1;
      }
      if (this.first > 0) {
        this.first -= 1;
      }
    },
    nextChunk() {
      if (this.current + this.chunkSize < this.totalPages - 1) {
        this.current += this.chunkSize;
      } else {
        // move to very last one
        this.current = this.totalPages - 1;
      }
      if (this.first + this.chunkSize <= this.totalPages - this.realSize) {
        this.first += this.chunkSize;
      } else {
        this.first = this.totalPages - this.realSize;
      }
    },
    previousChunk() {
      if (this.current - this.chunkSize >= 0) {
        this.current -= this.chunkSize;
      } else {
        this.current = 0;
      }
      if (this.first - this.chunkSize >= 0) {
        this.first -= this.chunkSize;
      } else {
        this.first = 0;
      }
    },
  },
};
</script>
