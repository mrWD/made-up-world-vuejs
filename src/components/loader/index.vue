<template lang="pug" functional>
  .loader

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Loader',
});

</script>

<style lang="sass">
.loader
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 1000
  width: 50px
  height: 50px
  margin: auto

  &:before
    position: absolute
    top: 67px
    left: 0
    width: 50px
    height: 6px
    border-radius: 50%
    opacity: .2
    background: #000000
    animation: shadow .5s linear infinite
    content: ''

  &:after
    position: absolute
    top: 0
    left: 0
    width: 50px
    height: 50px
    border-radius: 5px
    box-shadow: 0 0 10px 0px $main-color-darkest
    background-color: $main-color-light
    animation: rotate .5s linear infinite
    content: ''

@keyframes rotate
  0%
    transform: translateY(0) rotate(0deg)

  25%
    transform: translateY(10px) rotate(22.5deg)

  50%
    transform: translateY(20px) scale(1.1, 0.9) rotate(45deg)
    border-bottom-right-radius: 50px

  75%
    ransform: translateY(10px) rotate(67.5deg)

  100%
    transform: translateY(0) rotate(90deg)

@keyframes shadow
  0%,
  100%
    transform: scaleX(1)

  50%
    transform: scaleX(1.2)

</style>
