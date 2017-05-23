<template>
  <div>
    <div class="container">
      <h1 class="title is-4 has-text-centered">
        Select Time And Customers
      </h1>
      <div class="section">
        <div class="columns">
          <div class="column is-3">
            <div v-for="c in lastFilter">
              <FilterTag :filterCondition="c"></FilterTag>
            </div>
          </div>
          <div class="column is-5">
            <div class="content" v-if="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.NOW">
              <p>
                You are going to send <a href="#">{{numberOfHouse}}
                <span class="icon"><i class="fa fa-home"></i></span></a>
                to <a href="#">{{selectedCustomers.length}} customers
                <span class="icon"><i class="fa fa-users"></i></span></a> <strong>now</strong>.
              </p>
            </div>
            <div class="content" v-else-if="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
              <p>
                You are going to send <a href="#">{{numberOfHouse}} houses
                <span class="icon"><i class="fa fa-home"></i></span></a>
                to <a href="#">{{selectedCustomers.length}} customers
                <span class="icon"><i class="fa fa-users"></i></span></a> on <strong>{{shareObject.shareMethod.shareOn}}</strong>
              </p>
            </div>
            <div class="content" v-else-if="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
              <p>
                You are going to send <a href="#">{{numberOfHouse}} houses
                <span class="icon"><i class="fa fa-home"></i></span></a>
                to <a href="#">{{selectedCustomers.length}} customers
                <span class="icon"><i class="fa fa-users"></i></span></a> <strong>{{frequency}}</strong>
              </p>
            </div>
          </div>
          <div class="column is-2">
            <a class="button is-danger" @click="sendShare">create</a>
          </div>
        </div>
      </div>
      <div class="section">
        <p class="control">
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="SHARE_SCHEDULE_TYPES.NOW"
                  v-model="shareObject.shareMethod.shareScheduleType">
            Share Once Now
          </label>
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="SHARE_SCHEDULE_TYPES.DATE"
                  v-model="shareObject.shareMethod.shareScheduleType">
            Share Once in Future
          </label>
          <label class="radio" v-show="byFilter">
            <input type="radio"
                  name="question"
                  :value="SHARE_SCHEDULE_TYPES.PERIODICAL"
                  v-model="shareObject.shareMethod.shareScheduleType">
            Share every
          </label>
        </p>
        <div class="datepicker" v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
          <Datepicker v-model="shareObject.shareMethod.shareOn"
                      :disabled="disableShareDate"></Datepicker>
        </div>
        <div v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <span class="select">
            <select v-model="shareObject.shareMethod.frequency">
              <option
                v-for="item in frequencyOptions"
                :label="item"
                :value="item">
              </option>
            </select>
          </span>
        </div>
        <div v-show="shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE || shareObject.shareMethod.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <span class="select">
            <select v-model="shareObject.time">
              <option
                      v-for="item in timeOptions"
                      :label="item"
                      :value="item">
              </option>
            </select>
          </span>
        </div>
      </div>
      <div class="section">
        <div class="tabs">
          <ul>
            <li v-bind:class="{'is-active': !showSelected}"><a @click="setShowSelected(false)">Customer List</a></li>
            <li v-bind:class="{'is-active': showSelected}"><a @click="setShowSelected(true)">Selected Customers</a></li>
            <li>
              <p class="control has-addons">
                <label class="label">Groups</label>
                <span class="select">
                  <select v-model="selectedGroup">
                    <option v-for="item in groups"
                      :label="item"
                      :value="item">
                    </option>
                  </select>
                </span>
              </p>
            </li>
          </ul>
        </div>
        <CustomerList :showSelected="showSelected" :customerList="customerList"></CustomerList>
      </div>
    </div>
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
      selectedGroup: 'all customers',
      groups: [
        'all customers',
        'group A',
        'group B',
        'group C',
        'group D',
        'group E',
      ],
      showSelected: false,
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
