<template>
<div>
  <CustomerTableList
    title="All Contacts" 
    :headers="headers"
    :items="list"
  ></CustomerTableList>
</div>

</template>
<script>
import CustomerTableList from './components/customer/CustomerTableList.vue';

export default {
  name: 'ManageContacts',
  components: {
    CustomerTableList,
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
      list: [
        {
          id: 1,
          firstName: 'heng',
          lastName: 'meng',
          emails: [
            {
              type: 'home',
              email: 'nangjizi@gmail.com',
            },
            {
              type: 'work',
              email: 'yeshinamg@gmail.com',
            },
          ],
          phones: [
            {
              type: 'cell',
              phone: '1231231234',
            },
          ],
          addressObject: {
            address: '123 st',
            address2: '',
            city: 'el monte',
            state: 'California',
            zip: '91732',
          },
          types: ['Buyer'],
          lastTimeContact: 'last week',
        },
        {
          id: 2,
          firstName: 'xia',
          lastName: 'jb',
          emails: [
            {
              type: 'home',
              email: 'redoujiang@gmail.com',
            },
          ],
          phones: [
            {
              type: 'cell',
              phone: '4324322342',
            },
          ],
          addressObject: {
            address: '123 st',
            address2: '',
            city: 'el monte',
            state: 'California',
            zip: '91732',
          },
          types: ['Buyer'],
          lastTimeContact: 'last year',
        },
        {
          id: 3,
          firstName: 're',
          lastName: 'doujiang',
          emails: [
            {
              type: 'home',
              email: 'xiaoregou@gmail.com',
            },
          ],
          phones: [
            {
              type: 'cell',
              phone: '5435435432',
            },
          ],
          addressObject: {
            address: '123 st',
            address2: '',
            city: 'el monte',
            state: 'California',
            zip: '91732',
          },
          types: ['Agent', 'Buyer'],
          lastTimeContact: 'last month',
        },
        {
          id: 4,
          firstName: 'da',
          lastName: 'regou',
          emails: [
            {
              type: 'home',
              email: 'xiaomianyang@gmail.com',
            },
          ],
          phones: [
            {
              type: 'cell',
              phone: '973846523',
            },
          ],
          addressObject: {
            address: '123 st',
            address2: '',
            city: 'el monte',
            state: 'California',
            zip: '91732',
          },
          types: ['Agent', 'Investor'],
          lastTimeContact: 'yesterday',
        },
        {
          id: 5,
          firstName: 'lao',
          lastName: 'ganma',
          emails: [
            {
              type: 'home',
              email: 'laoziyijiao@gmail.com',
            },
          ],
          phones: [
            {
              type: 'cell',
              phone: '3451231234',
            },
          ],
          addressObject: {
            address: '123 st',
            address2: '',
            city: 'el monte',
            state: 'California',
            zip: '91732',
          },
          types: ['Buyer'],
          lastTimeContact: 'last week',
        },
      ],
    };
  },
};
</script>
