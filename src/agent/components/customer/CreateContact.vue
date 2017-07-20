<template>
<div>
  <v-toolbar light>
    <v-btn icon="icon" @click.native="onClose" light>
      <v-icon>close</v-icon>
    </v-btn>
    <v-toolbar-title>New Contact</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn light flat @click.native="save">Save</v-btn>
  </v-toolbar>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-text>
              <v-container fluid grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="First Name"
                      v-model="person.firstName"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="Last Name"
                      v-model="person.lastName"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      v-bind:items="customerTypes"
                      v-model="person.types"
                      label="Type"
                      multiple
                      chips
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn @click.native="addPhone"><v-icon>add</v-icon>Add Phone</v-btn>
            </v-card-actions>
            <v-card-actions v-for="(phone, i) in person.phones" :key="i">
              <v-btn icon @click.native="removePhone(i)"><v-icon>delete</v-icon></v-btn>
              <v-text-field
                label="phone"
                v-model="phone.phone"
                class="input-group--focused"
                single-line
              ></v-text-field>
              <v-select
                v-bind:items="phoneTypes"
                v-model="phone.type"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-card-actions>
            <v-card-actions>
              <v-btn @click.native="addEmail"><v-icon>add</v-icon>Add Email</v-btn>
            </v-card-actions>
            <v-card-actions v-for="(e, i) in person.emails" :key="i">
              <v-btn icon @click.native="removeEmail(i)"><v-icon>delete</v-icon></v-btn>
              <v-text-field
                label="E-mail"
                v-model="e.email"
                class="input-group--focused"
                single-line
                :rules="[emailValidator]"
              ></v-text-field>
              <v-select
                v-bind:items="emailTypes"
                v-model="e.type"
                label="Select"
                single-line
                bottom
              ></v-select>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-text>
              <v-text-field
                label="Address"
                v-model="person.addressObject.address"
              ></v-text-field>
              <v-text-field
                label="Address 2"
                v-model="person.addressObject.address2"
              ></v-text-field>
              <v-text-field
                label="City"
                v-model="person.addressObject.city"
              ></v-text-field>
              <v-select
                v-bind:items="states"
                v-model="person.addressObject.state"
                label="State"
                single-line
                bottom
                autocomplete
              ></v-select>
              <v-text-field
                label="Zip Code"
                v-model="person.addressObject.zip"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>
</div>
</template>
<script>
export default {
  name: 'CreateContact',
  data() {
    return {
      person: this.toEdit || this.initPerson(),
      emailTypes: ['home', 'work'],
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      phoneTypes: ['cell', 'home', 'work'],
      customerTypes: ['Buyer', 'Seller', 'Agent', 'Renter', 'Investor', 'Personal Contact'],
      emailValidator: (value) => {
        // eslint-disable-next-line
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
    };
  },
  watch: {
    toEdit: {
      handler() {
        if (this.toEdit) {
          this.person = this.toEdit;
          console.log(this.person);
        } else {
          this.person = this.initPerson();
        }
      },
    },
  },
  props: {
    showExitButton: {
      type: Boolean,
      default: false,
    },
    exitAction: {
      type: Function,
      default: null,
    },
    toEdit: {
      type: Object,
      default: null,
    },
  },
  methods: {
    addPhone() {
      this.person.phones.push({
        type: 'cell',
        phone: '',
      });
    },
    removePhone(index) {
      this.person.phones.splice(index, 1);
    },
    addEmail() {
      this.person.emails.push({
        type: 'home',
        email: '',
      });
    },
    removeEmail(index) {
      this.person.emails.splice(index, 1);
    },
    cleanPerson() {
      const clean = JSON.parse(JSON.stringify(this.person));
      let i = clean.emails.length - 1;
      while (i >= 0) {
        if (clean.emails[i].email === '') {
          clean.emails.splice(i, 1);
        }
        i -= 1;
      }
      i = clean.phones.length - 1;
      while (i >= 0) {
        if (clean.phones[i].phone === '') {
          clean.phones.splice(i, 1);
        }
        i -= 1;
      }
      return clean;
    },
    save() {
      this.$emit('onSave', this.cleanPerson());
    },
    onClose() {
      if (this.exitAction) {
        this.exitAction();
      }
    },
    initPerson() {
      return {
        _id: null,
        firstName: '',
        lastName: '',
        emails: [
          {
            type: 'home',
            email: '',
          },
        ],
        phones: [
          {
            type: 'cell',
            phone: '',
          },
        ],
        addressObject: {
          address: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
        },
        types: ['Buyer'],
      };
    },
  },
};
</script>
