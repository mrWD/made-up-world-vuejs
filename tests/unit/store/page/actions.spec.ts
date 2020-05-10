import axios from 'axios';

import page from '@/store/page';

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

const errorCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
  (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));

  await (page.actions as any)[actionName]({ commit });

  expect(commit)
    .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
};

const updateRequestCommitTest = async (actionName: string, commit: jest.Mock<any, any>) => {
  await (page.actions as any)[actionName]({ commit });

  expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
  expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
};

describe('store.page.actions', () => {
  const { actions } = page;
  const token = 'test-token';
  let commit = jest.fn();

  describe('getPage', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getPage', commit);
    });

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('getPage', commit);
    });
  });

  describe('removePage', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('removePage', commit);
    });

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('removePage', commit);
    });
  });

  describe('savePage', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, token);
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('savePage', commit);
    });

    it('calls the second commit with ADD_ERROR if recieve data is error', async () => {
      await errorCommitTest('savePage', commit);
    });
  });
});