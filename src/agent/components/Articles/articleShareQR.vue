<template>
  <v-layout row justify-center style="position: relative;">
      <v-dialog v-if="!user.isTemp" lazy absolute>
        <v-btn icon slot="activator" @click.native="generateQRLink">
          <v-icon class="blue--text">fa-qrcode fa-2x</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <div class="headline">扫描分享</div>
          </v-card-title>
          <v-card-text class="text-xs-center">
            <qrcode :value="link" :size="200"></qrcode>
            <v-chip label small class="primary white--text">
              <v-icon left>link</v-icon>
              <a class="body-1 white--text" target="_blank" v-bind:href="link">预览</a>
            </v-chip>
          </v-card-text>
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
    articleId: String,
  },
  computed: {
    ...mapGetters([
      'user',
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
      API.getOrCreateArticleShareId(this.user.id, this.articleId)
        .then((response) => {
          console.log('getshareId racoon', response);
          this.link = this.host + response;
        });
    },
  },
};
</script>
