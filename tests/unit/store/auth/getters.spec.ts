import { GetterTree } from 'vuex';
import { IRootState, IAuthState } from '@/store/interfaces';

import auth from '@/store/auth';

describe('store.auth.getters', () => {
  type AuthGetter = GetterTree<IAuthState, IRootState>;

  const { getters } = auth;
  const authLogin = 'user';
  const rootState = {
    auth: {
      token: null,
      authInfo: {
        login: authLogin,
      },
    },
    users: {
      userInfo: null,
      userList: null,
      destination: '',
      pageNumber: 0,
      pageCount: 0,
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

  const authState = {
    token: 'test-token',
    authInfo: {
      login: 'auth-login',
    },
  };

  it('token returns state.token', () => {
    const result = (getters as AuthGetter).token(authState, {}, rootState, {});
    expect(result).toBe(authState.token);
  });

  it('authInfo returns state.authInfo', () => {
    const result = (getters as AuthGetter).authInfo(authState, {}, rootState, {});
    expect(result).toEqual(authState.authInfo);
  });
});
