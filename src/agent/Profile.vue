<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md3 class="pa-0">
        <v-card :tile="true" height="100%">
          <v-card-media :src="profileImage" height="300px" contain></v-card-media>
          <v-card-title primary-title class="pa-2">
            <div>
              <div>
                <span class="headline mb-1">{{ fullName }}</span>
                <EditProfileModal :parentData="agent" @interface="updateAgentProfile"></EditProfileModal>
              </div>
              <div>{{ phoneNumber }}</div>
              <div>
                <b>Specialties:</b> {{ specialties }}</div>
              <div>
                <b>License Number(s):</b> {{ licenseNumbers }}</div>
            </div>
          </v-card-title>
          <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn icon v-for="sm in socialMedia" :key="sm.title" href="sm.src">
              <v-icon x-large>{{ sm.icon }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md9 class="pa-0">
        <v-carousel :cycle="false" style="cursor: pointer;">
          <v-carousel-item v-for="featuredHouse in featuredHouses" :src="featuredHouse.image" :key="featuredHouse._id">
            <div class="title">
              <div class="mb-1">
                {{ featuredHouse.title }}
              </div>
              <div class="mb-1">
                {{ featuredHouse.price }}
              </div>
              <div class="mb-1">
                {{ featuredHouse.beds }} beds * {{ featuredHouse.baths }} baths * {{ featuredHouse.sizeInSF }} sqft
              </div>
              <div class="mb-1">
                {{ featuredHouse.location }}
              </div>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <!-- tabs -->
      <v-flex xs12 class="pa-0">
        <v-tabs dark grow v-model="active">
          <v-tabs-bar slot="activators" class="cyan">
            <v-tabs-slider class="yellow"></v-tabs-slider>
            <v-tabs-item v-for="tab in tabs" :key="tab" :href="'#' + tab" ripple>
              {{ tab }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-content id="About">
            <About :agent="agent"></About>
          </v-tabs-content>
          <v-tabs-content id="Articles">
            <Article></Article>
          </v-tabs-content>
          <v-tabs-content id="Activities">
            <Activity></Activity>
          </v-tabs-content>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.title {
  position: absolute;
  left: 0px;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1em;
  padding: 10px;
}

.profileImageFrame {
  height: 500px !important;
}
</style>

<script>
import { mapGetters } from 'vuex';
// import { db } from '../api/fire';
import API from '../api';
import EditProfileModal from './components/profile/EditProfileModal.vue';
import About from './components/profile/About.vue';
import Article from './components/profile/Article.vue';
import Activity from './components/profile/Activity.vue';
// import Pagination from '../components/list/Pagination.vue';

export default {
  name: 'Agent',
  data() {
    return {
      agent: {
        firstName: 'Eden',
        middleName: '',
        lastName: 'Lin',
        contactable: {
          socialMedia: [
            {
              title: 'weixin',
              link: 'edenlin18',
            },
            {
              title: 'twitter',
              link: 'edenlin18',
            },
            {
              title: 'facebook',
              link: 'edenlin18',
            },
          ],
          email: [
            {
              type: 'work',
              link: 'edenlin18@gmail.com',
            },
            {
              type: 'home',
              link: 'edenlin18@hotmail.com',
            },
          ],
          phone: '(626) 688-1851',
          website: 'facebook.com',
        },
        specialty: ['Buyer\'s Agent', 'Listing Agent', 'Relocation'],
        activeZipcode: [91006, 94566, 92007],
        licenseNumber: ['#01201349', '#012013245'],
        about: 'Hi all, I am Eden Lin',
        yearOfExperiece: 5,
        language: ['Mandarin', 'English'],
        associatedCompany: {
          name: '',
          address: {
            address1: '3819 Vineyard Ave',
            address2: 'APT 42',
            city: 'Pleasanton',
            state: 'CA',
            zipcode: '94566',
          },
        },
      },
      featuredHouses: [{
        image: 'https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg',
        _id: 'house1',
        title: 'Huge House in Pleasanton',
        price: '170000',
        location: 'Pleasanton, CA 94588',
        beds: '3',
        baths: '2.5',
        sizeInSF: '1250',
      }, {
        image: 'https://s-media-cache-ak0.pinimg.com/736x/a4/8c/d6/a48cd68cb85fa6a82beb7085dd9fc085--open-floor-house-plans-dream-house-plans.jpg',
        _id: 'house2',
        title: 'This is the best house in the market!',
        price: '439000',
        location: 'Pleasanton, CA 94566',
        beds: '4',
        baths: '3.5',
        sizeInSF: '1850',
      }],
      tabs: ['About', 'Articles', 'Activities'],
      active: null,
    };
  },
  props: ['agentId'],
  components: {
    EditProfileModal,
    About,
    Article,
    Activity,
  },
  created() {
    // get id from router and bind
    console.log('User ID: ', this.userId);
    console.log('Agent ID: ', this.agentId);

    // this.$bindAsObject('agent', db.ref(`/agents/${this.agentId}`));
    API.searchHouse({ zip: 91006 }).then((results) => {
      console.log(results);
    });
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
    phoneNumber() {
      let result = 'N/A';
      if (this.agent && this.agent.contactable && this.agent.contactable.phone) {
        result = this.agent.contactable.phone;
      }
      return result;
    },
    specialties() {
      let result = 'N/A';
      if (this.agent && this.agent.specialty) {
        result = this.formatList(this.agent.specialty, ', ', ', and ');
      }

      return result;
    },
    licenseNumbers() {
      let result = 'N/A';
      if (this.agent && this.agent.licenseNumber) {
        result = this.formatList(this.agent.licenseNumber, ', ', ', and ');
      }

      return result;
    },
    socialMedia() {
      const result = [];
      if (this.agent && this.agent.contactable && this.agent.contactable.socialMedia) {
        this.agent.contactable.socialMedia.forEach((sm) => {
          result.push({
            title: sm.title,
            icon: this.getSocialMediaIcon(sm.title),
            src: sm.link,
          });
        });
      }

      return result;
    },
    profileImage() {
      return this.agent.profileImage || 'https://kathypoundsteam.com/wp-content/uploads/2016/08/jaime-sticker-picture.jpg';
    },
    isAgentPageOwnedByUser() {
      return this.$route.params.agentId === this.userId;
    },
  },
  methods: {
    formatList(a, del, lastDel) {
      return [a.slice(0, -1).join(del), a.slice(-1)[0]].join(a.length < 2 ? '' : lastDel);
    },
    updateAgentProfile(agent) {
      this.agent = agent;
    },
    getSocialMediaIcon(title) {
      const socialMediaIcon = {
        weixin: 'fa-weixin',
        twitter: 'fa-twitter-square',
        facebook: 'fa-facebook-square',
      };

      return socialMediaIcon[title];
    },
  },
};
</script>
