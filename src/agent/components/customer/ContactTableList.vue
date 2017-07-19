<template>
  <div>
  
    <v-card>
      <v-card-title class="indigo light--text">
        {{title}}
        <v-btn small @click.native="addNew">
          New
          <v-icon>add</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field style="flex-grow: 2" append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
      </v-card-title>
      <v-card-actions class="indigo darken-2 light--text">
        <span v-if="selected.length > 0">
          <strong>{{selected.length}}</strong> entries are selected
        </span>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text">delete</v-icon>
        </v-btn>
      </v-card-actions>
      <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-model="selected" selected-key="_id" select-all class="elevation-1">
        <template slot="items" scope="props">
          <tr @click="click">
            <td>
              <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
            </td>
            <td class="text-xs-center">{{ props.item.firstName }}</td>
            <td class="text-xs-center">{{ props.item.lastName }}</td>
            <td class="text-xs-center">
              <v-chip v-for="(e, i) in props.item.emails" :key="i" class="indigo white--text">
                {{e.email}}
                <v-icon right>{{e.type}}</v-icon>
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip v-for="(p, i) in props.item.phones" :key="i" class="primary white--text">
                {{p.phone}}
                <v-icon right>{{p.type | toMIcon}}</v-icon>
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip v-for="(t, i) in props.item.types" :key="i" class="green white--text">
                {{t}}
              </v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.lastTimeContact }}</td>
            <td class="text-xs-center">
              <v-btn icon @click.native.stop="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog lazy v-model="showCreateContact" persistent fullscreen transition="dialog-bottom-transition" :overlay=false>
      <CreateContact :showExitButton="true" :exitAction="closeCreateContact" :toEdit="toEdit" @onSave="onSave"></CreateContact>
    </v-dialog>
  </div>


</template>
<script>
import CreateContact from './CreateContact.vue';
import db from '../../../api/index';

export default {
  name: 'ContactTableList',
  data() {
    return {
      search: '',
      selected: [],
      showCreateContact: false,
      toEdit: null,
    };
  },
  filters: {
    toMIcon(text) {
      switch (text) {
        case 'cell':
          return 'smartphone';
        case 'home':
        case 'work':
          return text;
        default:
          return '';
      }
    },
  },
  props: ['headers', 'items', 'title', 'userId'],
  components: {
    CreateContact,
  },
  methods: {
    click() {
      console.log('clicked');
    },
    closeCreateContact() {
      this.showCreateContact = false;
    },
    edit(person) {
      console.log('edit', person);
      this.toEdit = person;
      this.showCreateContact = true;
    },
    addNew() {
      this.toEdit = null;
      this.showCreateContact = true;
    },
    onSave(person) {
      const obj = {
        ...person,
        createdBy: this.userId,
      };
      console.log(obj);
      if (this.toEdit) {
        // Update contact
        db.updateContact(obj)
          .then((response) => {
            if (response._id) {
              console.log('contact updated');
              this.$emit('contactUpdated', response);
            } else {
              console.log('no contact updated');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Create new contact
        db.createContact(obj)
          .then((response) => {
            if (response._id) {
              console.log('new contact created');
              this.$emit('newContactCreated', response);
            } else {
              console.log('no new contact created');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      this.showCreateContact = false;
    },
  },
};
</script>

