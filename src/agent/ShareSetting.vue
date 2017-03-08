<template>
  <div>
    <div class="container">
      <h1 class="title is-4 has-text-centered">
        Select Time And Customers
      </h1>
      <div class="section">
        <ShareSummary :shareObject="shareObject"></ShareSummary>
      </div>
      <div class="section">
        <p class="control">
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="shareScheduleOptions.NOW"
                  v-model="shareObject.shareScheduleType">
            Share Once Now
          </label>
          <label class="radio">
            <input type="radio"
                  name="question"
                  :value="shareScheduleOptions.DATE"
                  v-model="shareObject.shareScheduleType">
            Share Once in Future
          </label>
          <label class="radio" v-show="shareObject.byFilter">
            <input type="radio"
                  name="question"
                  :value="shareScheduleOptions.PERIODICAL"
                  v-model="shareObject.shareScheduleType">
            Share every
          </label>
          <a class="button is-primary">Ok</a>
          <a class="button is-danger">Back</a>
        </p>
        <div class="datepicker" v-show="showOptions.showDatepicker">
          <Datepicker v-model="shareObject.shareOn"
                      :disabled="disableShareDate"></Datepicker>
        </div>
        <div v-show="showOptions.showFrequencyPicker">
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
import Datepicker from 'vuejs-datepicker';
import CustomerList from './components/customer/CustomerList.vue';
import ShareSummary from './components/share/ShareSummary.vue';
import { PERIODICAL_OPTIONS, SHARE_SCHEDULE_TYPES, Share } from './components/share/shareSchema';

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
        byFilter: this.$route.params.byFilter === 'true',
      }),
      shareScheduleOptions: SHARE_SCHEDULE_TYPES,
      showOptions: {
        showDatepicker: false,
        showFrequencyPicker: false,
      },
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
  created() {
    console.log('shareObject', this.shareObject);
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
  watch: {
    shareObject: {
      handler() {
        console.log(this.shareObject);
        switch (this.shareObject.shareScheduleType) {
          case SHARE_SCHEDULE_TYPES.DATE:
            this.showOptions.showDatepicker = true;
            this.showOptions.showFrequencyPicker = false;
            break;
          case SHARE_SCHEDULE_TYPES.PERIODICAL:
            this.showOptions.showDatepicker = false;
            this.showOptions.showFrequencyPicker = true;
            break;
          case SHARE_SCHEDULE_TYPES.NOW:
          default:
            break;
        }
      },
      deep: true,
    },
  },
};
</script>
