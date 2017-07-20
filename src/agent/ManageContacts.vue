<template>
<div>
  <ContactTableList
    title="All Contacts" 
    :headers="headers"
    :items="list"
    :userId="userId"
    @newContactCreated="onNewContactCreated"
    @contactUpdated="onContactUpdated"
  ></ContactTableList>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
import ContactTableList from './components/customer/ContactTableList.vue';
import db from '../api/index';

export default {
  name: 'ManageContacts',
  components: {
    ContactTableList,
  },
  created() {
    console.log('ManageContacts created, userId', this.userId);
    db.getContacts(this.userId, 0, 50)
      .then((contacts) => {
        console.log('contacts', contacts);
        this.list = contacts;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
  },
  data() {
    return {
      headers: [
        {
          text: 'First Name',
          left: true,
          sortable: true,
          value: 'firstName',
          align: 'center',
        },
        { text: 'Last Name', value: 'lastName', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Phone', value: 'phone', align: 'center' },
        { text: 'Type', value: 'type', align: 'center' },
        { text: 'Last Time Contact', value: 'lastTimeContact', align: 'center' },
      ],
      list: [],
    };
  },
  methods: {
    onNewContactCreated(newContact) {
      this.list.push(newContact);
    },
    onContactUpdated(contact) {
      console.log('merge this contact', contact);
      const toUpdate = this.list.findIndex(c => c._id === contact._id);
      console.log('toUpdate', toUpdate);
      this.list.splice(toUpdate, 1);
      this.list.push(contact);
      console.log('list', this.list);
    },
  },
};
</script>
