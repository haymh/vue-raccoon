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
    onKeypress(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    },
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
    <textarea placeholder="按 Enter 发送" v-model="content" @keyup="onKeyup" @keypress="onKeypress"></textarea>
    <div class="controls">
      <el-button type="text" class="send-button" @click.native="send">Send</el-button>
    </div>
</div>
</template>

<style scoped>
.ChatTextBox {
  height: 160px;
  margin: 0;
  border-top: solid 1px #ddd;
}

.ChatTextBox textarea {
  padding: 10px;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  margin-bottom: 0;
}
.ChatTextBox .send-button {
  height: 100%;
  font-weight: bold;
}
.controls{
  margin-top: 0;
  padding-top: 0;
  background-color: white;
  text-align: right;
}
</style>
