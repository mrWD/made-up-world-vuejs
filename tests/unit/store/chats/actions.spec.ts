import axios from 'axios';

import chats from '@/store/chats';

import {
  TOKEN,
  UPDATE_REQUEST_COUNT,
  ADD_ERROR,
  GET_MSG,
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

describe('store.chats.actions', () => {
  const { actions } = chats;
  const token = 'test-token';
  let commit = jest.fn();

  const updateRequestCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
    await (chats.actions as any)[actionName]({ commit });
  
    expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
    expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
  };
  
  const emptyTokenTest = async (actionName: string, commit: jest.Mock<any, any>) => {
    localStorage.removeItem(TOKEN);
  
    await (chats.actions as any)[actionName]({ commit });
  
    expect(commit).not.toHaveBeenCalled();
  };

  describe('getChatByRecipient', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('getChatByRecipient', commit);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getChatByRecipient', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
    
      await (chats.actions as any).getChatByRecipient({ commit });
    
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('getChatList', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('getChatList', commit);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getChatList', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.get as any).mockRejectedValueOnce(new Error('Some error!'));
    
      await (chats.actions as any).getChatList({ commit });
    
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('getMsgList', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('does not do anything if localStorage[TOKEN] is empty', async () => {
      await emptyTokenTest('getMsgList', commit);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getMsgList', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
    
      await (chats.actions as any).getMsgList({ commit });
    
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('getMsg', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('calls commit with GET_MSG and proxied the second argument', () => {    
      const data = JSON.stringify({ text: 'test text' });

      (chats.actions as any).getMsg({ commit }, { data });

      expect(commit).toHaveBeenCalledWith(GET_MSG, JSON.parse(data));
    });
  });
});