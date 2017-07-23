<template>
  <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog" lazy fullscreen>
      <v-btn small slot="activator">Import
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <div class="headline">Upload vCard</div>
        </v-card-title>
        <v-card-text>
          {{ file.name }}
          <ContactTable
            :contacts="contacts"
            v-model="selected"
            :totalItems="totalItems"
          ></ContactTable>
        </v-card-text>
        <v-card-actions>
          <UploadButton
            class="green--text darken-1"
            flat="flat"
            title="Upload"
            @files="filesSelected"
            accept=".vcf"
          ></UploadButton>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="save">Agree</v-btn>
        </v-card-actions>
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
  props: ['open', 'userId'],
  data() {
    return {
      file: {},
      contacts: [],
      totalItems: 0,
      selected: [],
      dialog: false,
    };
  },
  components: {
    UploadButton,
    ContactTable,
  },
  methods: {
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
    save() {
      console.log('saving', this.selected);
      api.createContact(this.selected)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          // this.showMessage('Failed to Create Contact', 'error');
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
      cards.forEach((card) => {
        const jcard = card.toJSON();
        console.log(jcard.vcard);
        const contact = {
          createdBy: this.userId,
        };
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
                if (contact.phones) {
                  contact.phones.push({
                    type: this.phoneType(data[1].type[0]),
                    phone: data[3],
                  });
                } else {
                  contact.phones = [{
                    type: this.phoneType(data[1].type[0]),
                    phone: data[3],
                  }];
                }
                break;
              case 'email':
                if (contact.emails) {
                  contact.emails.push({
                    email: data[3],
                  });
                } else {
                  contact.emails = [{
                    email: data[3],
                  }];
                }
                break;
              case 'adr':
                if (!contact.addressObject) {
                  contact.addressObject = {
                    address: data[3][2],
                    // address2: null
                    city: data[3][3],
                    state: data[3][4],
                    zip: data[3][5],
                  };
                }
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

