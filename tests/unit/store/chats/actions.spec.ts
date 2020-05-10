import axios from 'axios';

import chats from '@/store/chats';

import {
  GET_CHAT_LIST,
  GET_CHAT,
  GET_MSG_LIST,
  GET_MSG,
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

const errorCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
  (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));

  await (chats.actions as any)[actionName]({ commit });

  expect(commit)
    .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
};

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

describe('store.chats.actions', () => {
  const { actions } = chats;
  const token = 'test-token';
  let commit = jest.fn();

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

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('getChatByRecipient', commit);
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

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('getChatList', commit);
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

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('getMsgList', commit);
    });
  });
});