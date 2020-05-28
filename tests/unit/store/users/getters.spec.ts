import { GetterTree } from 'vuex';
import { IUsersState, IRootState } from '@/store/interfaces';

import users from '@/store/users';

describe('store.users.getters', () => {
  type UserGetter = GetterTree<IUsersState, IRootState>;

  const { getters } = users;
  const rootState = {
    auth: {
      token: null,
      authInfo: null,
    },
    users: {
      userInfo: null,
      userList: null,
      destination: '',
      pageNumber: 0,
      pageCount: 0,
      newFollowings: [],
      newUnfollowings: [],
    },
    pages: {
      pageList: [],
    },
    stories: {
      currentStory: null,
      storyList: [],
      pageList: [],
      pageNumber: 0,
      pageCount: 0,
    },
  };

  const userState = {
    userInfo: {
      login: 'User',
    },
    userList: [
      {
        login: 'User1',
      },
      {
        login: 'User2',
      },
    ],
    destination: '',
    pageNumber: 0,
    pageCount: 0,
    newFollowings: [],
    newUnfollowings: [],
  };

  it('userInfo returns state.userInfo', () => {
    const result = (getters as UserGetter).userInfo(userState, {}, rootState, {});
    expect(result).toEqual(userState.userInfo);
  });

  it('userList returns state.userList', () => {
    const result = (getters as UserGetter).userList(userState, {}, rootState, {});
    expect(result).toEqual(userState.userList);
  });

  it('pageNumber returns state.pageNumber', () => {
    const result = (getters as UserGetter).pageNumber(userState, {}, rootState, {});
    expect(result).toBe(userState.pageNumber);
  });

  it('pageCount returns state.pageCount', () => {
    const result = (getters as UserGetter).pageCount(userState, {}, rootState, {});
    expect(result).toBe(userState.pageCount);
  });
});
