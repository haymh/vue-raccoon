<template>
  <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-model="selected" selected-key="_id" select-all class="elevation-1">
    <template slot="items" scope="props">
      <tr>
        <td>
          <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
        </td>
        <td class="text-xs-center">{{ props.item.firstName }}</td>
        <td class="text-xs-center">{{ props.item.lastName }}</td>
        <td class="text-xs-center">
          <v-chip v-for="(e, i) in props.item.emails" :key="i" class="indigo white--text">
            {{e.email}}
            <v-icon right>{{e.type}}</v-icon>
          </v-chip>
        </td>
        <td class="text-xs-center">
          <v-chip v-for="(p, i) in props.item.phones" :key="i" class="primary white--text">
            {{p.phone}}
            <v-icon right>{{p.type | toMIcon}}</v-icon>
          </v-chip>
        </td>
        <td class="text-xs-center">
          <v-chip v-for="(t, i) in props.item.types" :key="i" class="green white--text">
            {{t}}
          </v-chip>
        </td>
        <td class="text-xs-center">{{ props.item.lastTimeContact }}</td>
        <td class="text-xs-center" v-if="editable">
          <v-btn icon @click.native.stop="edit(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: 'ContactTable',
  data() {
    return {
      selected: [],
      headers: [
        {
          text: 'First Name',
          left: true,
          sortable: true,
          value: 'firstName',
          align: 'center',
        },
        { text: 'Last Name', value: 'lastName', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Phone', value: 'phone', align: 'center' },
        { text: 'Type', value: 'type', align: 'center' },
        { text: 'Last Time Contact', value: 'lastTimeContact', align: 'center' },
      ],
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    edit: Function,
    editable: {
      type: Boolean,
      default: false,
    },
    search: String,
  },
  filters: {
    toMIcon(text) {
      switch (text) {
        case 'cell':
          return 'smartphone';
        case 'home':
        case 'work':
          return text;
        default:
          return '';
      }
    },
  },
  watch: {
    selected: {
      handler() {
        this.$emit('onSelect', this.selected);
      },
    },
  },
};
</script>