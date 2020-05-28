import {
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
  GET_USER_INFO,
  GET_USER_LIST,
} from '@/constants/story';
import { MutationTree } from 'vuex';

import users from '@/store/users';
import { IUsersState } from '@/store/interfaces';

describe('store.users.mutations', () => {
  type Mutations = MutationTree<IUsersState>;

  const { mutations } = users;
  let state: IUsersState;

  beforeEach(() => {
    state = {
      pageNumber: 0,
      pageCount: 0,
      destination: '',
      userInfo: null,
      userList: null,
    };
  });

  it('GET_PAGE_NUMBER proxys the argument to the state.pageNumber', () => {
    const pageNumber = 9;

    (mutations as Mutations)[GET_PAGE_NUMBER](state, pageNumber);

    expect(state.pageNumber).toBe(pageNumber);
  });

  it('GET_PAGE_COUNT proxys the argument to the state.pageCount', () => {
    const pageCount = 9;

    (mutations as Mutations)[GET_PAGE_COUNT](state, pageCount);

    expect(state.pageCount).toBe(pageCount);
  });

  it('GET_USER_INFO proxys the argument to the state.userInfo', () => {
    const userInfo = {
      login: 'User',
    };

    (mutations as Mutations)[GET_USER_INFO](state, userInfo);

    expect(state.userInfo).toEqual(userInfo);
  });

  it('GET_USER_LIST proxys the argument to the state.userInfo', () => {
    const userList = [
      {
        login: 'User1',
      },
      {
        login: 'User2',
      },
    ];

    (mutations as Mutations)[GET_USER_LIST](state, userList);

    expect(state.userList).toEqual(userList);
  });
});
