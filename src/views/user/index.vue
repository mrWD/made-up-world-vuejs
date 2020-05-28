<template lang="pug">
  .user
    span.user__text(v-if="!userInfo") No user

    template(v-else)
      h1.user__title {{ userInfo.login }}

      Photo.user__photo(
        :src="`${destination}${userInfo.photo}`"
        :alt="userInfo.login"
        width="200"
      )

      .user__btn-list(v-if="authInfo && authInfo.login && !isUser")
        span.user__text(v-if="isFollower") The one of your fans ;)

        span.user__text(v-if="isFollowed") You follow the user

        Btn.user__btn(v-else @click="follow(userInfo.login)") Follow

        Btn.user__btn(
          v-if="!checkLogin(userInfo.login)"
          @click="getChatByRecipient(userInfo.id)"
        )
          svgicon(icon="msg")

      hr.user__separator

      List(
        v-if="storyList && storyList[0]"
        title="Stories"
        routeName="Story"
        routeProp="storyURL"
        propName="title"
        :list="storyList"
        isWide
      )
        template(v-if="isUser" slot-scope="{ slotData }")
          Btn.user__btn(isSmall @click="togglePublishment(slotData)")
            svgicon(:icon="slotData.isPublished ? 'hide' : 'show'")

          router-link.btn.btn_small.user__btn(
            :to="{ name: 'EditStory', params: { id: slotData.storyURL } }"
          )
            svgicon(icon="edit")

          Btn.user__btn(isSmall @click="removeStory(pageList[0].storyURL)")
            svgicon(icon="cross")

      List(
        v-if="userInfo && userInfo.followings"
        title="Followings"
        routeName="User"
        routeProp="login"
        propName="login"
        :list="userInfo.followings"
      )
        template(slot-scope="{ slotData }")
          Btn.user__btn(
            v-if="!checkLogin(slotData.login)"
            isSmall
            @click="getChatByRecipient(slotData.id)"
          )
            svgicon(icon="msg")

          Btn.user__btn(v-if="isUser" isSmall @click="unfollow(slotData.login)")
            svgicon(icon="cross")

      List(
        v-if="userInfo && userInfo.followers"
        title="Followers"
        routeName="User"
        routeProp="login"
        propName="login"
        :list="userInfo.followers"
      )
        template(slot-scope="{ slotData }")
          Btn.user__btn(
            v-if="!checkLogin(slotData.login)"
            isSmall
            @click="getChatByRecipient(slotData.id)"
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

interface User { login: string }

export default Vue.extend({
  name: 'User',

  data() {
    return {
      isFollowRequested: false,
    };
  },

  props: {
    isOwner: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      userInfo: 'users/userInfo',
      destination: 'users/destination',
      newFollowings: 'users/newFollowings',
      newUnfollowings: 'users/newUnfollowings',
      authInfo: 'auth/authInfo',
      storyList: 'stories/storyList',
      isLoading: 'isLoading',
      errors: 'errors',
    }),

    isUser(): boolean {
      return this.userInfo && this.checkLogin(this.userInfo.login);
    },

    isFollowed(): boolean {
      const isNewFollowing = this.newFollowings.indexOf(this.userInfo.login) > -1;

      return isNewFollowing
        || this.userInfo.followers?.some(({ login }: User) => this.checkLogin(login));
    },

    isFollower(): boolean {
      return this.userInfo.followings?.some(({ login }: User) => this.checkLogin(login));
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
      getChatByRecipient: 'chats/getChatByRecipient',
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

    isFollowedFilter(userList: User[], user: User): boolean {
      const isNewFollowing = this.newFollowings.indexOf(user.login) !== -1;
      const isNewUnfollowing = this.newUnfollowings.indexOf(user.login) !== -1;

      return isNewUnfollowing
        || (!isNewFollowing && !userList.some(({ login }) => login === user.login));
    },
  },

  filters: {
    publishText(value: boolean): string {
      return value ? 'Publish Story' : 'Unpublish Story';
    },
  },

  async created() {
    await this.getUserInfo(this.$route.params.id);

    if (this.userInfo) {
      this.getStoryList({ owner: this.userInfo.login });
    }
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
    margin-right: 30px
    padding: 5px 10px

  &__text
    margin-bottom: 15px
    font-size: $font-size + 6
    font-weight: 600

  &__btn-list
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 15px

  &__btn
    &:not(:last-child)
      margin-bottom: 15px
      margin-right: 10px

</style>
