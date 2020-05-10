import axios from 'axios';

import users from '@/store/users';

import {
  GET_PAGES,
  SAVE_PAGE,
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

  const errorCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
    (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
    await (actions as any)[actionName]({ commit });
  
    expect(commit)
      .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
  };
  
  const updateRequestCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
    await (actions as any)[actionName]({ commit });
  
    expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
    expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
  };
  
  const emptyTokenTest = async (actionName: string, commit: jest.Mock<any, any>) => {
    localStorage.removeItem(TOKEN);
  
    await (actions as any)[actionName]({ commit });
  
    expect(commit).not.toHaveBeenCalled();
  };

  describe('getUserInfo', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getUserInfo', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('getUserInfo', commit);
    });
  });

  describe('getUserList', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getUserList', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('getUserList', commit);
    });
  });

  describe('follow', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('follow', commit);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('follow', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('follow', commit);
    });
  });

  describe('unfollow', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('unfollow', commit);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('unfollow', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('unfollow', commit);
    });
  });
});