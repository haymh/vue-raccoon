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
            <div class="content" v-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.NOW">
              <p>
                You are going to send <a href="#">{{numberOfHouse}}
                <span class="icon"><i class="fa fa-home"></i></span></a>
                to <a href="#">{{selectedCustomers.length}} customers
                <span class="icon"><i class="fa fa-users"></i></span></a> <strong>now</strong>.
              </p>
            </div>
            <div class="content" v-else-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
              <p>
                You are going to send <a href="#">{{numberOfHouse}} houses
                <span class="icon"><i class="fa fa-home"></i></span></a>
                to <a href="#">{{selectedCustomers.length}} customers
                <span class="icon"><i class="fa fa-users"></i></span></a> on <strong>{{shareObject.shareOn}}</strong>
              </p>
            </div>
            <div class="content" v-else-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
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
                  v-model="shareObject.shareScheduleType">
            Share Once Now
          </label>
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="SHARE_SCHEDULE_TYPES.DATE"
                  v-model="shareObject.shareScheduleType">
            Share Once in Future
          </label>
          <label class="radio" v-show="byFilter">
            <input type="radio"
                  name="question"
                  :value="SHARE_SCHEDULE_TYPES.PERIODICAL"
                  v-model="shareObject.shareScheduleType">
            Share every
          </label>
        </p>
        <div class="datepicker" v-show="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.DATE">
          <Datepicker v-model="shareObject.shareOn"
                      :disabled="disableShareDate"></Datepicker>
        </div>
        <div v-show="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.PERIODICAL">
          <span class="select">
            <select v-model="shareObject.frequency">
              <option
                v-for="item in frequencyOptions"
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
import { generateQuery } from '../components/filter/filter-schema';
import FilterTag from '../components/filter/FilterTag.vue';
import CustomerList from './components/customer/CustomerList.vue';
import { PERIODICAL_OPTIONS, SHARE_SCHEDULE_TYPES, Share } from './components/share/shareSchema';
import API from '../api';

const today = new Date();
const yesterday = new Date();

yesterday.setDate(today.getDate() - 1);
export default {
  name: 'ErrorPage',
  data() {
    return {
      disableShareDate: {
        to: yesterday,
      },
      shareObject: new Share({
        shareScheduleType: SHARE_SCHEDULE_TYPES.SHARE_NOW,
        shareOn: today,
        frequency: PERIODICAL_OPTIONS.NOW,
      }),
      SHARE_SCHEDULE_TYPES,
      frequencyOptions: [
        PERIODICAL_OPTIONS.DAILY,
        PERIODICAL_OPTIONS.WEEKLY,
        PERIODICAL_OPTIONS.BI_WEEKLY,
        PERIODICAL_OPTIONS.MONTHILY,
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
    ]),
    numberOfHouse() {
      if (this.byFilter) {
        console.log('by filter');
        return `all houses (${this.filterResults.length}) in ${this.searchTerms.city}, ${this.searchTerms.state}`;
      }
      return `${this.selectedHouses.length} houses`;
    },
    frequency() {
      switch (this.shareObject.frequency) {
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
    query() {
      const query = generateQuery(this.lastFilter);
      if (this.searchTerms && this.searchTerms.state) {
        query['address.stateOrProvince'] = (new RegExp(`^${this.searchTerms.state}$`, 'i')).toString();
        if (this.searchTerms.county) {
          query.county = (new RegExp(`^${this.searchTerms.county}$`, 'i')).toString();
        } else {
          query.city = (new RegExp(`^${this.searchTerms.city}$`, 'i')).toString();
        }
      }
      console.log('QUERY', query);
      return query;
    },
  },
  created() {
    console.log('shareObject', this.shareObject);
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
      const obj = {
        uid: this.userId,
        sharedObject: {
          query: this.query,
          subject: this.shareEmail.subject,
          emailFrom: 'jeremynangjizi@redoujiang.com',
          shareTo: {
            groupId: this.shareObject.groupId,
            customers: this.selectedCustomers,
          },
          shareMethod: {
            shareOn: this.shareObject.shareOn.toString(),
            shareScheduleType: this.shareObject.shareScheduleType,
            frequency: this.shareObject.frequency,
            emailContent: this.shareEmail.content,
          },
        },
      };
      console.log(obj);
      API.createShare(obj).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
