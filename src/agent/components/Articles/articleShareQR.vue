<template>
  <v-layout row justify-center style="position: relative;">
      <v-dialog v-model="dialog" lazy absolute>
        <v-btn icon slot="activator" @click.native="generateQRLink">
          <v-icon class="blue--text">fa-qrcode fa-2x</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <div class="headline">扫描分享</div>
          </v-card-title>
            <qrcode :value="link" :size="150"></qrcode>
            <router-link :to="link">{{ link }}</router-link>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
</template>
<script>
import { mapGetters } from 'vuex';
import qrcode from 'v-qrcode';
import API from '../../../api';

export default {
  name: 'articleShareQR',
  props: {
    articleInfo: Object,
  },
  computed: {
    ...mapGetters([
      'userId',
    ]),
  },
  components: {
    qrcode,
  },
  data() {
    return {
      inProgress: true,
      link: '',
      host: 'http://localhost:8081/articleShareView/',
    };
  },
  methods: {
    generateQRLink() {
      this.getShareId().then((shareId) => {
        console.log('got shareId', shareId);
        this.link = this.host + shareId;
      });
    },
    getShareId() {
      return API.getArticleShareId(this, this.userId, this.articleInfo._id)
        .then((response) => {
          console.log('shareId response', response);
          const articleShareInfo = {};
          articleShareInfo.articleId = this.articleInfo._id;
          articleShareInfo.createdBy = this.userId;
          if (response === 'ERROR') {
            API.createArticleShare(articleShareInfo).then((res) => {
              console.log('generated shareid', res);
              return res.body;
            });
          }
          return response.body;
        });
    },
  },
};
</script>
<style>
</style>
