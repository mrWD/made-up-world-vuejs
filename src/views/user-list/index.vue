<template lang="pug">
  .user-list
    h1 All users

    Filters

    span(v-if="!userList") No users

    .user-list__container(v-else)
      .user-list__item(
        v-for="(user, i) in userList"
        v-if="!authInfo || isNotUser(user.login)"
        :key="i"
      )
        router-link.user-list__link(
          :to="{ name: 'User', params: { id: user.login } }"
        )
          Photo.user-list__photo(
            :src="`${config.VUE_APP_API_URL}/${userList.destination}/${user.photo}`"
            :alt="user.login"
            width="50"
            height="50"
          )

          span.user-list__text {{ user.login }}

        Btn.user-list__btn(
          v-if="isFollowed(user.followers)"
          isSmall
          @click="follow(user.login)"
        )
          svgicon(icon="follow")

        Btn.user-list__btn(v-if="authInfo" isSmall @click="getChatByRecipient(user.id)")
          svgicon(icon="msg")

    Pagination(
      v-if="pageCount > 1"
      :pageNumber="pageNumber"
      :pageCount="pageCount"
      @click="page => getUserList({ page })"
    )

</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import Pagination from '@/components/pagination/index.vue';

import Filters from './Filters.vue';

export default Vue.extend({
  name: 'UserList',

  computed: {
    ...mapGetters({
      userList: 'users/userList',
      pageNumber: 'users/pageNumber',
      pageCount: 'users/pageCount',
      authInfo: 'auth/authInfo',
    }),
  },

  methods: {
    ...mapActions({
      getUserList: 'users/getUserList',
      follow: 'users/follow',
      getChatByRecipient: 'chats/getChatByRecipient',
    }),

    isFollowed(followers: { login: string }[]): boolean {
      if (!this.authInfo || !this.authInfo.login) return false;

      return followers.every(({ login }: { login: string }) => this.isNotUser(login));
    },

    isNotUser(login: string): boolean {
      return login !== this.authInfo.login;
    },
  },

  created() {
    this.getUserList();
  },

  components: {
    Filters,
    Pagination,
    Photo: () => import('@/components/photo/index.vue'),
  },
});

</script>

<style lang="sass">
.user-list
  &__container
    display: flex
    flex-wrap: wrap

  &__item
    display: flex
    align-items: center
    width: 100%

    &:not(:last-child)
      margin-bottom: 15px

  &__link
    flex-grow: 1
    display: flex
    align-items: center
    margin-right: 15px
    overflow: hidden
    text-decoration: none

  &__photo
    margin-right: 15px
    padding: 2px 5px

  &__text
    max-width: calc(100% - 65px)
    overflow: hidden
    font-size: $font-size + 10
    font-weight: 600
    white-space: nowrap
    text-overflow: ellipsis
    color: $black

  &__btn:not(:last-child)
    margin-right: 15px

</style>
