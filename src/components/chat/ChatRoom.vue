<template>
<div class="ChatRoom">
  <div class="topbar row">
    <p>
      {{ (friend || { nickName: ''}).nickName }}
    </p>
  </div>
  <div class="message" v-scroll-bottom>
    <ul v-if="messageList">
      <li v-for="(msg, index) in messageList">
        <p class="time" v-show="shouldDisplayTimeStamp(msg, index)">
          <span>{{ msg.sentAt | time }}</span>
        </p>
        <div class="main" :class="{ self: isMsgMyself(msg) }">
          <img class="avatar" width="40" height="40" :src="isMsgMyself(msg) ? user.avatar : friend.avatar" />
          <div class="text">
            <p>
              {{ msg.content }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <ChatTextBox v-on:sendmessage="sendMessage"></ChatTextBox>
</div>
</template>

<style>
  .topbar {
    margin: 0px 0px;
    height: 40px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
  .topbar p {
    margin: auto;
    text-align: center;
  }
  .ChatTextBox {
    position: absolute;
    width: 100%;
    height: 10%;
    bottom: 0;
    left: 0;
  }

  .message {
    padding: 10px 15px;
    overflow-y: scroll;
    height: calc(100% - 200px);
  }

  .message ul {
    list-style-type: none;
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
    border-radius: 50%;
  }

  .message .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 40px);
    min-height: 30px;
    line-height: 2.5;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 6px;
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
  props: ['roomId', 'userId', 'user', 'friend'],
  data() {
    return {
      messageList: [],
    };
  },
  filters: {
    time(date) {
      if (typeof date === 'string' || typeof date === 'number') {
        const d = new Date(date);
        return `${d.toLocaleDateString()}, ${d.toLocaleTimeString()}`;
      }
      return null;
    },
  },
  directives: {
    'scroll-bottom': {
      componentUpdated: (el) => {
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
          this.$bindAsArray('messageList', db.ref(`/messages/${this.roomId}`));
          this.$bindAsObject('roomMemberFriendUnread', db.ref(`/rooms/${this.roomId}/members/${this.friend['.key']}/unread`));
        }
      },
    },
  },
  computed: {
  },
  methods: {
    isMsgMyself(message) {
      return message.sentBy === this.userId;
    },
    shouldDisplayTimeStamp(msg, index) {
      const currentMsgSentAt = msg.sentAt;
      if (index === 0) {
        return true;
      }
      const lastMsg = this.messageList[index - 1];
      if (lastMsg) {
        const lastMsgSentAt = lastMsg.sentAt;
        return currentMsgSentAt - lastMsgSentAt > 300000;
      }
      return false;
    },
    sendMessage(message) {
      console.log('ok', message);
      const newMessage = {
        content: message,
        sentAt: timeStamp,
        sentBy: this.userId,
      };
      this.$firebaseRefs.messageList.push(newMessage);
      this.updateUnreadCount();
    },
    updateUnreadCount() {
      let count = this.roomMemberFriendUnread['.value'];
      if (count) {
        count += 1;
      } else {
        count = 1;
      }
      console.log('unread ', count);
      this.$firebaseRefs.roomMemberFriendUnread.set(count);
    },
  },
};
</script>
