<template>
<v-layout row wrap>
  <v-flex xs12 md6 class="ma-2">
    <v-card>
      <v-card-title class="blue white--text">
        <span class="white--text">Your Share</span>
        <v-spacer></v-spacer>
        <v-menu id="space" bottom left origin="top right" transition="v-scale-transition">
          <v-btn icon="icon" slot="activator" class="white--text">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Create New</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Send Feedback</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
    </v-card>
    <v-expansion-panel expand>
      <v-expansion-panel-content key="0">
        <div slot="header">预定分享</div>
        <ShareList
          title="预定分享" 
          :headers="headers"
          :items="list"
          :plus="true"
          :removable="true"
          :editable="true">
        </ShareList>
      </v-expansion-panel-content>
      <v-expansion-panel-content key="1">
        <div slot="header">历史分享</div>
        <ShareList
          title="预定分享" 
          :headers="headers"
          :items="list"
          :plus="true"
          :removable="true"
          :editable="true">
        </ShareList>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-flex>
  <v-flex xs12 md5 class="ma-2">
    <div>something else</div>
  </v-flex>
    
</v-layout>
</template>

<style>
</style>

<script>
import ShareList from '../agent/components/share/ShareList.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      headers: [
        {
          text: 'Share Schedule',
          left: true,
          sortable: true,
          value: 'shareTime',
        },
        { text: 'Created At', value: 'created' },
        { text: 'Share Title', value: 'title' },
        { text: 'Customer Group', value: 'customer' },
      ],
      list: [
        {
          id: 1,
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          id: 2,
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          id: 3,
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          id: 4,
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          id: 5,
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          id: 6,
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          id: 7,
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          id: 8,
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          id: 9,
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          id: 10,
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          id: 11,
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          id: 12,
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
      ],
    };
  },
  components: {
    ShareList,
  },
};
</script>
