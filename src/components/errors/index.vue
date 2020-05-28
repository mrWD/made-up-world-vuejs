<template lang="pug">
  ul.errors
    li.errors__item(v-for="(item, i) in errors" :key="i")
      span.errors__text {{ item }}

      Btn.errors__btn(
        isSmall
        isError
        isText
        @click="removeError(item)"
      )
        svgicon(icon="cross")

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Errors',

  computed: mapGetters(['errors']),

  methods: mapActions(['removeError']),
});

</script>

<style lang="sass">
.errors
  position: fixed
  top: 70px
  left: 0
  right: 0
  z-index: 100
  display: flex
  flex-direction: column
  align-items: center
  max-width: 90%
  margin-left: auto
  margin-right: auto

  &__item
    display: flex
    align-items: center
    padding-top: 15px
    padding-bottom: 15px
    padding-left: 20px
    padding-right: 15px
    box-shadow: inset 0 0 10px $error
    border-radius: 4px
    background-color: $error-light

    &:not(:last-child)
      margin-bottom: 15px

  &__text
    margin-right: 15px
    font-size: $font-size + 2
    font-weight: 600
    color: $error

  &__btn
    padding: 4px

</style>
