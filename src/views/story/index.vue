<template lang="pug">
  section.story(v-if="currentStory")
    .story__head
      Btn(isSmall @click="getStory({ storyURL: $route.params.id })")
        svgicon(icon="return")

      router-link.btn.btn_text(
        :to="{ name: 'User', params: { id: currentStory.owner.login } }"
      )
        | {{ currentStory.owner.login }}

    h1.story__title {{ currentStory.title }}

    p.story__text {{ currentStory.body }}

    ul.story__list(v-if="currentStory.options[0]")
      li.story__el(
        v-for="(item, i) in currentStory.options"
        v-if="item && currentStory.nextPages[i]"
        :key="i"
      )
        Btn.story__btn(@click="nextPage(currentStory.nextPages[i])") {{ item }}

</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'Story',

  computed: mapGetters('stories', ['currentStory']),

  methods: {
    ...mapActions('stories', ['getStory']),

    nextPage(pageId: string): void {
      this.getStory({ pageId });
    },
  },

  created() {
    this.getStory({
      storyURL: this.$route.params.id,
    });
  },
});

</script>

<style lang="sass">
.story
  text-align: center

  &__head
    display: flex
    justify-content: space-between
    align-items: center

  &__author
    float: right
    margin-bottom: 15px
    font-size: $font-size + 6
    font-weight: bold
    text-decoration: none
    color: $black

  &__title
    clear: left
    color: $black

  &__text
    margin-bottom: 30px
    font-size: $font-size + 4
    text-align: left
    color: $black

  &__list
    display: inline-flex
    flex-direction: column

  &__el
    display: block
    min-width: 300px
    margin-bottom: 15px

  &__btn
    width: 100%

</style>
