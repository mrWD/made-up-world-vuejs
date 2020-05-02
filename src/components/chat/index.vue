<template lang="pug">
  .chat
    Btn.chat__btn(@click="toggleChatList")
      svgicon(icon="chat")

    .chat__content(v-show="isChatVisisble")
      .chat__wrapper.chat__wrapper_cover(v-show="chatID")
        Btn.chat__close(isSmall @click="toggleChat(chatID)")
          svgicon(icon="cross")

        ul.chat__msg-list
          li.chat__msg(
            v-for="(msg, i) in msgListWithLogin"
            :class="{ 'chat__msg_right': msg.login === authInfo.login }"
            :key="i"
          )
            | {{ msg.text }}

        form.chat__form
          Field.chat__field(v-model="message" type="textarea" row="2")

          Btn.chat__msg-btn(isSmall @click="sendMessage") Send

      .chat__wrapper
        span(v-if="!chatListWithLogin || !chatListWithLogin[0]") You don't have chats

        ul.chat__dialog-list(v-else)
          li.chat__dialog(v-for="(item, i) in chatListWithLogin" :key="i")
            Btn.chat__dialog-btn(isSmall @click="toggleChat(item.id)") {{ item.login }}

</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

const socket = new WebSocket('ws://192.168.0.48:5000/');

export default Vue.extend({
  name: 'Chat',

  props: {
    token: {
      type: String,
    },
    authInfo: {
      type: Object,
    },
  },

  data() {
    return {
      isChatVisisble: false,
      message: null as string | null,
      chatID: '',
    };
  },

  computed: mapGetters('chats', ['chatListWithLogin', 'msgListWithLogin']),

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

    sendMessage(): void {
      if (!this.message) return;

      socket.send(JSON.stringify({
        chatID: this.chatID,
        token: this.token,
        text: this.message,
      }));

      this.message = '';
    },
  },

  created() {
    this.getChatList();
  },

  mounted() {
    socket.onmessage = (event) => {
      this.getMsg(event);
    };
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

  &__wrapper
    width: 300px
    padding: $vertical-indent $horizontal-indent
    background-image: url('../../assets/images/inner-bg.png')
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%

    &_cover
      position: absolute
      right: 0
      bottom: 0
      width: 320px

      +for-tablet-up
        width: 300px
        position: relative

  &__close
    position: absolute
    top: 10px
    right: 25px
    padding: 5px
    border-radius: 50%

  &__dialog-list
    display: flex
    flex-direction: column-reverse
    justify-content: flex-end
    height: 250px
    overflow-y: auto

  &__dialog
    display: block

    &:not(:first-child)
      margin-bottom: 5px

  &__dialog-btn
    width: 100%
    text-align: left

  &__msg-list
    display: flex
    flex-direction: column
    align-items: flex-start
    height: 300px
    margin-right: -15px
    padding-right: 15px
    overflow-y: auto

  &__msg
    display: block
    max-width: 50%
    margin-bottom: 15px
    padding: 5px 10px
    border-radius: 4px
    box-shadow: 0 0 10px $main-color-darkest
    background-color: $main-color
    font-size: $font-size
    font-weight: 600
    word-break: break-word
    color: $black

    &_right
      align-self: flex-end

  &__form
    display: flex

  &__field
    font-size: $font-size

</style>
