<template>
<div>
  <v-toolbar v-show="!showModal" fixed class="white hidden-sm-and-up">
    <v-dialog fullscreen v-model="showModal">
      <v-btn class="grey--text text--darken-2" slot="activator">Email Preview</v-btn>
      <v-card>
        <v-card-row>
          <v-card-title>Email Preview</v-card-title>
        </v-card-row>
        <v-card-row>
          <v-card-text class="text-md-center">
            <div v-if="showModal" v-html="email"></div>
          </v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="green--text darken-1" flat @click.native="nextStep">Continue Share Schedule Setup</v-btn>
          <v-btn class="red--text darken-1" flat @click.native="showModal = false">Close</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>
    <v-btn warning @click.native="nextStep">Next Step</v-btn>
  </v-toolbar>
  <main></main>
  <v-card>
    <v-card-row>
      <v-card-title>
        Edit Your Share
      </v-card-title>
    </v-card-row>
    <v-card-row>
      <v-card-text>
        <v-subheader class="grey--text text--lighten-1">Email Subject</v-subheader>
        <v-text-field
          multi-line
          value=""
          label="e.g. Check out those hot homes!"
          v-model="emailSubject"
        ></v-text-field>
      </v-card-text>
    </v-card-row>
    <v-card-row>
      <v-card-text>
        <v-subheader class="grey--text text--lighten-1">Summary for those properties</v-subheader>
        <v-text-field
          multi-line
          value=""
          label="e.g. Check out those hot homes!"
          v-model="shareTitle"
        ></v-text-field>
      </v-card-text>
    </v-card-row>
    <v-card-row>
      <v-card-text>
        <v-subheader class="grey--text text--lighten-1">Things you want to tell your customers</v-subheader>
        <v-text-field
          multi-line
          value=""
          label="Something nice to say about those properties"
          v-model="shareTitle"
        ></v-text-field>
      </v-card-text>
    </v-card-row>
    <v-card-row actions class="hidden-xs-only">
      <v-btn class="green--text darken-1" flat="flat" @click.native="nextStep">Continue Share Schedule Setup</v-btn>
      <v-dialog fullscreen v-model="showModal">
        <v-btn class="grey--text text--darken-2" slot="activator">Email Preview</v-btn>
        <v-card>
          <v-card-row>
            <v-card-title>Email Preview</v-card-title>
          </v-card-row>
          <v-card-row>
            <v-card-text class="text-md-center">
              <div v-if="showModal" v-html="email"></div>
            </v-card-text>
          </v-card-row>
          <v-card-row actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native="nextStep">Continue Share Schedule Setup</v-btn>
            <v-btn class="red--text darken-1" flat="flat" @click.native="showModal = false">Close</v-btn>
          </v-card-row>
        </v-card>
      </v-dialog>
    </v-card-row>
  </v-card>
</div>

</template>
<script>
import { mapGetters } from 'vuex';
// import FilterTag from '../components/filter/FilterTag.vue';
// import singleHouseTemplate from '../../email-templates/single-house.hbs';
// import singleHouseSchema from '../../email-templates/singleHouseSchema';
import multipleHouseTemplate from './email-templates/multiple-house.hbs';
import multipleHouseSchema from './email-templates/multipleHouseSchema';

export default {
  name: 'EditShareInfo',
  data() {
    return {
      showModal: false,
      emailSubject: '',
      shareTitle: '',
      shareDescription: '',
      isLoading: false,
    };
  },
  created() {
    this.emailSubject = `I found some awesome houses in ${this.searchTerms.city}, ${this.searchTerms.state} for you!`;
    this.shareTitle = `I found some awesome houses in ${this.searchTerms.city}, ${this.searchTerms.state} for you!`;
    this.shareDescription = 'Hi,\nI hope all is well with you and you are seeing a few homes that peak your interest on the site. In case anything has changed, you can easily update your preferences in order to receive properties better catered to your search. Please reply to this email if you would like to be removed from e-Alerts, please reply to this email and I can do that for you!';
  },
  components: {
    // FilterTag,
  },
  methods: {
    nextStep() {
      this.$store.dispatch('setShareEmail', {
        subject: this.emailSubject,
        content: this.email,
      });
      this.$router.push('/shareSetting');
    },
  },
  computed: {
    ...mapGetters([
      'selectedHouses',
      'lastFilter',
      'selectedCustomers',
      'filterResults',
      'searchTerms',
      'userId',
    ]),
    email() {
      multipleHouseSchema.share.title = this.shareTitle;
      multipleHouseSchema.share.description = this.shareDescription;
      return multipleHouseTemplate(multipleHouseSchema);
    },
  },
};
</script>
