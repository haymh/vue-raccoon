<template>
  <v-layout row justify-center style="position: relative;">
    <v-dialog v-model="dialog" width="500">
      <v-btn small slot="activator">Import
        <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <div class="headline">Upload vCard</div>
        </v-card-title>
        <v-card-text>
          {{ file.name }}
        </v-card-text>
        <v-card-actions>
          <UploadButton
            class="green--text darken-1"
            flat="flat"
            title="Upload"
            @files="filesSelected"
          ></UploadButton>
          <v-spacer></v-spacer>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
          <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import UploadButton from '../../../components/common/UploadButton.vue';

export default {
  name: 'ImportContactDialog',
  props: ['open'],
  data() {
    return {
      file: {},
      contacts: [],
    };
  },
  components: {
    UploadButton,
  },
  methods: {
    filesSelected(file) {
      console.log('files:', file);
      this.file = file;
    },
  },
};
</script>

