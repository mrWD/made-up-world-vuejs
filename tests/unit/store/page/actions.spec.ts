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
  get: jest.fn().mockResolvedValue({
    data: { pageInfo: 'pageInfo', pageId: 'page-id', storyURL: 'storu-url' },
    status: 200,
    statusText: 'success',
  }),
  post: jest.fn().mockResolvedValue({
    data: { pageInfo: 'pageInfo' },
    status: 200,
    statusText: 'success',
  }),
}));

describe('store.page.actions', () => {
  const { actions } = page;
  let commit = jest.fn();

  const updateRequestCommitTest =
    async (actionName: string, commit: jest.Mock<any, any>, args?: any) => {
      await (page.actions as any)[actionName]({ commit }, args);
    
      expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
      expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
    };

  describe('getPage', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getPage', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.get as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (actions as any).getPage({ commit }, {});
  
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('removePage', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('removePage', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.get as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (actions as any).removePage({ commit }, {});
  
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('savePage', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('savePage', commit, {});
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (actions as any).savePage({ commit }, {});
  
      expect(commit)
        .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
    });
  });
});