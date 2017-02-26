<template>
  <div>
    <div class="container">
      <h1 class="title is-4 has-text-centered">
        Select Time And Customers
      </h1>
      <div class="section">
        <ShareSummary :shareObject="shareSetting"></ShareSummary>
      </div>
      <div class="section">
        <p class="control">
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="shareScheduleOptions.NOW"
                  v-model="shareScheduleType">
            Share Once Now
          </label>
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="shareScheduleOptions.DATE"
                  v-model="shareScheduleType">
            Share Once in Future
          </label>
          <label class="radio" v-show="byFilter">
            <input type="radio"
                  name="question"
                  :value="shareScheduleOptions.PERIODICAL"
                  v-model="shareScheduleType">
            Share every
          </label>
          <a class="button is-primary">Ok</a>
          <a class="button is-danger">Back</a>
        </p>
        <div class="datepicker" v-show="showOptions.showDatepicker">
          <Datepicker v-model="shareOnceOn"
                      :disabled="disableShareDate"></Datepicker>
        </div>
        <div v-show="showOptions.showFrequencyPicker">
          <span class="select">
            <select v-model="selectedShareFrequency">
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
import CustomerList from './components/customer/CustomerList.vue';
import ShareSummary from './components/share/ShareSummary.vue';
import { PERIODICAL_OPTIONS, SHARE_SCHEDULE_TYPES, Share, SHARE_HOUSE_TYPE } from './components/share/shareSchema';

const today = new Date();
const yesterday = new Date();

yesterday.setDate(today.getDate() - 1);
export default {
  name: 'ErrorPage',
  data() {
    return {
      byFilter: this.$route.params.byFilter === 'true',
      shareOnceOn: today,
      disableShareDate: {
        to: yesterday,
      },
      shareScheduleType: SHARE_SCHEDULE_TYPES.NOW,
      shareScheduleOptions: SHARE_SCHEDULE_TYPES,
      frequencyOptions: [
        PERIODICAL_OPTIONS.DAILY,
        PERIODICAL_OPTIONS.WEEKLY,
        PERIODICAL_OPTIONS.BI_WEEKLY,
        PERIODICAL_OPTIONS.MONTHILY,
      ],
      selectedShareFrequency: PERIODICAL_OPTIONS.DAILY,
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
  created() {
    console.log('by filter', this.byFilter, typeof this.byFilter);
  },
  components: {
    Datepicker,
    CustomerList,
    ShareSummary,
  },
  methods: {
    setShowSelected(showSelected) {
      this.showSelected = showSelected;
    },
  },
  computed: {
    ...mapGetters([
      'selectedHouses',
      'lastFilter',
      'selectedCustomers',
    ]),
    showOptions() {
      let showDatepicker = false;
      let showFrequencyPicker = false;
      switch (this.shareScheduleType) {
        case SHARE_SCHEDULE_TYPES.DATE:
          showDatepicker = true;
          break;
        case SHARE_SCHEDULE_TYPES.PERIODICAL:
          showFrequencyPicker = true;
          break;
        case SHARE_SCHEDULE_TYPES.NOW:
        default:
          break;
      }
      return {
        showDatepicker,
        showFrequencyPicker,
      };
    },
    shareSetting() {
      const shareObject = new Share();
      switch (this.shareScheduleType) {
        case SHARE_SCHEDULE_TYPES.DATE:
          shareObject.shareSchedule = {
            type: SHARE_SCHEDULE_TYPES.DATE,
            on: this.shareOnceOn,
          };
          break;
        case SHARE_SCHEDULE_TYPES.PERIODICAL:
          shareObject.shareSchedule = {
            type: this.selectedShareFrequency,
          };
          break;
        case SHARE_SCHEDULE_TYPES.NOW:
          shareObject.shareSchedule = {
            type: SHARE_SCHEDULE_TYPES.NOW,
          };
          break;
        default:
          break;
      }
      shareObject.houses = {
        type: this.byFilter ? SHARE_HOUSE_TYPE.BY_FILTER : SHARE_HOUSE_TYPE.LIST,
        filter: this.byFilter ? this.lastFilter : null,
        list: this.selectedHouses,
      };
      shareObject.customers = this.selectedCustomers;
      console.log(shareObject);
      return shareObject;
    },
  },
};
</script>
