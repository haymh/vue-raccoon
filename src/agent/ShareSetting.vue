<template>
  <div>
    <v-toolbar fixed class="white hidden-sm-and-up">
      <v-btn icon @click.native="$router.back">
        <v-icon class="grey--text text--darken-2">keyboard_arrow_left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="sendShare">create</v-btn>
    </v-toolbar>
    <main></main>
    <v-container fluid>
      <v-subheader>
        Select Time And Customers
      </v-subheader>
      <v-layout row wrap>
        <v-flex xs12 md3>
          <div v-for="(c, i) in lastFilter" :key="i">
            <FilterTag :filterCondition="c"></FilterTag>
          </div>
        </v-flex>
        <v-flex xs12 md5>
          <div class="content" v-if="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.NOW">
            <p>
              You are going to send <a href="#">{{numberOfHouse}}
              <v-icon>home</v-icon></a>
              to <a href="#">{{selectedCustomers.length}} customers
              <v-icon>people</v-icon></a> <strong>now</strong>.
            </p>
          </div>
          <div class="content" v-else-if="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
            <p>
              You are going to send <a href="#">{{numberOfHouse}} houses
              <v-icon>home</v-icon></a>
              to <a href="#">{{selectedCustomers.length}} customers
              <v-icon>people</v-icon></a> on <strong>{{shareObject.shareMethod.shareOn}}</strong>
            </p>
          </div>
          <div class="content" v-else-if="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
            <p>
              You are going to send <a href="#">{{numberOfHouse}} houses
              <v-icon>home</v-icon></a>
              to <a href="#">{{selectedCustomers.length}} customers
              <v-icon>people</v-icon></a> <strong>{{frequency}}</strong>
            </p>
          </div>
        </v-flex>
        <v-flex xs12 class="hidden-xs-only">
          <v-btn @click="sendShare">create</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-radio
                label="Share Once Now"
                v-model="shareObject.shareMethod.shareScheduleType"
                :value="SHARE_SCHEDULE_TYPES.NOW" primary hide-details></v-radio>
            </v-flex>
            <v-flex xs12 md4>
              <v-radio
                label="Share Once in Future"
                v-model="shareObject.shareMethod.shareScheduleType"
                :value="SHARE_SCHEDULE_TYPES.DATE" primary hide-details></v-radio>
            </v-flex>
            <v-flex xs12 md4>
              <v-radio
                label="Share every"
                v-model="shareObject.shareMethod.shareScheduleType"
                :value="SHARE_SCHEDULE_TYPES.PERIODICAL" primary hide-details></v-radio>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
          <v-dialog
            persistent
            v-model="showTimePicker"
            lazy
          >
            <v-text-field
              slot="activator"
              label="Click to select different date"
              v-model="shareObject.shareMethod.shareOn"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="shareObject.shareMethod.shareOn" scrollable :allowed-dates="allowedDates">
              <template slot-scope="{ cancel }">
                <v-card-row actions>
                  <v-btn flat color="primary" @click.native="showTimePicker = false">Cancel</v-btn>
                </v-card-row>
              </template>
            </v-date-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs6 v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <v-select
            v-bind:items="frequencyOptions"
            v-model="shareObject.shareMethod.frequency"
            label="Frequency"
            single-line
            auto
          ></v-select>
        </v-flex>
        <v-flex xs6 v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE || shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <v-select
            v-bind:items="timeOptions"
            v-model="shareObject.time"
            label="Time"
            single-line
            auto
          ></v-select>
        </v-flex>
      </v-layout>
      <v-tabs
        grow
        scroll-bars
        v-model="selectedTab"
        dark
      >
        <v-tabs-bar slot="activators">
          <v-tabs-item
            v-for="t in tabs"
            :key="t"
            :href="t"
            ripple
          >
            {{ t }}
          </v-tabs-item>
          <v-tabs-slider></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-content
          v-for="t in tabs"
          :key="t"
          :id="t"
        >
          <v-card flat>
             <ShareCustomerList :showSelected="selectedTab === 'Selected Customers'" :customerList="customerList"></ShareCustomerList>
            <!-- <ContactTableList></ContactTableList> -->
          </v-card>
        </v-tabs-content>
      </v-tabs>
    </v-container>
  </div>
