import { UPDATE_REQUEST_COUNT, ADD_ERROR, REMOVE_ERROR } from '@/constants/story';
import { MutationTree } from 'vuex';

import requestStatus from '@/store/requestStatus';
import { IReqStatusState } from '@/store/interfaces';

describe('store.requestStatus.mutations', () => {
  type Mutations = MutationTree<IReqStatusState>;

  const { mutations } = requestStatus;
  let state: IReqStatusState;

  beforeEach(() => {
    state = {
      isLoading: false,
      requestCount: 0,
      errors: [],
    };
  });

  it(`UPDATE_REQUEST_COUNT increase the state.requestCount, if isNewRequest === true
    and set state.isLoading = true, if state.requestCount > 0`,
    () => {
      expect(state.requestCount).toBe(0);
      expect(state.isLoading).toBeFalsy();

      (mutations as Mutations)[UPDATE_REQUEST_COUNT](state, true);

      expect(state.requestCount).toBe(1);
      expect(state.isLoading).toBeTruthy();
    });

  it(`UPDATE_REQUEST_COUNT descrease the state.requestCount, if isNewRequest === false
    and set state.isLoading = false, if state.requestCount < 1`,
    () => {
      state.requestCount = 1;
      state.isLoading = true;

      expect(state.requestCount).toBe(1);
      expect(state.isLoading).toBeTruthy();

      (mutations as Mutations)[UPDATE_REQUEST_COUNT](state, false);

      expect(state.requestCount).toBe(0);
      expect(state.isLoading).toBeFalsy();
    });

  it('ADD_ERROR save unique strings', () => {
    const err1 = 'first error';
    const err2 = 'second error';

    (mutations as Mutations)[ADD_ERROR](state, err1);

    expect(state.errors).toEqual([err1]);

    (mutations as Mutations)[ADD_ERROR](state, err2);

    expect(state.errors).toEqual([err1, err2]);

    (mutations as Mutations)[ADD_ERROR](state, err1);

    expect(state.errors).toEqual([err1, err2]);
  });

  it('REMOVE_ERROR save unique strings', () => {
    const err1 = 'first error';
    const err2 = 'second error';

    state.errors = [err1, err2];

    expect(state.errors).toEqual([err1, err2]);

    (mutations as Mutations)[REMOVE_ERROR](state, err1);

    expect(state.errors).toEqual([err2]);
  });
});
