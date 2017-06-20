<template>
  <div>
    <v-container fluid>
      <v-subheader>
        Select Time And Customers
      </v-subheader>
      <v-layout row wrap>
        <v-flex xs12 md3>
          <div v-for="c in lastFilter">
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
        <v-flex xs12>
          <v-btn @click="sendShare">create</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12 md4>
              <v-radio
                label="Share Once Now"
                v-model="shareObject.shareMethod.shareScheduleType"
                :value="SHARE_SCHEDULE_TYPES.NOW" primary dark hide-details></v-radio>
            </v-flex>
            <v-flex xs12 md4>
              <v-radio
                label="Share Once in Future"
                v-model="shareObject.shareMethod.shareScheduleType"
                :value="SHARE_SCHEDULE_TYPES.DATE" primary dark hide-details></v-radio>
            </v-flex>
            <v-flex xs12 md4>
              <v-radio
                label="Share every"
                v-model="shareObject.shareMethod.shareScheduleType"
                :value="SHARE_SCHEDULE_TYPES.PERIODICAL" primary dark hide-details></v-radio>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
          <v-date-picker
            class="mt-3 mr-1 ml-1"
            v-model="shareObject.shareMethod.shareOn"
            :allowed-dates="allowedDates"
          ></v-date-picker>
          <!--<Datepicker v-model="shareObject.shareMethod.shareOn"
                      :disabled="disableShareDate"></Datepicker>-->
        </v-flex>
        <v-flex xs6 v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <v-select
            v-bind:items="frequencyOptions"
            v-model="shareObject.shareMethod.frequency"
            label="Frequency"
            dark
            single-line
            auto
          ></v-select>
        </v-flex>
        <v-flex xs6 v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE || shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <v-select
            v-bind:items="timeOptions"
            v-model="shareObject.time"
            label="Time"
            dark
            single-line
            auto
          ></v-select>
        </v-flex>
      </v-layout>
      <v-tabs
        grow
        scroll-bars
        v-model="selectedTab"
        light
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
            <CustomerList :showSelected="selectedTab === 'Selected Customers'" :customerList="customerList"></CustomerList>
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
import Datepicker from 'vuejs-datepicker';
import FilterTag from '../components/filter/FilterTag.vue';
import CustomerList from './components/customer/CustomerList.vue';
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
      disableShareDate: {
        to: yesterday,
      },
      allowedDates: function (date) {
        return date > yesterday;
      },
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
      customerList: [
        {
          id: 1,
          name: 'Heng',
        },
        {
          id: 2,
          name: 'Heng',
        },
        {
          id: 3,
          name: 'Heng',
        },
        {
          id: 4,
          name: 'Heng',
        },
        {
          id: 5,
          name: 'Heng',
        },
        {
          id: 6,
          name: 'Heng',
        },
        {
          id: 7,
          name: 'Heng',
        },
        {
          id: 8,
          name: 'Heng',
        },
        {
          id: 9,
          name: 'Heng',
        },
        {
          id: 10,
          name: 'Heng',
        },
      ],
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
    Datepicker,
    CustomerList,
    FilterTag,
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