</template>
<style language="scss">
.datepicker input {
  padding: .75em .5em;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 50%
}
</style>
<script>
import { mapGetters } from 'vuex';
import FilterTag from '../components/filter/FilterTag.vue';
import ShareCustomerList from './components/customer/ShareCustomerList.vue';
import ContactTableList from './components/customer/ContactTableList.vue';
import { PERIODICAL_OPTIONS, TIME_OPTIONS, SHARE_SCHEDULE_TYPES, Share } from './components/share/shareSchema';
import API from '../api';

const today = new Date();
const yesterday = new Date();

yesterday.setDate(today.getDate() - 1);
export default {
  name: 'ShareSetting',
  created() {
    this.shareObject.subject = this.shareEmail.subject;
    this.shareObject.emailContent = this.shareEmail.content;
    this.shareObject.createdBy = this.userId;
    this.shareObject.query = this.query;
    console.log('shareObject', this.shareObject);
    API.getContacts(this.userId).then((contacts) => {
      this.customerList = contacts;
    }).catch((error) => {
      console.error(error);
    });
  },
  watch: {
    shareObject: {
      handler() {
        console.log('shareObject changed', this.shareObject);
      },
    },
  },
  data() {
    return {
      customerList: [],
      disableShareDate: {
        to: yesterday,
      },
      allowedDates: date => date > yesterday,
      showTimePicker: false,
      shareObject: new Share({
        uid: this.userId,
        // subject: this.shareEmail.subject,
        emailFrom: 'jeremynangjizi@redoujiang.com',
        // emailContent: this.shareEmail.content,
        shareScheduleType: SHARE_SCHEDULE_TYPES.NOW,
        shareOn: today,
        frequency: PERIODICAL_OPTIONS.WEEKLY,
        time: TIME_OPTIONS.EVENING,
      }),
      SHARE_SCHEDULE_TYPES,
      frequencyOptions: [
        PERIODICAL_OPTIONS.DAILY,
        PERIODICAL_OPTIONS.WEEKLY,
        PERIODICAL_OPTIONS.BI_WEEKLY,
        PERIODICAL_OPTIONS.MONTHLY,
      ],
      timeOptions: [
        TIME_OPTIONS.MORNING,
        TIME_OPTIONS.AFTERNOON,
        TIME_OPTIONS.EVENING,
      ],
      showSelected: false,
      tabs: ['Customer List', 'Selected Customers'],
      selectedTab: 'Customer List',
    };
  },
  computed: {
    ...mapGetters([
      'selectedHouses',
      'selectedCustomers',
      'searchTerms',
      'filterResults',
      'lastFilter',
      'userId',
      'shareId',
      'byFilter',
      'shareEmail',
      'query',
    ]),
    numberOfHouse() {
      if (this.byFilter) {
        console.log('by filter');
        return `all houses (${this.filterResults.length}) in ${this.searchTerms.city}, ${this.searchTerms.state}`;
      }
      return `${this.selectedHouses.length} houses`;
    },
    frequency() {
      switch (this.shareObject.shareMethod.frequency) {
        case PERIODICAL_OPTIONS.DAILY:
          return 'every day';
        case PERIODICAL_OPTIONS.WEEKLY:
          return 'every week';
        case PERIODICAL_OPTIONS.BI_WEEKLY:
          return 'every two weeks';
        case PERIODICAL_OPTIONS.MONTHILY:
          return 'every month';
        default:
          return '';
      }
    },
  },
  components: {
    ShareCustomerList,
    FilterTag,
    ContactTableList,
  },
  methods: {
    setShowSelected(showSelected) {
      this.showSelected = showSelected;
    },
    sendShare() {
      const share = this.shareObject.createShare();
      console.log(share);
      API.createShare(share).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
