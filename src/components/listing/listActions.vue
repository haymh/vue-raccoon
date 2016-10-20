<template>
  <div id="listActions">
    <div class="wrapper">
      <button class="actionButton">View Details</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline-block;
  font-family: serif;
  padding: 5px;
  margin: 10px;
}
.actionButton {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
}
</style>

<script>
export default {
  name: 'ListActions',
  el: '#listActions',
};
</script>
