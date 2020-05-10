import axios from 'axios';
import auth from '@/store/auth';

import {
  GET_AUTH_INFO,
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

describe('store.auth.actions', () => {
  const { actions } = auth;
  const token = 'test-token';
  let commit = jest.fn();
  let dispatch = jest.fn();

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

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.get as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (auth.actions as any).getAuthInfo({ commit });
  
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
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

    it('axios.post has been called twice', async () => {
      await (actions as any).signUp({ commit }, { file: File });

      expect(axios.post).toHaveBeenCalledTimes(2);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (auth.actions as any).signUp({ commit });
  
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
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

    it('calls dispatch with "getAuthInfo" as the first attribute', async () => {
      (axios.post as any).mockResolvedValueOnce({
        data: { login: 'user' },
        status: 200,
        statusText: 'success',
      });

      await (actions as any).signIn({ commit, dispatch }, {});

      expect(dispatch).toHaveBeenCalledWith('getAuthInfo');
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (auth.actions as any).signIn({ commit });
  
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('signOut', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
      (axios.post as any).mockResolvedValueOnce({ data: { token } });
    });

    it('clear localStorage[TOKEN] and calls commit with GET_AUTH_INFO and NULL', () => {
      expect(localStorage.getItem(TOKEN)).toBe(token);

      (actions as any).signOut({ commit });

      expect(localStorage.getItem(TOKEN)).toBeNull();
      expect(commit).toHaveBeenCalledWith(GET_AUTH_INFO, null);
    });
  });
});