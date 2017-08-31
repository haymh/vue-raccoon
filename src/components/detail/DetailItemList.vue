<template>
  <ul v-if="Array.isArray(item)">
    <li v-for="(o, i) in item" :key="i">
      {{o}}
    </li>
  </ul>
   <!-- <ul v-else-if="typeof property.commonWalls === 'string' || property.commonWalls instanceof String">  -->
   <ul v-else>
    <li>{{item}}</li>
  </ul>
</template>
<script>
export default {
  name: 'DetailItemList',
  props: ['item'],
};
</script>