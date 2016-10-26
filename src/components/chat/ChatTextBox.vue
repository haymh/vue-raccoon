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
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        // this.sendMessage(this.content);
        this.$emit('sendmessage', this.content);
        this.content = '';
      }
    },
  },
};
</script>

<template>
<div class="ChatTextBox">
  <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
</div>
</template>

<style scoped>
.ChatTextBox {
  height: 160px;
  border-top: solid 1px #ddd;
}

.ChatTextBox textarea {
  padding: 10px;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  font-family: "Micrsofot Yahei";
  resize: none;
}
</style>
