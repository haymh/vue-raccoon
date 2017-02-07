<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
    max-width: 400px;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  input {
  }

  ul.options-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 3px 3px;
    position: absolute;
    width: 100%;
    overflow: hidden;
  }

  ul.options-list li {
    width: 100%;
    flex-wrap: wrap;
    background: white;
    margin: 0;
    border-bottom: 1px solid #eee;
    color: #363636;
    padding: 7px;
    cursor: pointer;
  }

  ul.options-list li.highlighted {
    background: #f8f8f8
  }
</style>

<template>
<div class="">
  <p class="control has-icon has-icon-right is-marginless"
     :class="showLoading">
    <input v-model="keyword" class="input"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
      @keyup.esc="isOpen = false"
      @blur="isOpen = false"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="select">
  </p>
  <ul v-show="isOpen" class="options-list">
    <li v-for="(option, index) in options"
        :class="{'highlighted': index === highlightedPosition}"
        @mouseenter="highlightedPosition = index" @mousedown="select">
      <slot name="item" :option="option"></slot>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Autocomplete',
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: String,
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      highlightedPosition: 0,
      keyword: '',
    };
  },
  computed: {
    showLoading() {
      return this.isLoading ? 'is-loading' : '';
    },
  },
  watch: {
    options: {
      handler(val) {
        this.isOpen = val.length !== 0;
      },
    },
  },
  methods: {
    onInput(value) {
      this.highlightedPosition = 0;
      if (value) {
        this.$emit('input', value);
      }
    },
    moveDown() {
      if (!this.isOpen) {
        return;
      }
      this.highlightedPosition =
        (this.highlightedPosition + 1) % this.options.length;
    },
    moveUp() {
      if (!this.isOpen) {
        return;
      }
      this.highlightedPosition = this.highlightedPosition - 1 < 0
      ? this.options.length - 1 : this.highlightedPosition - 1;
    },
    select() {
      const selectedOption = this.options[this.highlightedPosition];
      this.$emit('select', selectedOption);
      this.isOpen = false;
      this.keyword = selectedOption.title;
    },
  },
};
</script>
