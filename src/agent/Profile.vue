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
                        <v-card-media src="https://photos.zillowstatic.com/h_g/IS56ok2t3lllk60000000000.jpg" height="125px" contain></v-card-media>
                      </v-flex>
                      <v-flex xs6>
                        <div class="headline">{{fullName}}</div>
                        <v-layout row>
                          <v-flex xs6>
                            <div>All Activity</div>
                            <div>
                              <v-icon>star</v-icon>
                              <span>{{rating}}/5</span>
                              <div>{{numberOfReviews}} Reviews</div>
                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <div>In {{zipCode}}</div>
                            <div>{{numberOfRecentReveiws}} Reviews</div>
                            <div>{{numberOfRecentSale}} Recent Sale</div>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <!-- Social Media -->
                      <v-flex xs2>
                        <v-layout justify-center>
                          <a href="https://www.facebook.com/"><v-icon fa x-large class="blue--text text--darken-2">facebook-square</v-icon></a>
                        </v-layout>
                        <v-layout justify-center>
                          <a href="https://www.twitter.com/"><v-icon fa x-large class="blue--text text--darken-2">twitter-square</v-icon></a>
                        </v-layout>
                        <v-layout justify-center>
                          <a href="https://weixin.qq.com/"><v-icon fa x-large class="teal--text text--darken-2">weixin</v-icon></a>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
              <!-- About -->
              <v-flex xs12>
                <v-card class="blue lighten-4">
                  <v-card-title primary-title class="red lighten-4">
                    <div class="headline">{{about.title}}</div>
                  </v-card-title>
                  <v-container>
                    <div>{{about.content}}</div>
                  </v-container>
                </v-card>
              </v-flex>
              <!-- Active Listings -->
              <v-flex xs12>
                <v-card class="blue lighten-4">
                  <v-card-title primary-title class="red lighten-4">
                    <div class="headline">Active Listings</div>
                  </v-card-title>
                  <v-pagination v-bind:length.number="4" v-model="page" circle></v-pagination>
                </v-card>
              </v-flex>
              <!-- Ratings & Reviews -->
              <v-flex xs12>
                <v-card class="blue lighten-4">
                  <v-card-title primary-title class="red lighten-4">
                    <div class="headline">Ratings & Reviews</div>
                  </v-card-title>
                  <v-pagination v-bind:length.number="4" v-model="page" circle></v-pagination>
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
export default {
  name: 'Agent',
  data() {
    return {
      firstName: 'Eden',
      lastName: 'Lin',
      rating: 4,
      numberOfReviews: 50,
      zipCode: 94566,
      numberOfRecentReveiws: 5,
      numberOfRecentSale: 100,
      about: {
        title: 'Real Estate Professional (8 years experience)',
        content: 'I am a seasoned Realtor® who enjoys all things real estate; a Realtor® who is a good communicator, transparent in transactions, and a good negotiator.   I  take pride in working with buyers and sellers, whether they are first time home buyers or sellers, or buyers/sellers resizing or relocating.  Whether a two bedroom condo or a spectacular mansion, no property is treated differently because, to me, everyone is just as important.  ',
      },
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
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
</script>
