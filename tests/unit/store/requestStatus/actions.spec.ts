import requestStatus from '@/store/requestStatus';

import { REMOVE_ERROR } from '@/constants/story';

describe('store.requestStatus.actions', () => {
  const { actions } = requestStatus;
  let commit: jest.Mock<any, any>;

  beforeEach(() => {
    commit = jest.fn();
  });

  it('removeError calls commit with REMOVE_ERROR and errorText', () => {
    const errorText = 'error text';

    (actions as any).removeError({ commit }, errorText);

    expect(commit).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith(REMOVE_ERROR, errorText);
  });
});