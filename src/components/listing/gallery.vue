<template>
  <div id="gallery">
    <img id="image" src="./house1.jpg" alt="House Image"/>
  </div>
</template>

<style scoped>
#image{
    width: 100%;
    height: 100%;
}
</style>

<script>
export default {
  name: 'Gallery',
  el: '#gallery',
};
</script>
