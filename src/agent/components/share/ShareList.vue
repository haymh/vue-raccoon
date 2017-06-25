<template>
<v-card>
  <v-card-title class="indigo light--text">
    {{title}}
    <v-spacer></v-spacer>
    <v-text-field
      light
      append-icon="search"
      label="Search"
      single-line
      hide-details
      v-model="search"
    ></v-text-field>
  </v-card-title>
  <v-card-row>
    <v-card-row actions class="indigo darken-2 light--text">
      <span v-if="selected.length > 0">
        <strong>{{selected.length}}</strong> entries are selected
      </span>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon class="white--text">delete</v-icon>
      </v-btn>
    </v-card-row>
  </v-card-row>
  <v-data-table
    v-bind:headers="headers"
    v-bind:items="items"
    v-bind:search="search"
    v-model="selected"
    selected-key="id"
    select-all
    class="elevation-1"
  >
    <template slot="items" scope="props">
      <td>
        <v-checkbox
          primary
          hide-details
          v-model="props.selected"
        ></v-checkbox>
      </td>
      <td  class="text-xs-right">{{ props.item.shareTime }}</td>
      <td  class="text-xs-right">{{ props.item.createdAt }}</td>
      <td>
        <v-edit-dialog
          @open="props.item._title = props.item.title"
          @cancel="props.item.title = props.item._title || props.item.title"
          lazy
        > {{ props.item.title }}
          <v-text-field
            slot="input"
            label="Edit"
            v-bind:value="props.item.title"
            v-on:change="val => props.item.title = val"
            single-line counter="counter"
          ></v-text-field>
        </v-edit-dialog>
      </td>
      <td  class="text-xs-right">{{ props.item.customer }}</td>
    </template>
  </v-data-table>
</v-card>

</template>
<script>
export default {
  data() {
    return {
      search: '',
      selected: [],
    };
  },
  props: ['headers', 'items', 'title'],
};
</script>

