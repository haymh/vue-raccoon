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


<!--<div class="section">
  <div class="container">
    <div class="heading has-text-centered">
      <h1 class="title">Edit Your Share</h1>
    </div>
  </div>
  <div :class="['modal', showModal ? 'is-active':'']">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card" v-if="showModal">
      <section class="modal-card-body">
        <div v-html="email"></div>
      </section>
    </div>
  </div>
  <div class="container">
    <div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Email Subject</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-danger" v-model="emailSubject" type="text" placeholder="e.g. Check out those hot homes!">
            </div>
            <p class="help is-danger">
              This field is required
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Summary for those properties</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-danger" v-model="shareTitle" type="text" placeholder="e.g. Check out those hot homes!">
            </div>
            <p class="help is-danger">
              This field is required
            </p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Things you want to tell your customers</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea class="textarea" v-model="shareDescription" placeholder="Something nice to say about those properties"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label">
          
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="toggleModal">Email Preview</button>
              <button class="button is-danger" @click="nextStep">Next Step</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>-->
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
