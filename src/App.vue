<template lang="pug">
  #app
    HeaderBlock

    ul.errors
      li.errors__item(v-for="(item, i) in errors" :key="i")
        Btn.errors__btn(isText @click="removeError(item)") {{ item }}

    .inner(:class="{ 'inner_fluid': isFluid }")
      .inner__content(:class="{ 'inner__content_loading': isLoading }")
        router-view

    Chat(v-if="authInfo" :authInfo="authInfo" :token="token")

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',

  computed: {
    ...mapGetters({
      token: 'auth/token',
      authInfo: 'auth/authInfo',
      isLoading: 'isLoading',
      errors: 'errors',
    }),

    isFluid(): boolean {
      return this.$route.name === 'EditStory';
    },
  },

  methods: mapActions({
    getAuthInfo: 'auth/getAuthInfo',
    removeError: 'removeError',
  }),

  created() {
    this.getAuthInfo();
  },

  components: {
    Chat: () => import('@/components/chat/index.vue'),
    HeaderBlock: () => import('@/components/header-block/index.vue'),
  },
});

</script>

<style lang="sass">
html,
body
  box-sizing: border-box

*,
*:before,
*:after
  box-sizing: inherit

body
  min-height: 100vh
  margin: 0
  background-color: #36291e
  background-image: url('./assets/images/bg.jpg')
  background-attachment: fixed
  background-repeat: no-repeat
  background-size: cover
  font-family: $main-font-stack

#app
  padding-top: 100px
  font-family: $main-font-stack
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: $black

hr
  flex-basis: 100%
  margin-top: 0
  margin-bottom: 0
  border-color: $main-color-darkest
  box-shadow: 0 0 20px $main-color-darkest

h1,
h2,
p
  margin-top: 0

p,
span
  color: $black

ul
  margin-top: 0
  margin-bottom: 0
  padding-left: 0

.errors
  position: fixed
  top: 70px
  left: 0
  right: 0
  z-index: 100
  display: flex
  flex-direction: column
  align-items: center
  margin-left: auto
  margin-right: auto

  &__item
    display: block
    padding: 15px 20px
    background-image: url('./assets/images/chat-bg.png')
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%
    font-size: $font-size + 2
    font-weight: 600
    color: $black

    &:not(:last-child)
      margin-bottom: 15px

  &__btn.btn_text
    padding-bottom: 0

    &:after
      content: none

.inner
  position: relative
  display: flex
  max-width: 790px
  margin-left: auto
  margin-right: auto
  padding: 50px 15px

  &:before,
  &:after
    position: absolute
    left: 0
    right: 0
    width: 100%
    height: 90px
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%
    content: ''

  &:before
    top: 0
    background-image: url('./assets/images/inner-top-bg.png')

  &:after
    bottom: 0
    background-image: url('./assets/images/inner-bottom-bg.png')

  &_fluid
    max-width: 95%

  &__content
    flex-grow: 1
    padding: 50px
    overflow: hidden
    background-image: url('./assets/images/inner-bg.png')
    background-position: center
    background-repeat: no-repeat
    background-size: 100% auto
    transition: max-height 5s

    &_loading
      max-height: 0vh
      padding-bottom: 0
      animation: loading 5s linear infinite alternate

@keyframes loading
  0%
    max-height: 0vh

  100%
    max-height: 100vh

</style>
