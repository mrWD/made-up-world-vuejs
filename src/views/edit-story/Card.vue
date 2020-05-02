<template lang="pug">
  article.card
    .card__head(:style="card.id | addBackground")
      Btn.card__btn.card__pin(
        v-if="changedCard && changedCard !== card.id"
        isSmall
        @click="$emit('setPin', card.id)"
      )
        svgicon.btn__icon(icon="pin")

      Btn.card__btn(v-if="!card.isFirst" isSmall @click="$emit('setFirst', card.id)") Set as #1

      span.card__btn(v-else) The #1

      router-link.card__btn.btn.btn_small(:to="{ name: 'EditPage', params: { id: card.id } }")
        svgicon.btn__icon(icon="edit")

      Btn.card__btn(isSmall @click="$emit('removePage', card.id)")
        svgicon.btn__icon(icon="cross")

    .card__body
      p.card__title {{ card.body }}

      Btn(v-if="!card.options" isSmall @click="$emit('showPins')") Bind next page

      template(v-else)
        Btn.card__btn(
          v-for="(page, i) in card.options"
          :key="page"
          @click="$emit('changePin', card.id, i)"
        )
          | {{ page ? page : 'Binded page' }}

          .card__color(
            v-if="card.nextPages && card.nextPages[i]"
            :style="card.nextPages[i] | addBackground"
          )

</template>

<script lang="ts">
import Vue from 'vue';

import Btn from '@/components/btn/index.vue';

interface Card {
  isFirst: boolean;
  id: string;
  body: string;
  nextPages: string[];
  options: string[];
}

export default Vue.extend({
  name: 'Card',

  props: {
    changedCard: {
      type: String,
    },
    card: {
      type: Object as () => Card,
    },
  },

  filters: {
    addBackground(value: string): object {
      return {
        backgroundColor: `#${value.substring(value.length - 6).split('').reverse().join('')}`,
      };
    },
  },

  components: {
    Btn,
  },
});

</script>

<style lang="sass">
.card
  border-radius: 4px
  overflow: hidden
  background-color: $main-color
  box-shadow: 0 0 10px $main-color-darkest

  &__head
    display: flex
    align-items: center
    justify-content: flex-end
    padding: 10px 15px 15px

  &__body
    padding: 10px 15px 15px

  &__btn:not(:last-child)
    margin-right: 10px

  &__pin:not(:last-child)
    margin-right: auto

  &__title
    flex-grow: 1
    margin-top: 0
    margin-bottom: 0
    text-align: left
    color: $black

    &:not(:last-child)
      margin-bottom: 15px

  &__color
    width: 100%
    height: 20px

</style>
