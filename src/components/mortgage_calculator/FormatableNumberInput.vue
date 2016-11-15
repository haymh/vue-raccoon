<template>
  <input class="input" type="text"
    style="padding-right:20px;"
    :value="formatMethod(value)"
    v-on:focus="editMode"
    v-on:keyup.enter="outFocus"
    v-on:keypress="numberOnly"
    v-on:focusout="assignValue">
</template>
<script>
export default {
  name: 'FormatableNumberInput',
  props: {
    formatMethod: {
      type: Function,
    },
    value: {
      type: Number,
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  watch: {
    value: {
      handler() {
        this.newValue = parseFloat(this.value);
      },
    },
  },
  methods: {
    editMode(e) {
      e.target.value = this.newValue;
    },
    outFocus() {
      document.activeElement.blur();
    },
    assignValue(e) {
      console.log('text in the input 1', e.target.value);
      this.newValue = parseFloat(e.target.value);
      e.target.value = this.formatMethod(this.newValue);
      document.activeElement.blur();
      this.$emit('valuechange', this.newValue);
    },
    numberOnly(evt) {
      const theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
      const regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
    },
  },
};
</script>
