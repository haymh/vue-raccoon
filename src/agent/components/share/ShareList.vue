<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{title}}
      </p>
      <a class="card-header-icon" v-if="plus">
        <span class="icon">
          <i class="fa fa-plus"></i>
        </span>
      </a>
    </header>
    <div class="table-view">
      <table class="table is-striped is-narrow">
        <tr v-for="shareRecord in list">
            <td>{{shareRecord.shareTime}}</td>
            <td>{{shareRecord.createdAt}}</td>
            <td>{{shareRecord.title}}</td>
            <td>{{shareRecord.customer}}</td>
            <td class="is-icon" v-if="editable">
              <a href="#">
                <i class="fa fa-pencil"></i>
              </a>
            </td>
            <td class="is-icon" v-if="removable">
              <a href="#">
                <i class="fa fa-trash"></i>
              </a>
            </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style>
.table-view {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
  overflow-y: scroll;
}
</style>
<script>
export default {
  name: 'ShareList',
  data() {
    return {
      list: [
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
        {
          shareTime: 'Every week',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group A',
        },
        {
          shareTime: 'Every day',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Group B',
        },
        {
          shareTime: '2017/03/23',
          createdAt: '2017/02/22',
          title: 'New houses',
          customer: 'Jeremy',
        },
      ],
    };
  },
  props: {
    title: String,
    plus: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    removable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
