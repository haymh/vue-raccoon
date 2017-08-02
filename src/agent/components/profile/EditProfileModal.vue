<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent>
      <v-btn round small primary dark slot="activator">Edit</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Agent Profile</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="First Name" required v-model="childData.firstName"></v-text-field>
          <v-text-field label="Middle Name" hint="Optional" persistent-hint></v-text-field>
          <v-text-field label="Last Name" required v-model="childData.lastName"></v-text-field>
          <v-text-field label="Email" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="handleDataFc">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<style lang="css">
</style>

<script>
export default {
  name: 'EditProfileModal',
  // props: {
  //   parentData: {
  //     type: Object,
  //     default() {
  //       return {};
  //     },
  //   },
  // },
  props: ['parentData'],
  data() {
    return {
      dialog: false,
      childData: {},
    };
  },
  methods: {
    handleDataFc() {
      this.dialog = false;
      console.log('child data: ', this.parentData.firstName);
      this.$emit('interface', this.childData);
    },
  },
  watch: {
    parentData: {
      handler(val) {
        this.childData = JSON.parse(JSON.stringify(val));
      },
    },
  },
};
</script>
