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
            :headers="headers"
            :items="contacts"
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
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import vCard from 'vcf';
import UploadButton from '../../../components/common/UploadButton.vue';

const ContactTable = () => import('./ContactTable.vue');

export default {
  name: 'ImportContactDialog',
  props: ['open'],
  data() {
    return {
      file: {},
      contacts: [],
      dialog: false,
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
    processVcards(cards) {
      cards.forEach((card) => {
        const jcard = card.toJSON();
        console.log(jcard.vcard);
        const contact = {};
        jcard[1].forEach((data) => {
          console.log(data[0]);
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
                  type: data[1].type[0],
                  phone: data[3],
                });
              } else {
                contact.phones = [{
                  type: data[1].type[0],
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
        });
        console.log(contact);
        this.contacts.push(contact);
      });
    },
  },
};
</script>

