<template lang="pug">
  img.photo(
    :src="srcData"
    :alt="alt"
    :width="width"
    :height="height"
    @error="handleErr"
  )

</template>

<script lang="ts">
import Vue from 'vue';

import DefaultImg from '@/assets/images/default-user.png';

export default Vue.extend({
  name: 'Photo',

  props: {
    src: {
      type: String,
    },
    alt: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },

  data() {
    return {
      srcData: this.src,
    };
  },

  methods: {
    handleErr() {
      this.srcData = DefaultImg;
    },
  },

  watch: {
    src(value) {
      this.srcData = value;
    },
  },
});

</script>

<style lang="sass">
.photo
  max-width: 100%
  border: 2px solid $main-color-darkest
  border-radius: 4px
  box-shadow: inset 0 0 20px $main-color-darkest
  background-color: $main-color-light
  object-fit: contain

</style>
