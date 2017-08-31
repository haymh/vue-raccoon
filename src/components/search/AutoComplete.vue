<style scoped>
  .options-list {
    position: fixed;
    z-index: 1;
    margin-top: 50px;
    margin-left: 36px;
  }
  li.highlighted {
    background: rgba(0,0,0,.12);
  }
</style>

<template>
<div>
  <v-layout>
    <v-text-field
      prepend-icon="search"
      single-line
      hide-details
      v-model="keyword"
      :label="placeholder"
      @input.native="onInput($event.target.value)"
      @keyup.native.esc="isOpen = false"
      @blur.native="isOpen = false"
      @keydown.native.down="moveDown"
      @keydown.native.up="moveUp"
      @keydown.native.enter="select">
    </v-text-field>
    <v-card v-show="isOpen" class="options-list" transition="slide-y-transition">
      <v-list dense>
        <v-list-tile v-for="(option, index) in options"
            :key="index"
            :class="{'highlighted': index === highlightedPosition}"
            @focus="highlightedPosition = index"
            @mouseenter="highlightedPosition = index"
            @click.native="select">
            <v-list-tile-title v-text="option.text"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-layout>
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
      this.keyword = selectedOption.text;
    },
  },
};
</script>
