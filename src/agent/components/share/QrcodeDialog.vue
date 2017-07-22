<template>
  <v-dialog fullscreen :value="showQrcode">
    <v-btn small primary light slot="activator" :loading="isLoading" @click.native="generateLink">Generate QR Code</v-btn>
    <v-card>
      <v-card-title v-show="link === ''">Please Search House First</v-card-title>
      <v-card-text class="text-md-center">
        <qrcode :value="link" :size="150" v-show="link && link !== ''"></qrcode>
      </v-card-text>
      <v-card-text>
        <v-text-field :value="link" multi-line disabled></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn class="green--text darken-1" flat="flat" v-clipboard="link">Copy</v-btn>
        <v-btn class="green--text darken-1" flat="flat" @click.native="$emit('next')">Continue Share Schedule Setup</v-btn>
        <v-btn class="red--text darken-1" flat="flat" @click.native="updateVisibility(!showQrcode)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import qrcode from 'v-qrcode';

export default {
  name: 'QrcodeDialog',
  data() {
    return {};
  },
  model: {
    prop: 'showQrcode',
    event: 'show',
  },
  components: {
    qrcode,
  },
  props: {
    showQrcode: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    generateLink: Function,
    link: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateVisibility(val) {
      this.$emit('show', val);
    },
  },
};
</script>
