<template>
  <v-btn v-bind="$attrs" class="jbtn-file">
    {{ title }}
    <input type="file" @change="fileSelected" 
      :accept="$attrs.accept">
  </v-btn>
</template>

<script>
  export default {
    name: 'upload-button',
    props: {
      title: String,
    },
    methods: {
      fileSelected(e) {
        if (e.target.files[0]) {
          this.$emit('files', e.target.files[0]);
        } else {
          this.$emit('files', null);
        }
      },
    },
  };
</script>

<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>
