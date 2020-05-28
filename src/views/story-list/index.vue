<template lang="pug">
  .story-list
    Filters(:isOwner="isOwner")

    ul.story-list(v-if="storyList")
      li.story-list__item(v-for="(item, i) in storyList" :key="i")
        .story-list__name-wrapper
          router-link.story-list__name.tooltip-trigger(
            :to="{\
              name: isOwner ? 'EditStory' : 'Story',\
              params: { id: item.storyURL },\
            }"
          )
            | {{ item.title }}

          Tooltip(:text="item.body | cutText")

        router-link.story-list__author(
          v-if="!isOwner"
          :to="{ name: 'User', params: { id: item.owner.login } }"
        )
          | {{ item.owner.login }}

        span.story-list__author {{ item.createdAt | formatDate }}

    Pagination(
      v-if="pageCount > 1"
      :pageNumber="pageNumber"
      :pageCount="pageCount"
      @click="page => getStoryList({ page })"
    )

</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

import Pagination from '@/components/pagination/index.vue';

import Filters from './Filters.vue';

const MAX_TEXT_LENGTH: 200 = 200;

export default Vue.extend({
  name: 'StoryList',

  props: {
    isOwner: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('stories', ['storyList', 'pageNumber', 'pageCount']),
  },

  methods: {
    ...mapActions('stories', ['getStoryList', 'getStoryList']),
  },

  filters: {
    cutText(value: string): string {
      const dots = value.length > MAX_TEXT_LENGTH ? ' ...' : '';

      return `${value.substr(0, MAX_TEXT_LENGTH)}${dots}`;
    },

    formatDate(value: string): string {
      return moment(value).format('DD.mm.YYYY');
    },
  },

  created() {
    if (this.isOwner) {
      this.getStoryList();

      return;
    }

    this.getStoryList();
  },

  components: {
    Filters,
    Pagination,
  },
});

</script>

<style lang="sass">
.story-list

  &__item
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: space-between
    margin-bottom: 20px

  &__name-wrapper
    position: relative
    width: 100%
    margin-bottom: 5px

  &__name
    font-size: $font-size + 11
    text-transform: capitalize
    text-decoration: none
    color: $black

  &__author
    font-size: $font-size + 2
    text-transform: capitalize
    text-decoration: none
    color: $black

</style>
