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
    <div class="card-header">
      <p class="control has-addons">
        <span class="label">Sort:</span>
        <span class="select">
          <select v-model="selectedOrder">
            <option
              v-for="item in order"
              :label="item"
              :value="item">
            </option>
          </select>
        </span>
      </p>
    </div>
    <div class="card-content table-view">
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
  height: 75%;
  overflow-x: auto;
}
</style>
<script>
export default {
  name: 'ShareList',
  data() {
    return {
      order: ['time', 'customer'],
      selectedOrder: 'time',
    };
  },
  props: {
    title: String,
    list: Array,
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
