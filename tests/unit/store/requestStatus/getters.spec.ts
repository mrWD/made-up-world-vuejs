import { GetterTree } from 'vuex';

import requestStatus from '@/store/requestStatus';

import { IRootState, IReqStatusState } from '@/store/interfaces';

describe('store.requestStatus.getters', () => {
  type ReqStatusGetter = GetterTree<IReqStatusState, IRootState>;

  const { getters } = requestStatus;
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

  const requestStatusState = {
    isLoading: true,
    requestCount: 2,
    errors: ['test error'],
  };

  it('isLoading returns state.isLoading', () => {
    const result = (getters as ReqStatusGetter).isLoading(requestStatusState, {}, rootState, {});
    expect(result).toBe(requestStatusState.isLoading);
  });

  it('errors returns state.errors', () => {
    const result = (getters as ReqStatusGetter).errors(requestStatusState, {}, rootState, {});
    expect(result).toEqual(requestStatusState.errors);
  });
});
