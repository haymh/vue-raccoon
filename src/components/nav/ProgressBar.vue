<template>
  <div class="progress">
    <v-progress-linear :indeterminate="true" height="2" style="margin:0"></v-progress-linear>
  </div>
</template>
<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 100%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  /* background-color: #efc14e; */
  z-index: 999999;
}
</style>