import axios from 'axios';

import page from '@/store/page';

import { UPDATE_REQUEST_COUNT } from '@/constants/story';

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
  let dispatch = jest.fn();

  const updateRequestCommitTest =
    async (actionName: string, args?: any) => {
      await (page.actions as any)[actionName]({ commit, dispatch }, args);
    
      expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
      expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
    };

  describe('getPage', () => {
    beforeEach(() => {
      commit.mockClear();
      dispatch.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getPage');
    });

    it('calls dispatch with addError if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (actions as any).getPage({ commit, dispatch }, {});
  
      expect(dispatch)
        .toHaveBeenCalledWith('addError', 'Problems with grabbing the page!', { root: true });
    });
  });

  describe('removePage', () => {
    beforeEach(() => {
      commit.mockClear();
      dispatch.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('removePage');
    });
  });

  describe('savePage', () => {
    beforeEach(() => {
      commit.mockClear();
      dispatch.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('savePage', {});
    });

    it('calls dispatch with addError if recieved data is error', async () => {
      (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));
  
      await (actions as any).savePage({ commit, dispatch }, {});
  
      expect(dispatch)
        .toHaveBeenCalledWith('addError', 'Problems with grabbing the page!', { root: true });
    });
  });
});