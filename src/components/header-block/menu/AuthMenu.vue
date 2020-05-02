<template lang="pug" functional>
  ul.auth-menu
    li.auth-menu__item
      router-link.auth-menu__btn.btn.btn_text(
        :to="{ name: 'User', params: { id: props.login } }"
      )
        | My Info

    li.auth-menu__item
      router-link.auth-menu__btn.btn.btn_text(:to="{ name: 'EditPage' }") New Story

    li.auth-menu__item
      router-link.auth-menu__btn.btn.btn_text(:to="{ name: 'MyStories' }")
        | My Stories

    li.auth-menu__item
      Btn.auth-menu__btn(isText @click="data.on.signOut") Logout

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AuthMenu',

  props: {
    login: {
      type: String,
    },
  },
});

</script>

<style lang="sass">
.auth-menu
  text-align: center

  +for-tablet-up
    position: absolute
    top: 100%
    right: 0
    display: flex
    flex-direction: column
    width: 320px
    padding: 15px 25px
    border-radius: 4px
    background-image: url('../../../assets/images/inner-bg.png')
    background-size: 100% 100%
    text-align: left

  &:before
    +for-tablet-up
      position: absolute
      top: -6px
      right: 65px
      transform: rotate(45deg)
      display: block
      width: 15px
      height: 15px
      content: ''

  &__item
    display: block

    &:not(:last-child)
      margin-bottom: 15px

  &__btn
    border: none
    text-decoration: none
    cursor: pointer

</style>
