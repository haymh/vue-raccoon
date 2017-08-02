<template>
  <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog" lazy fullscreen>
      <v-btn small slot="activator">Import
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar light>
          <v-btn icon="icon" @click.native="dialog = false" light>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Import Contacts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat @click.native="save">
            Agree
            <v-icon>cloud_upload</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title>
          <div class="headline">Upload vCard</div>
          <UploadButton
            class="green--text darken-1"
            title="Upload"
            @files="filesSelected"
            accept=".vcf"
          ></UploadButton>
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
        </v-card-actions>
        <v-card-text>
          {{ file.name }}
          <ContactTable
            :contacts="filteredItem"
            :totalItems="totalItems"
            selected-key="localId"
            @select="onSelect"
          ></ContactTable>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import vCard from 'vcf';
import UploadButton from '../../../components/common/UploadButton.vue';
import api from '../../../api';

const ContactTable = () => import('./ContactTable.vue');

export default {
  name: 'ImportContactDialog',
  props: ['userId'],
  data() {
    return {
      file: {},
      contacts: [],
      totalItems: 0,
      selected: [],
      dialog: false,
      filters: [],
      filterOptions: [
        'Has Email', 'Has Phone', 'Has Address', 'Has Name',
      ],
    };
  },
  components: {
    UploadButton,
    ContactTable,
  },
  computed: {
    filteredItem() {
      let filterResult = this.contacts;
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
      this.totalItems = filterResult.length;
      return filterResult;
    },
  },
  methods: {
    onSelect(selected) {
      this.selected = selected;
      console.log('onselect', this.selected);
    },
    filesSelected(file) {
      console.log('files:', file);
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const cards = vCard.parse(content);
        console.log(cards);
        this.processVcards(cards);
        // this.contacts = card;
      };
      reader.readAsText(file);
    },
    showMessage(message, messageType) {
      this.$store.dispatch('setSnackbar', {
        message,
        messageType,
        showSnackbar: true,
      });
    },
    save() {
      if (this.contacts.length === 0) {
        this.showMessage('Please upload your vcard', 'warning');
        return;
      }
      if (this.selected.length === 0) {
        this.showMessage('Please select the contacts you want to save', 'warning');
        return;
      }
      console.log('saving', this.selected);
      api.createContact(this.selected)
        .then((response) => {
          this.$emit('contactsUploaded', response);
          this.showMessage('New contacts have been created', 'success');
          this.dialog = false;
        })
        .catch((error) => {
          console.error(error);
          this.showMessage('Failed to Create Contact', 'error');
        });
    },
    phoneType(type) {
      switch (type) {
        case 'c':
          return 'cell';
        case 'h':
          return 'home';
        default:
          return 'unknown';
      }
    },
    processVcards(cards) {
      let localId = 0;
      cards.forEach((card) => {
        const jcard = card.toJSON();
        console.log(jcard.vcard);
        const contact = {
          localId,
          firstName: '',
          lastName: '',
          phones: [],
          emails: [],
          addressObject: {
            address: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
          },
          createdBy: this.userId,
        };
        localId += 1;
        jcard[1].forEach((data) => {
          console.log(data[0]);
          try {
            switch (data[0]) {
              case 'version':
                contact.version = data[3];
                break;
              case 'n':
                contact.firstName = data[3][1];
                contact.lastName = data[3][0];
                break;
              case 'tel':
                contact.phones.push({
                  type: this.phoneType(data[1].type[0]),
                  phone: data[3],
                });
                break;
              case 'email':
                contact.emails.push({
                  email: data[3],
                });
                break;
              case 'adr':
                contact.addressObject = {
                  address: data[3][2],
                  // address2: null
                  city: data[3][3],
                  state: data[3][4],
                  zip: data[3][5],
                };
                break;
              default: break;
            }
          } catch (err) {
            console.error('contact parsing', err);
            console.log(data);
          }
        });
        console.log(contact);
        this.contacts.push(contact);
        this.totalItems = this.contacts.length;
      });
    },
  },
};
</script>

