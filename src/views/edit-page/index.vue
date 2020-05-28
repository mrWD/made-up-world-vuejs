<template lang="pug">
  form.edit-page
    h1(v-if="currentStory.title") {{ currentStory.title }}

    input.edit-page__field.field(
      v-else
      v-model="form.title"
      type="text"
      placeholder="Name of your story"
    )

    textarea.edit-page__field.edit-page__field_area.field(
      v-model="form.body"
      row="10"
      placeholder="Text of your story"
    )

    ul.edit-page__list
      li.edit-page__el(v-for="i in OPTIONS_LIST" :key="i")
        input.edit-page__option.field(
          v-model="form.options[i - 1]"
          placeholder="Add option of choice"
        )

        button.btn(type="button" @click="removeOption(i - 1)")
          svgicon.btn__icon(icon="cross")

    button.btn.edit-page__btn(type="clear" @click="clearOptions") Clear all

    button.btn.edit-page__btn(type="button" @click="handleSave") Save

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  name: 'EditPage',

  data() {
    return {
      show: false,
      showItem: false,
      OPTIONS_LIST: 4,
      form: {
        title: null,
        body: null,
        options: [] as string[],
      },
    };
  },

  computed: {
    ...mapGetters({ currentStory: 'stories/currentStory', pageList: 'page/pageList' }),

    storyURL(): string {
      if (!this.pageList || !this.pageList[0]) return '';

      return this.pageList[0].storyURL;
    },
  },

  methods: {
    ...mapActions({
      getPage: 'page/getPage',
      savePage: 'page/savePage',
    }),

    removeOption(index: number): void {
      this.$set(this.form.options, index, null);
    },

    clearOptions(): void {
      this.form.options = [];
    },

    async handleSave(): Promise<void> {
      await this.savePage({
        ...this.form,
        pageId: this.$route.params.id,
        storyURL: this.storyURL,
      });

      this.$router.push({ name: 'EditStory', params: { id: this.pageList[0].storyURL } });
    },
  },

  watch: {
    currentStory(value) {
      if (value) {
        this.form = {
          title: value.title,
          body: value.body,
          options: value.options,
        };
      }
    },
  },

  created() {
    if (this.$route.params.id) this.getPage(this.$route.params.id);
  },
});

</script>

<style lang="sass">
.edit-page
  display: flex
  flex-direction: column
  align-items: center

  &__list
    align-self: stretch
    margin-bottom: 15px

  &__el
    display: flex

    &:not(:last-child)
      margin-bottom: 15px

  &__field
    align-self: stretch
    margin-bottom: 30px

    &_area
      min-height: 285px

  &__option
    flex-grow: 1
    margin-right: 30px

  &__btn
    min-width: 260px

    &:not(:last-child)
      margin-bottom: 30px

</style>
