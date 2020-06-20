<template lang="pug">
  section.edit-story(v-if="pageList && pageList[0]")
    h1.edit-story__title {{ pageList[0].title }}

    ul.edit-story__list(v-for="(pageList, i) in groupedPageList" :key="i")
      li.edit-story__item(v-for="(item, j) in pageList" :key="j")
        Card(
          :card="item"
          :changedCard="indexParent"
          @changePin="changePin"
          @setFirst="setFirst"
          @setPin="setPin"
          @removePage="removePage"
        )

    template(v-if="changes[0]")
      Btn.edit-story__btn(v-if="changes[0]" @click="changes = []") Cancel Changes

      Btn.edit-story__btn(v-if="changes[0]" @click="saveChanges") Save Changes

    template(v-else)
      router-link.btn.edit-story__btn(:to="{ name: 'EditPage' }") Add New Page

      Btn.edit-story__btn(@click="removeStory(pageList[0].storyURL)") Remove Story

      Btn.edit-story__btn(
        v-if="pageList[0].isPublished"
        @click="unpublishStory(pageList[0].storyURL)"
      )
        | Unpublish Story

      Btn.edit-story__btn(
        v-else
        @click="publishStory(pageList[0].storyURL)"
      )
        | Publish Story

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { IPage } from '@/store/interfaces';

import Card from './Card.vue';

interface Changes {
  id: string;
  nextPages: string[];
  isFirst?: boolean;
}

const groupPageList = (filteredArr: IPage[], arr: IPage[][]): IPage[][] => {
  const index: number = arr.length;
  const newArr = [...arr, []];
  const nextPages: string[] = arr[arr.length - 1].reduce((res: string[], item: IPage) => (
    Array.from(new Set(res.concat(item?.nextPages || [])))
  ), []);

  const newFilteredArr = filteredArr.filter((item) => {
    const isConvinient = !nextPages.includes(item.pageId);
    const some = newArr[index]
      .some((prevItem: IPage) => prevItem.nextPages?.includes(item.pageId));

    if (!isConvinient && !some) {
      newArr[index] = Array.from(new Set([...(newArr[index]), item]));
    }

    return isConvinient || some;
  });

  newArr[index].sort((item1: IPage, item2: IPage) => {
    const index1 = nextPages.indexOf(item1.pageId);
    const index2 = nextPages.indexOf(item2.pageId);

    if (index1 < index2) return -1;

    return 1;
  });

  if (!newArr[index][0]) newArr.splice(index, 1);

  if (filteredArr.length === newFilteredArr.length) {
    return [...newArr, filteredArr];
  }

  if (!newFilteredArr.length) return newArr;

  return groupPageList(newFilteredArr, newArr);
};

export default Vue.extend({
  name: 'EditStory',

  data() {
    return {
      pinnedIndex: 0,
      indexParent: '',
      changes: [] as Changes[],
    };
  },

  computed: {
    ...mapGetters('stories', ['pageList']),

    groupedPageList(): IPage[][] | null {
      if (!this.pageList) return null;

      const first: IPage | undefined = this.pageList.find((item: IPage) => item.isFirst);

      if (!first) return [this.pageList];

      const newArr: IPage[][] = [[first]];
      const filtered = this.pageList.filter((item: IPage) => !item.isFirst);

      return groupPageList(filtered, newArr);
    },

    title(): string {
      return this.pageList.find(({ isFirst }: IPage) => isFirst)?.title || '';
    },
  },

  methods: {
    ...mapActions({
      getAllPages: 'stories/getAllPages',
      saveStory: 'stories/saveStory',
      removeStory: 'stories/removeStory',
      publishStory: 'stories/publishStory',
      unpublishStory: 'stories/unpublishStory',
      removePage: 'page/removePage',
    }),

    setFirst(id: string): void {
      this.changes = this.changes.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isFirst: true,
          };
        }

        if (item.isFirst) {
          return {
            ...item,
            isFirst: false,
          };
        }

        return item;
      });
    },

    setPin(target: string): void {
      let { nextPages } = this.pageList.find(({ id }: IPage) => id === this.indexParent);

      if (!this.changes[0]) {
        nextPages[this.pinnedIndex] = target;

        this.changes = [{
          id: this.indexParent,
          nextPages,
        }];
      }

      this.changes = this.changes.map((item) => {
        if (item.id === this.indexParent) {
          return item;
        }

        ({ nextPages = [] } = item);
        nextPages[this.pinnedIndex] = target;

        return {
          ...item,
          nextPages,
        };
      });
    },

    changePin(id: string, index: number): void {
      this.indexParent = id;
      this.pinnedIndex = index;
    },

    saveChanges() {
      this.saveStory({
        storyURL: this.pageList[0].storyURL,
        changes: this.changes,
      });
      this.changes = [];
    },
  },

  created() {
    if (this.$route.params.id) this.getAllPages(this.$route.params.id);
  },

  components: {
    Card,
  },
});

</script>

<style lang="sass">
.edit-story
  display: flex
  flex-direction: column
  padding-bottom: 20px
  text-align: center

  +for-tablet-up
    display: block

  &__title
    margin-top: 0
    color: $black

  &__list
    width: 100%
    display: flex
    flex-wrap: wrap
    justify-content: center
    align-items: flex-start
    max-width: 1170px
    margin-left: auto
    margin-right: auto

    &:not(:last-of-type)
      border-bottom: 2px solid $main-color-dark

  &__item
    display: block
    max-width: 300px
    padding: 20px 15px

  &__btn:not(:last-child)
    margin-bottom: 15px

    +for-tablet-up
      margin-bottom: 0
      margin-right: 10px

</style>
