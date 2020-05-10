import axios from 'axios';
import auth from '@/store/auth';

import {
  GET_AUTH_INFO,
  GET_TOKEN,
  TOKEN,
  UPDATE_REQUEST_COUNT,
  ADD_ERROR,
} from '@/constants/story';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: { login: 'user' },
    status: 200,
    statusText: 'success',
  }),
  post: jest.fn().mockResolvedValue({
    data: { login: 'user' },
    status: 200,
    statusText: 'success',
  }),
}));

const errorCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
  (axios.get as any).mockRejectedValueOnce(new Error('Some error!'));
  (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));

  await (auth.actions as any)[actionName]({ commit });

  expect(commit)
    .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
};

const updateRequestCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
  await (auth.actions as any).getAuthInfo({ commit });

  expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
  expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
};

const emptyTokenTest = async (actionName: string, commit: jest.Mock<any, any>) => {
  localStorage.removeItem(TOKEN);

  await (auth.actions as any)[actionName]({ commit });

  expect(commit).not.toHaveBeenCalled();
};

describe('store.auth.actions', () => {
  const { actions } = auth;
  const token = 'test-token';
  let commit = jest.fn();

  describe('getAuthInfo', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('getAuthInfo', commit);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getAuthInfo', commit);
    });

    it(`calls the second commit with GET_TOKEN and localStorage[TOKEN]
      and calls the third commit with GET_AUTH_INFO and recieved data`, async () => {
      await (actions as any).getAuthInfo({ commit });

      expect(commit).toHaveBeenNthCalledWith(2, GET_TOKEN, localStorage.getItem(TOKEN));
      expect(commit).toHaveBeenNthCalledWith(3, GET_AUTH_INFO, { login: 'user' });
    });

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('getAuthInfo', commit);
    });
  });

  describe('signUp', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('signUp', commit);
    });

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('signUp', commit);
    });
  });

  describe('signIn', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('signIn', commit);
    });

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('signIn', commit);
    });
  });
});