<template>
  <div>
    <v-card>
      <v-card-title class="indigo light--text">
        <v-btn small @click.native="addNew">
          New
          <v-icon>add</v-icon>
        </v-btn>
        <ImportConatctDialog open="openImport" :userId="userId"></ImportConatctDialog>

        <v-spacer></v-spacer>
        <v-text-field style="flex-grow: 2" append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-card-title>
      <v-card-actions class="indigo darken-2 light--text">
        <v-select
          v-bind:items="filterOptions"
          v-model="filters"
          label="Filter"
          prepend-icon="filter_list"
          multiple
          chips
          hide-details
        ></v-select>
        <v-spacer></v-spacer>
        <span v-if="selected.length > 0" class="white--text">
          <strong>{{selected.length}}</strong> entries are selected
        </span>
        <v-btn icon @click.native="deleteContacts">
          <v-icon class="white--text">delete</v-icon>
        </v-btn>
      </v-card-actions>
      <ContactTable
        :contacts="filteredItem"
        :totalItems="totalItems"
        :edit="edit"
        :editable="true"
        :search="search"
        @select="onSelect"
        @loadMore="onLoadMore"></ContactTable>
    </v-card>
    <v-dialog lazy v-model="showCreateContact" persistent fullscreen transition="dialog-bottom-transition" :overlay=false>
      <CreateContact
        :showExitButton="true"
        @close="closeCreateContact"
        @newContactCreated="onNewContactCreated"
        @contactUpdated="onContactUpdated"
        :toEdit="toEdit"
        :userId="userId">
      </CreateContact>
    </v-dialog>
  </div>


</template>
<script>
import { mapGetters } from 'vuex';
import CreateContact from './CreateContact.vue';
import ImportConatctDialog from './ImportContactDialog.vue';
import ContactTable from './ContactTable.vue';
import api from '../../../api/index';

export default {
  name: 'ContactTableList',
  created() {
    console.log('ManageContacts created, userId', this.userId);
    Promise.all([
      api.getContacts(this.userId, this.page, this.pageSize),
      api.getContactsCount(this.userId),
    ]).then((results) => {
      console.log('results', results);
      this.contacts = results[0];
      this.totalItems = results[1];
      // this.calculateItems();
    }).catch((error) => {
      console.error(error);
    });
  },
  data() {
    return {
      page: 0,
      pageSize: 50,
      contacts: [],
      totalItems: 0,
      deleted: [],
      selected: [],
      search: '',
      showCreateContact: false,
      toEdit: null,
      openImport: false,
      filters: [],
      filterOptions: [
        'Has Email', 'Has Phone', 'Has Address', 'Has Name',
      ],
    };
  },
  components: {
    CreateContact,
    ImportConatctDialog,
    ContactTable,
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    filteredItem() {
      console.log('filtering contacts');
      let filterResult = this.contacts.filter(item => !item.isDeleted);
      this.filters.forEach((filter) => {
        switch (filter) {
          case 'Has Email':
            filterResult = filterResult.filter(item => item.emails && item.emails.length > 0);
            break;
          case 'Has Phone':
            filterResult = filterResult.filter(item => item.phones && item.phones.length > 0);
            break;
          case 'Has Address':
            filterResult = filterResult.filter(item => item.addressObject.address !== ''
                                                        && item.addressObject.address2 !== ''
                                                        && item.addressObject.city !== ''
                                                        && item.addressObject.state !== ''
                                                        && item.addressObject.zip !== '');
            break;
          case 'Has Name':
            filterResult = filterResult.filter(item => item.firstName !== '' || item.lastName !== '');
            break;
          default:
            break;
        }
      });
      return filterResult;
    },
  },
  methods: {
    closeCreateContact() {
      this.showCreateContact = false;
    },
    edit(person) {
      this.toEdit = JSON.parse(JSON.stringify(person));
      this.showCreateContact = true;
    },
    addNew() {
      this.toEdit = null;
      this.showCreateContact = true;
    },
    showMessage(message, messageType) {
      this.message = message;
      this.messageType = messageType;
      this.showSnackbar = true;
    },
    onSelect(selected) {
      this.selected = selected;
      console.log('selected');
    },
    onLoadMore() {
      console.log('loading more');
      this.page += 1;
      api.getContacts(this.userId, this.page, this.pageSize)
        .then((contacts) => {
          this.contacts = this.contacts.concat(contacts);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteContacts() {
      const ids = this.selected.map(item => item._id);
      console.log('ids to delete', ids);
      api.deleteContacts(ids)
        .then((res) => {
          // TODO: check count with toRemove.length
          res.toRemove.forEach((r) => {
            const ri = this.contacts.findIndex(i => i._id === r._id);
            this.deleted.push(this.contacts.splice(ri, 1));
          });
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onNewContactCreated(newContact) {
      this.contacts.push(newContact);
      this.showCreateContact = false;
    },
    onContactUpdated(contact) {
      const toUpdate = this.contacts.findIndex(c => c._id === contact._id);
      this.contacts.splice(toUpdate, 1);
      this.contacts.push(contact);
      this.showCreateContact = false;
    },
  },
};
</script>

