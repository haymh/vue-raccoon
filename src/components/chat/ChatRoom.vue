<template>
<div class="main">
  <div class="message">
    <!-- <pre>{{messageList}}</pre> -->
    <ul v-if="messageList">
      <li v-for="msg in messageList">
        <p class="time">
          <span>{{ msg.metadata.createdAt | time }}</span>
        </p>
        <div class="main" :class="{ self: isMsgMyself(msg) }">
          <!-- <img class="avatar" width="30" height="30" :src="item.self ? user.img : session.user.img" /> -->
          <div class="text">{{ msg.message }}</div>
        </div>
      </li>
    </ul>
  </div>
  <ChatTextBox v-on:sendmessage="sendMessage"></ChatTextBox>
</div>
</template>

<style scoped>
  .text {
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 0;
    left: 0;
  }

  .message {
    padding: 10px 15px;
    overflow-y: scroll;
    height: calc(100% - 180px);
  }

  .message li {
    margin-bottom: 15px;
  }

  .message .time {
    margin: 7px 0;
    text-align: center;
  }

  .message .time>span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
  }

  .message .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }

  .message .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 40px);
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;
  }

  .message .text:before {
    content: " ";
    position: absolute;
    top: 9px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fafafa;
  }

  .message .self {
    text-align: right;
  }

  .message .self .avatar {
    float: right;
    margin: 0 0 0 10px;
  }

  .message .self .text {
    background-color: #b2e281;
  }

  .message .self .text:before {
    right: inherit;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #b2e281;
  }
</style>
<script>
import { db, timeStamp } from '../../api/fire';
import ChatTextBox from './ChatTextBox.vue';

export default {
  name: 'ChatRoom',
  props: ['roomId', 'userId'],
  data() {
    return {
      messageList: [],
    };
  },
  filters: {
    time(date) {
      if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    },
  },
  directives: {
    'scroll-bottom': {
      update: (el) => {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      },
    },
  },
  components: { ChatTextBox },
  watch: {
    roomId: {
      handler() {
        console.log('roomId', this.roomId);
        if (this.roomId && this.roomId !== '') {
          this.$bindAsArray('messageList', db.ref(`/room/${this.roomId}/messages`));
        }
      },
    },
  },
  computed: {
  },
  methods: {
    isMsgMyself(message) {
      return message.metadata.from === this.userId;
    },
    sendMessage(message) {
      console.log('ok', message);
      const newMessage = {
        message,
        metadata: {
          createdAt: timeStamp,
          from: this.userId,
        },
      };
      this.$firebaseRefs.messageList.push(newMessage);
    },
  },
};
</script>
