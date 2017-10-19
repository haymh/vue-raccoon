<template>
  <v-data-table :pagination.sync="pagination" v-bind="$attrs" :items="items" :headers="headers" v-model="selected" select-all class="elevation-1">
    <template slot="items" slot-scope="props">
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
      items: [],
      pagination: {},
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
  created() {
    this.calculateItems();
  },
  watch: {
    pagination: {
      handler() {
        console.log('pagination changed');
        this.calculateItems();
      },
      deep: true,
    },
    contacts: {
      handler() {
        // display the first page
        this.pagination.page = 1;
        this.calculateItems();
      },
      deep: true,
    },
    selected: {
      handler() {
        console.log('emit select');
        this.$emit('select', this.selected);
      },
      deep: true,
    },
  },
  props: {
    edit: Function,
    editable: {
      type: Boolean,
      default: false,
    },
    contacts: {
      type: Array,
      required: true,
    },
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
  methods: {
    calculateItems() {
      const { page, rowsPerPage } = this.pagination;
      console.log('page', page, 'rowsPerPage', rowsPerPage, 'contacts length', this.contacts.length);
      this.items = this.contacts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    },
  },
};
</script>