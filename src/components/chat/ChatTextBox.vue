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
    <v-text-field hide-details class="ma-0" label="Label Text" multi-line v-model="content" v-on:keyup="onKeyup"></v-text-field>
    <v-btn floating primary @click.native="send" class="send-button">
      <v-icon light>send</v-icon>
    </v-btn>
</div>
</template>

<style scoped>
.ChatTextBox {
  border-top: solid 1px #ddd;
  position: relative;
}

.ChatTextBox .send-button {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 5px;
  margin: 10px;
  z-index: 1;
}
</style>
