<template lang="pug">
  .user
    span.user__text(v-if="!userInfo") No user

    template(v-else)
      h1.user__title {{ userInfo.login }}

      Photo.user__photo(
        v-if="userInfo.photo"
        :src="`${config.VUE_APP_API_URL}/${userInfo.destination}/${userInfo.photo}`"
        :alt="userInfo.login"
        width="200"
      )

    .user__btn-list(
      v-if="authInfo && userInfo && authInfo.login && !isUser"
    )
      span.user__text(v-if="isFollower") The one of your fans ;)

      span.user__text(v-if="isFollowed") You follow the user

      Btn.user__btn(v-else @click="follow(userInfo.login)") Follow

      router-link.user__btn.btn(:to="{ name: 'Chat', options: { id: userInfo.login } }")
        | Send message

    hr.user__separator

    List(
      v-if="storyList"
      title="Stories"
      routeName="Story"
      routeProp="storyURL"
      propName="title"
      :list="storyList"
      isWide
    )
      template(v-if="isUser" scope="{ slotData }")
        Btn.user__btn(isSmall @click="togglePublishment(slotData)")
          svgicon(:icon="slotData.isPublished ? 'hide' : 'show'")

        router-link.btn.btn_small.user__btn(
          :to="{ name: 'EditStory', params: { id: slotData.storyURL } }"
        )
          svgicon(icon="edit")

        Btn.user__btn(isSmall @click="removeStory(pageList[0].storyURL)")
          svgicon(icon="cross")

    List(
      v-if="userInfo"
      title="Followings"
      routeName="User"
      routeProp="login"
      propName="login"
      :list="userInfo.followings"
    )
      template(scope="{ slotData }")
        Btn.user__btn(
          v-if="!checkLogin(slotData.login)"
          isSmall
          @click="createChat(slotData.id)"
        )
          svgicon(icon="msg")

        Btn.user__btn(v-if="isUser" isSmall @click="unfollow(slotData.login)")
          svgicon(icon="cross")

    List(
      v-if="userInfo"
      title="Followers"
      routeName="User"
      routeProp="login"
      propName="login"
      :list="userInfo.followers"
    )
      template(scope="{ slotData }")
        Btn.user__btn(
          v-if="!checkLogin(slotData.login)"
          isSmall
          @click="createChat(slotData.id)"
        )
          svgicon(icon="msg")

        Btn.user__btn(
          v-if="isUser && isFollowedFilter(userInfo.followings, slotData)"
          isSmall
          @click="follow(slotData.login)"
        )
          svgicon(icon="follow")

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { IStory } from '@/store/interfaces';

import List from './List.vue';

export default Vue.extend({
  name: 'User',

  props: {
    isOwner: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      userInfo: 'users/userInfo',
      authInfo: 'auth/authInfo',
      storyList: 'stories/storyList',
    }),

    isUser(): boolean {
      return this.userInfo && this.checkLogin(this.userInfo.login);
    },

    isFollowed(): boolean {
      return this.userInfo.followers.some(({ login }: any) => this.checkLogin(login));
    },

    isFollower(): boolean {
      return this.userInfo.followings.some(({ login }: any) => this.checkLogin(login));
    },
  },

  methods: {
    ...mapActions({
      getUserInfo: 'users/getUserInfo',
      follow: 'users/follow',
      unfollow: 'users/unfollow',
      getStoryList: 'stories/getStoryList',
      publishStory: 'stories/publishStory',
      unpublishStory: 'stories/unpublishStory',
      removeStory: 'stories/removeStory',
      createChat: 'chats/createChat',
    }),

    checkLogin(value: string): boolean {
      return this.authInfo && this.authInfo.login === value;
    },

    togglePublishment(storyInfo: IStory): void {
      if (storyInfo.isPublished) {
        this.unpublishStory(storyInfo.storyURL);
      } else {
        this.publishStory(storyInfo.storyURL);
      }
    },

    isFollowedFilter(userList: any[], user: any): boolean {
      return userList.some(({ login }) => login !== user.login);
    },
  },

  filters: {
    publishText(value: boolean): string {
      return value ? 'Publish Story' : 'Unpublish Story';
    },
  },

  async created() {
    await this.getUserInfo(this.$route.params.id);
    this.getStoryList({ owner: this.userInfo.login });
  },

  components: {
    List,
    Photo: () => import('@/components/photo/index.vue'),
  },
});

</script>

<style lang="sass">
.user
  display: flex
  flex-wrap: wrap
  justify-content: space-around
  max-width: 800px
  margin-left: auto
  margin-right: auto
  color: $black

  &__separator
    flex-basis: 100%
    margin-top: 0
    margin-bottom: 0
    border-color: $main-color-darkest
    box-shadow: 0 0 20px $main-color-darkest

  &__col
    width: 50%

  &__title
    flex-basis: 100%

    &_top-indent
      padding-top: 30px

  &__photo
    max-width: 200px
    margin-bottom: 30px
    padding: 5px 10px

  &__text
    margin-bottom: 15px
    font-size: $font-size + 6
    font-weight: 600

  &__btn-list
    display: flex
    flex-direction: column
    align-items: center

  &__btn
    &:not(:last-child)
      margin-bottom: 15px

</style>
