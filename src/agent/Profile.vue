<template>
  <div id="profile">
    <v-container>
      <v-layout row>
        <v-flex xs7>
          <v-container grid-list-lg>
            <v-layout row wrap>
              <!-- Name Card -->
              <v-flex xs12>
                <v-card>
                  <v-container>
                    <v-layout row>
                      <v-flex xs4>
                        <v-card-media :src="profileImage" height="125px" contain></v-card-media>
                      </v-flex>
                      <v-flex xs6>
                        <div class="headline">
                          {{ fullName }}
                          <v-btn round small primary dark v-if="isAgentPageOwnedByUser" @click.native="showEditProfileModal = true">
                            Edit
                          </v-btn>
                          <EditProfileModal v-if="showEditProfileModal" @close="showEditProfileModal = false">
                            <h3 slot="header">custom header</h3>
                          </EditProfileModal>
                        </div>
                        <v-layout row>
                          <v-flex xs6>
                            <div>All Activity</div>
                            <div>
                              <v-icon>star</v-icon>
                              <span>{{ ratingDisplay }}</span>
                              <div>{{ numberOfReviewsDisplay }}</div>
                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <div>In {{ zipCode }}</div>
                            <div>{{ numberOfRecentReveiwsDisplay }}</div>
                            <div>{{ numberOfRecentSaleDisplay }}</div>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <!-- Social Media -->
                      <v-flex xs2>
                        <v-layout justify-center>
                          <a href="https://www.facebook.com/">
                            <v-icon fa x-large class="blue--text text--darken-2">facebook-square</v-icon>
                          </a>
                        </v-layout>
                        <v-layout justify-center>
                          <a href="https://www.twitter.com/">
                            <v-icon fa x-large class="blue--text text--darken-2">twitter-square</v-icon>
                          </a>
                        </v-layout>
                        <v-layout justify-center>
                          <a href="https://weixin.qq.com/">
                            <v-icon fa x-large class="teal--text text--darken-2">weixin</v-icon>
                          </a>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
              <!-- About -->
              <v-flex xs12>
                <v-card class="blue-grey darken-2 white--text">
                  <v-card-title primary-title class="blue darken-2">
                    <div class="headline">{{ aboutTitle }}</div>
                  </v-card-title>
                  <v-container>
                    <div>{{ aboutContent }}</div>
                  </v-container>
                </v-card>
              </v-flex>
              <!-- Listings in Zipcode -->
              <v-flex xs12>
                <v-card class="blue-grey darken-2 white--text">
                  <v-card-title primary-title class="blue darken-2">
                    <div class="headline">Listings in {{ zipCode }}</div>
                  </v-card-title>
                  <v-pagination v-bind:length="4" v-model="page" circle></v-pagination>
                </v-card>
              </v-flex>
              <!-- Ratings & Reviews -->
              <v-flex xs12>
                <v-card class="blue-grey darken-2 white--text">
                  <v-card-title primary-title class="blue darken-2">
                    <div class="headline">Ratings & Reviews</div>
                  </v-card-title>
                  <v-pagination v-bind:length="4" v-model="page" circle></v-pagination>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs5>
          TBD
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="css">
.icon--x-large {
  font-size: 3rem !important;
}
</style>

<script>
import { mapGetters } from 'vuex';
import { db } from '../api/fire';
import EditProfileModal from './EditProfileModal.vue';
// import API from '../api';
// import Pagination from '../components/list/Pagination.vue';

export default {
  name: 'Agent',
  data() {
    return {
      page: 4,
      showEditProfileModal: false,
      // firstName: this.agent.firstName,
      // lastName: 'Lin',
      // profileImage: 'https://photos.zillowstatic.com/h_g/IS56ok2t3lllk60000000000.jpg',
      rating: 4,
      numberOfReviews: 50,
      zipCode: 94566,
      numberOfRecentReveiws: 5,
      numberOfRecentSale: 100,
      // about: {
      //   title: 'Real Estate Professional (8 years experience)',
      //   content: 'a Realtor® who is a good communicator.',
      // },
      activeListing: [],
      pastSales: [],
      reviews: [
        {
          rating: 5,
          content: 'I am a first time home buyer and glad that I had Esther helping me through the process.  She always promptly responded to our questions at any time.  She is very knowledgeable about the local real estate market.  Before we presenting our offer, she helped us to learn more about an “invisible” value   of a property and emotions from buyers and sellers.   She negotiated a lower than listing price and seller repairs.  Esther is confident and professional and yet very easy to work with.  She not only go “extra mile” for her clients but has a very good working relationship with her colleague.   She just has the ability to draw in all parties working together pleasantly.   On the day of closing, Esther showed her thoughtfulness; she arranged a professional cleaning crew to have a whole house, top to bottom, cleaned.  When I opened the door, I pleasantly saw the house and windows including the skylight window were spotless, and it smelt fresh!   I have a realtor in life!   I will have no hesitation to refer Esther to any of my friends who needs to buy or sell!',
          createtAt: '01/01/2017',
          updatedAt: '07/01/2017',
        },
      ],
    };
  },
  components: {
    EditProfileModal,
  },
  // watch: {
  //   agentId: {
  //     handler(newVal) {
  //       if (newVal) {
  //         this.$bindAsObject('agent', db.ref(`/agents/${newVal}`));
  //       }
  //     },
  //   },
  // },
  beforeCreate() {
    // get id from router
    // bind
    console.log('User ID: ', this.userId);
    console.log('Agent ID: ', this.$route.params.agentId);

    this.$bindAsObject('agent', db.ref(`/agents/${this.$route.params.agentId}`));
    // API.searchHouse({ county: 'Los Angeles' }).then((results) => {
    //   console.log(results);
    // });
    // console.log('agent data: ', this.agent);
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
    fullName() {
      const firstName = this.agent.firstName || '';
      const lastName = this.agent.lastName || '';
      const fullName = (firstName || lastName) ? `${firstName} ${lastName}` : 'John Doe';

      return fullName;
    },
    aboutTitle() {
      return (this.agent.about && this.agent.about.title) || 'nothing';
    },
    aboutContent() {
      return (this.agent.about && this.agent.about.content) || 'nothing';
    },
    profileImage() {
      return this.agent.profileImage || 'http://www.chymfm.com/wp-content/uploads/sites/8/2016/04/question-mark-face-593x315.jpg';
    },
    isAgentPageOwnedByUser() {
      return this.$route.params.agentId === this.userId;
    },
    ratingDisplay() {
      return this.rating ? `${this.rating}/5` : 'No Rating Yet';
    },
    numberOfReviewsDisplay() {
      return `${this.numberOfReviews ? this.numberOfReviews : 0} Reviews`;
    },
    numberOfRecentReveiwsDisplay() {
      return `${this.numberOfRecentReveiws ? this.numberOfRecentReveiws : 0} Recent Reviews`;
    },
    numberOfRecentSaleDisplay() {
      return `${this.numberOfRecentSale ? this.numberOfRecentSale : 0} Recent Sale`;
    },
    agentSaleRecords() {
      return {};
    },
  },
  method: {
    updateAgentProfile() {
      this.agent.firstName = 'Eden';
    },
  },
};
</script>
