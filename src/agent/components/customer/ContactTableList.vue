<template>
  <div>
  
    <v-card>
      <v-card-title class="indigo light--text">
        {{title}}
        <v-btn small @click.native="addNew">
          New
          <v-icon>add</v-icon>
        </v-btn>
        <ImportConatctDialog open="openImport"></ImportConatctDialog>

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
        <v-btn icon>
          <v-icon class="white--text">delete</v-icon>
        </v-btn>
      </v-card-actions>
      <ContactTable
        :headers="headers"
        :items="items"
        :edit="edit"
        :editable="true"
        :search="search"
        @onSelect="onSelect"></ContactTable>
    </v-card>
    <v-dialog lazy v-model="showCreateContact" persistent fullscreen transition="dialog-bottom-transition" :overlay=false>
      <CreateContact :showExitButton="true" :exitAction="closeCreateContact" :toEdit="toEdit" @onSave="onSave"></CreateContact>
    </v-dialog>
    <v-snackbar
      :timeout="snackTimeout"
      :top="true"
      v-model="showSnackbar"
      :success="messageType === 'success'"
      :info="messageType === 'info'"
      :warning="messageType === 'warning'"
      :error="messageType === 'error'"
      :primary="messageType === 'primary'"
      :secondary="messageType === 'secondary'"
    >
      {{ message }}
      <v-btn flat :value="messageType" @click.native="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </div>


</template>
<script>
import CreateContact from './CreateContact.vue';
import ImportConatctDialog from './ImportContactDialog.vue';
import ContactTable from './ContactTable.vue';
import db from '../../../api/index';

export default {
  name: 'ContactTableList',
  data() {
    return {
      search: '',
      selected: [],
      showCreateContact: false,
      toEdit: null,
      openImport: false,
      snackTimeout: 6000,
      showSnackbar: false,
      message: '',
      messageType: 'info',
      filters: [],
      filterOptions: [
        'Has Email', 'Has Phone', 'Has Address', 'Has Name',
      ],
    };
  },
  props: ['headers', 'items', 'title', 'userId'],
  components: {
    CreateContact,
    ImportConatctDialog,
    ContactTable,
  },
  methods: {
    closeCreateContact() {
      this.showCreateContact = false;
    },
    edit(person) {
      console.log('edit', person);
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
    onSave(person) {
      console.log('person', person);
      const obj = {
        ...person,
        createdBy: this.userId,
      };
      console.log('obj', obj);
      if (this.toEdit) {
        // Update contact
        db.updateContact(obj)
          .then((response) => {
            if (response._id) {
              console.log('contact updated');
              this.$emit('contactUpdated', response);
              this.showMessage('Contact Has Been Updated', 'success');
            } else {
              console.log('no contact updated');
              this.showMessage('No Contact Has Been Updated', 'warning');
            }
          })
          .catch((error) => {
            console.error(error);
            this.showMessage('Failed to Update Contact', 'error');
          });
      } else {
        // Create new contact
        db.createContact(obj)
          .then((response) => {
            if (response._id) {
              console.log('new contact created');
              this.$emit('newContactCreated', response);
              this.showMessage('New Contact Has Been Created', 'success');
            } else {
              console.log('no new contact created');
              this.showMessage('No Contact Has Been Created', 'warning');
            }
          })
          .catch((error) => {
            console.error(error);
            this.showMessage('Failed to Create Contact', 'error');
          });
      }
      this.showCreateContact = false;
    },
    onSelect(selected) {
      this.selected = selected;
    },
  },
};
</script>

