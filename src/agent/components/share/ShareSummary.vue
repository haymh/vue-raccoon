<template>
<div>
  <div :class="['modal', showModal ? 'is-active':'']">
    <div class="modal-background" @click="toggleModal"></div>
    <div class="modal-card" v-if="showModal">
      <section class="modal-card-body">
        <div v-html="email"></div>
      </section>
    </div>
  </div>
  <div class="columns">
    <div class="column is-3">
      <div v-for="c in lastFilter">
        <FilterTag :filterCondition="c"></FilterTag>
      </div>
      <a v-show="!shareObject.byFilter">{{selectedHouses.length}} houses</a>
    </div>
    <div class="column is-5">
      <div class="content" v-if="shareObject.shareScheduleType === SHARE_SCHEDULE_TYPES.NOW">
        <p>
          You are going to send <a href="#">{{numberOfHouse}} houses
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
      <a class="button is-primary" @click="toggleModal">preview</a>
    </div>
    <div class="column is-2">
      <a class="button is-danger" @click="sendShare">create</a>
    </div>
  </div>
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
  </div>
</div>
</template>
<style scoped>
.preview {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { generateQuery } from '../../../components/filter/filter-schema';
import FilterTag from '../../../components/filter/FilterTag.vue';
import { PERIODICAL_OPTIONS, SHARE_SCHEDULE_TYPES } from './shareSchema';
// import singleHouseTemplate from '../../email-templates/single-house.hbs';
// import singleHouseSchema from '../../email-templates/singleHouseSchema';
import multipleHouseTemplate from '../../email-templates/multiple-house.hbs';
import multipleHouseSchema from '../../email-templates/multipleHouseSchema';
import API from '../../../api';

export default {
  name: 'ShareSummary',
  data() {
    return {
      SHARE_SCHEDULE_TYPES,
      PERIODICAL_OPTIONS,
      showModal: false,
      emailSubject: '',
      shareTitle: '',
      shareDescription: '',
    };
  },
  created() {
    this.emailSubject = `I found some awesome houses in ${this.searchTerms.city}, ${this.searchTerms.state} for you!`;
    this.shareTitle = `I found some awesome houses in ${this.searchTerms.city}, ${this.searchTerms.state} for you!`;
    this.shareDescription = 'Hi,\nI hope all is well with you and you are seeing a few homes that peak your interest on the site. In case anything has changed, you can easily update your preferences in order to receive properties better catered to your search. Please reply to this email if you would like to be removed from e-Alerts, please reply to this email and I can do that for you!';
  },
  props: {
    shareObject: Object,
  },
  components: {
    FilterTag,
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    sendShare() {
      const obj = {
        uid: this.userId,
        sharedObject: {
          query: this.query,
          subject: this.emailSubject,
          emailFrom: 'jeremynangjizi@redoujiang.com',
          shareTo: {
            groupId: this.shareObject.groupId,
            customers: this.selectedCustomers,
          },
          shareMethod: {
            shareOn: this.shareObject.shareOn.toString(),
            shareScheduleType: this.shareObject.shareScheduleType,
            frequency: this.shareObject.frequency,
            emailContent: this.email,
          },
        },
      };
      console.log(obj);
      API.createShare(obj).then((data) => {
        console.log(data);
      });
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
    numberOfHouse() {
      if (this.shareObject.byFilter) {
        return this.filterResults.length;
      }
      return this.selectedHouses.length;
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
  },
};
</script>
