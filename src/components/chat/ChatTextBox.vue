<script>
export default {
  name: 'ChatTextBox',
  props: ['parent'],
  data() {
    return {
      content: '',
    };
  },
  methods: {
    onKeyup(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        this.send();
      }
    },
    send() {
      if (this.content.length > 0) {
        this.$emit('sendmessage', this.content);
        this.content = '';
      }
    },
  },
};
</script>

<template>
<div class="ChatTextBox">
    <v-text-field hide-details class="ma-0" label="Label Text" multi-line v-model="content" v-on:keyup="onKeyup">
    </v-text-field>
    <v-btn 
      class="pink"
      dark
      large
      absolute
      top
      right
      fab
      @click.native="send">
      <v-icon light>send</v-icon>
    </v-btn>
</div>
</template>

<style scoped>
.ChatTextBox {
  border-top: solid 1px #ddd;
}
</style>
