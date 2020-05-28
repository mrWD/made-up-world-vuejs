<template lang="pug" functional v-once>
  .tooltip
    span.tooltip__text {{ props.text }}

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Tooltip',

  props: {
    text: {
      type: String,
    },
  },
});

</script>

<style lang="sass">
.tooltip
  position: absolute
  top: 10px
  left: -20px
  display: inline-block
  min-width: 100px
  max-width: 800px
  padding: 20px 13.0081301%
  border-radius: 4px
  opacity: 0
  background-image: url('../../assets/images/test.png')
  background-size: 100% 100%
  pointer-events: none
  transition: opacity 0.3s, transform 0.3s

  &__text
    font-size: $font-size + 4
    color: $black

.tooltip-trigger:hover ~ .tooltip,
.tooltip-trigger:hover .tooltip
  transform: translateY(10px)
  opacity: 1
  z-index: 1

</style>
