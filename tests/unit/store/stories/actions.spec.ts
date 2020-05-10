import axios from 'axios';

import stories from '@/store/stories';

import {
  GET_STORY_LIST,
  GET_STORY,
  GET_ALL_PAGES,
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
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

describe('store.stories.actions', () => {
  const { actions } = stories;
  let commit = jest.fn();

  const errorCommitTest = async (actionName: string, commit: jest.Mock<any, any>, args?: any) => {
    (axios.post as any).mockRejectedValueOnce(new Error('Some error!'));

    await (actions as any)[actionName]({ commit }, args);

    expect(commit)
      .toHaveBeenCalledWith(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
  };

  const updateRequestCommitTest =
    async (actionName: string, commit: jest.Mock<any, any>, args?: any) => {
      await (actions as any)[actionName]({ commit }, args);

      expect(commit).toHaveBeenNthCalledWith(1, UPDATE_REQUEST_COUNT, true, { root: true });
      expect(commit).toHaveBeenCalledWith(UPDATE_REQUEST_COUNT, false, { root: true });
    };

  describe('getStoryList', () => {
    beforeEach(() => {
      commit.mockClear();
      localStorage.setItem(TOKEN, 'test-token');
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getStoryList', commit);
    });

    it('sends empty headers if localStorage[TOKEN] is empty', async () => {
      localStorage.removeItem(TOKEN);

      await (actions as any).getStoryList({ commit }, { bodyData: 'test data' });

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.VUE_APP_API_URL}/reading/all`,
        { bodyData: 'test data' },
        { headers: {} },
      );
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('getStoryList', commit);
    });
  });

  describe('getStory', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getStory', commit, { storyURL: 'testUrl', pageId: 'testId' });
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('getStory', commit, { storyURL: 'testUrl', pageId: 'testId' });
    });
  });

  describe('getAllPages', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('getAllPages', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('getAllPages', commit);
    });
  });

  describe('saveStory', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('saveStory', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('saveStory', commit);
    });
  });

  describe('removeStory', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('removeStory', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('removeStory', commit);
    });
  });

  describe('publishStory', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('publishStory', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('publishStory', commit);
    });
  });

  describe('unpublishStory', () => {
    beforeEach(() => {
      commit.mockClear();
    });

    it('always calls commit with UPDATE_REQUEST_COUNT 2 times', async () => {
      await updateRequestCommitTest('unpublishStory', commit);
    });

    it('calls the second commit with ADD_ERROR if recieved data is error', async () => {
      await errorCommitTest('unpublishStory', commit);
    });
  });
});