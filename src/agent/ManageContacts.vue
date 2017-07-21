<template>
<div>
  <ContactTableList></ContactTableList>
</div>

</template>
<script>
import ContactTableList from './components/customer/ContactTableList.vue';

export default {
  name: 'ManageContacts',
  components: {
    ContactTableList,
  },
  data() {
    return {};
  },
};
</script>
