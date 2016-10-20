<template>
  <div id='list'>
    <list-basic-info id='basic-info'></list-basic-info>
    <list-gallery id='images'></list-gallery>
    <list-detail-info id='detail-info'></list-detail-info>
    <list-actions id="actions"></list-actions>
  </div>
</template>

<style scoped>
#list {
  width: 600px;
  height: 257px;
  box-shadow: 2px 2px 1px #888888;
  border-style: solid;
  border-width: 1px;
  border-color: #888888;
}
#images {
  width: 300px;
  height: 100%;
}
#basic-info {
  position: absolute;
  width: 300px;
  bottom: 0px;
}
#detail-info {
  position: absolute;
  width: 300px;
  right: 0px;
  top: 0px;
}
#actions {
  position: absolute;
  width: 300px;
  bottom: 0px;
  right: 0px;
}
</style>

<script>
import Gallery from './gallery.vue';
import BasicInfo from './basicInfo.vue';
import DetailInfo from './detailInfo.vue';
import ListActions from './listActions.vue';

export default {
  name: 'List',
  el: '#list',
  components: {
    'list-gallery': Gallery,
    'list-basic-info': BasicInfo,
    'list-detail-info': DetailInfo,
    'list-actions': ListActions,
  },
};
</script>
