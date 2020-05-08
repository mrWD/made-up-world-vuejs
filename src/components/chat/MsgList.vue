<template lang="pug">
  .msg-list
    Btn.msg-list__close(isSmall @click="$emit('close')")
      svgicon(icon="cross")

    span.msg-list__text(v-if="!msgList || !msgList[0]") Write the first message

    ul.msg-list__content(v-else)
      li.msg-list__item(
        v-for="(msg, i) in msgList"
        :class="{ 'chat__item_right': msg.login === authLogin }"
        :key="i"
      )
        | {{ msg.text }}

    form.msg-list__form
      Field.msg-list__field(v-model="message" type="textarea" row="2")

      Btn.msg-list__btn(isSmall @click="sendMessage") Send

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MsgList',

  props: {
    authLogin: {
      type: String,
    },
    msgList: {
      type: Array as () => Array<{}>,
    },
  },

  data() {
    return {
      message: null,
    };
  },

  methods: {
    sendMessage(): void {
      this.$emit('send', this.message);

      this.message = null;
    },
  },
});

</script>

<style lang="sass">
.msg-list
  position: absolute
  right: 0
  bottom: 0
  width: 320px
  padding: 30px 40px
  background-image: url('../../assets/images/chat-bg.png')
  background-position: center
  background-repeat: no-repeat
  background-size: 100% 100%

  +for-tablet-up
    width: 300px
    position: relative

  &__close
    position: absolute
    top: 10px
    right: 15px
    padding: 5px
    border-radius: 50%

  &__text
    display: block
    height: 300px
    max-height: 100vh
    padding-top: 15px
    font-weight: 600
    text-align: center

  &__content
    display: flex
    flex-direction: column
    align-items: flex-start
    height: 300px
    margin-right: -15px
    padding-right: 15px
    overflow-y: auto

  &__item
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
