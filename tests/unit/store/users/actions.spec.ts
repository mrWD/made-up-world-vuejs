import axios from 'axios';

import users from '@/store/users';

import {
  TOKEN,
  UPDATE_REQUEST_COUNT,
  ADD_ERROR,
} from '@/constants/story';

jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({
    data: { login: 'user' },
    status: 200,
    statusText: 'success',
  }),
}));

describe('store.users.actions', () => {
  const { actions } = users;
  const token = 'test-token';
  let commit = jest.fn();
  let dispatch = jest.fn();

  const errorCommitTest = async (actionName: string) => {
    (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
    await (actions as any)[actionName]({ commit, dispatch });
  
    expect(dispatch)
      .toHaveBeenCalledWith('addError', 'Problems with grabbing the page!', { root: true });
  };
  
  const updateRequestCommitTest = async (actionName: string) => {
    await (actions as any)[actionName]({ commit, dispatch });
  
    expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
    expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
  };
  
  const emptyTokenTest = async (actionName: string) => {
    localStorage.removeItem(TOKEN);
  
    await (actions as any)[actionName]({ commit, dispatch });
  
    expect(commit).not.toHaveBeenCalled();
  };

  describe('getUserInfo', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getUserInfo');
    });

    it('calls dispatch with addError if recieved data is error', async () => {
      await errorCommitTest('getUserInfo');
    });
  });

  describe('getUserList', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getUserList');
    });

    it('calls dispatch with addError if recieved data is error', async () => {
      await errorCommitTest('getUserList');
    });
  });

  describe('follow', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('follow');
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('follow');
    });

    it('calls dispatch with addError if recieved data is error', async () => {
      await errorCommitTest('follow');
    });
  });

  describe('unfollow', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('unfollow');
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('unfollow');
    });

    it('calls dispatch with addError if recieved data is error', async () => {
      await errorCommitTest('unfollow');
    });
  });
});