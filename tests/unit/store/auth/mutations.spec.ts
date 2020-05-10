import { GET_AUTH_INFO, GET_TOKEN } from '@/constants/story';
import { MutationTree } from 'vuex';

import auth from '@/store/auth';
import { IAuthState } from '@/store/interfaces';

describe('store.auth.mutations', () => {
  type Mutations = MutationTree<IAuthState>;

  const { mutations } = auth;
  let state: IAuthState;

  beforeEach(() => {
    state = {
      token: null,
      authInfo: null
    };
  });

  it('GET_TOKEN mutates state.token', () => {
    const newToken = 'new token';

    expect(state.token).toBeNull();

    (mutations as Mutations)[GET_TOKEN](state, newToken);

    expect(state.token).toBe(newToken);
  });

  it('GET_AUTH_INFO mutates state.authInfo', () => {
    const newAuthInfo = { login: 'user' };

    expect(state.authInfo).toBeNull();

    (mutations as Mutations)[GET_AUTH_INFO](state, newAuthInfo);

    expect(state.authInfo).toEqual(newAuthInfo);
  });
});
