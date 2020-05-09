<template lang="pug">
  .chat
    Btn.chat__btn(@click="toggleChatList")
      svgicon(icon="chat")

    .chat__content(v-show="isChatVisisble")
      MsgList(
        v-show="chatID"
        :msgList="msgListWithLogin"
        :authLogin="authInfo.login"
        @close="toggleChat(chatID)"
        @sendMsg="sendMessage"
      )

      ChatList(
        :chatList="chatListWithLogin"
        @click="toggleChat"
        @close="toggleChatList"
      )

</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import ChatList from './ChatList.vue';
import MsgList from './MsgList.vue';

export default Vue.extend({
  name: 'Chat',

  props: {
    token: {
      type: String,
    },
    authInfo: {
      type: Object as () => ({ login: string }),
    },
  },

  data() {
    return {
      isChatVisisble: false,
      message: null as string | null,
      chatID: '',
      socket: new WebSocket(process.env.VUE_APP_CHAT_URL),
    };
  },

  computed: mapGetters('chats', ['chatListWithLogin', 'msgListWithLogin', 'currentChat']),

  methods: {
    ...mapActions('chats', ['getChatList', 'getMsgList', 'getMsg']),

    toggleChatList(): void {
      this.isChatVisisble = !this.isChatVisisble;
    },

    toggleChat(value: string): void {
      if (this.chatID !== value) {
        this.chatID = value;

        this.getMsgList(value);
      } else {
        this.chatID = '';
      }
    },

    sendMessage(text: string): void {
      if (text) {
        this.socket.send(JSON.stringify({
          chatID: this.chatID,
          token: this.token,
          text,
        }));
      }
    },
  },

  watch: {
    currentChat: {
      immediate: true,
      handler(value) {
        if (value) {
          this.isChatVisisble = true;

          this.toggleChat(value);
        }
      },
    },
  },

  created() {
    this.getChatList();
  },

  mounted() {
    this.socket.onmessage = this.getMsg;
  },

  components: {
    ChatList,
    MsgList,
  },
});

</script>

<style lang="sass">
$vertical-indent: 40px
$horizontal-indent: 30px

.chat
  position: fixed
  bottom: 40px
  right: 40px

  &__btn
    border-radius: 50%

  &__content
    position: absolute
    bottom: 100%
    right: -40px
    display: flex
    align-items: flex-end

    +for-tablet-up
      bottom: 0
      right: 100%

</style>
