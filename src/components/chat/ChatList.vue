<template lang="pug" functional>
  .chat-list
    Btn.chat-list__close(isSmall @click="data.on.close()")
      svgicon(icon="cross")

    span(v-if="!props.chatList || !props.chatList[0]") You don't have chats

    ul.chat-list__content(v-else)
      li.chat-list__item(v-for="(item, i) in props.chatList" :key="i")
        Btn.chat-list__btn(isSmall @click="data.on.click(item.id)") {{ item.login }}

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ChatList',

  props: {
    chatList: {
      type: Array as () => Array<{ id: string; login: string }>,
    },
  },
});

</script>

<style lang="sass">
.chat-list
  position: relative
  width: 300px
  padding: 40px 30px
  background-image: url('../../assets/images/chat-bg.png')
  background-position: center
  background-repeat: no-repeat
  background-size: 100% 100%

  &__close
    position: absolute
    top: 10px
    right: 15px
    padding: 5px
    border-radius: 50%

  &__content
    display: flex
    flex-direction: column-reverse
    justify-content: flex-end
    height: 250px
    overflow-y: auto

  &__item
    display: block

    &:not(:first-child)
      margin-bottom: 5px

  &__btn
    width: 100%
    text-align: left

</style>
