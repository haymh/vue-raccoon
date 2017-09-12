<template>
  <div>
    {{ agent.about }}
  </div>
</template>

<script>
export default {
  name: 'About',
  props: ['agent'],
  data() {
    return {};
  },
};
</script>