import { GetterTree } from 'vuex';
import { IStoryState, IRootState } from '@/store/interfaces';

import stories from '@/store/stories';

describe('store.stories.getters', () => {
  type StoriesGetter = GetterTree<IStoryState, IRootState>;

  const { getters } = stories;
  const rootState = {
    auth: {
      token: null,
      authInfo: null,
    },
    users: {
      userInfo: null,
      userList: null,
      destination: '',
      pageNumber: 0,
      pageCount: 0,
    },
    pages: {
      pageList: [],
    },
    stories: {
      currentStory: null,
      storyList: [],
      pageList: [],
      pageNumber: 0,
      pageCount: 0,
    },
  };

  const storiesState = {
    currentStory: {
      storyURL: 'storyId',
      title: 'story title',
      owner: 'story-owner',
      isPublished: true,
    },
    storyList: [
      {
        storyURL: 'storyId1',
        title: 'story title1',
        owner: 'story-owner1',
        isPublished: true,
      },
      {
        storyURL: 'storyId2',
        title: 'story title2',
        owner: 'story-owner2',
        isPublished: false,
      },
    ],
    pageList: null,
    pageNumber: 0,
    pageCount: 0,
  };

  it('currentStory returns state.currentStory', () => {
    const result = (getters as StoriesGetter).currentStory(storiesState, {}, rootState, {});
    expect(result).toEqual(storiesState.currentStory);
  });

  it('storyList returns state.storyList', () => {
    const result = (getters as StoriesGetter).storyList(storiesState, {}, rootState, {});
    expect(result).toEqual(storiesState.storyList);
  });

  it('pageList returns state.pageList', () => {
    const result = (getters as StoriesGetter).pageList(storiesState, {}, rootState, {});
    expect(result).toEqual(storiesState.pageList);
  });

  it('pageNumber returns state.pageNumber', () => {
    const result = (getters as StoriesGetter).pageNumber(storiesState, {}, rootState, {});
    expect(result).toEqual(storiesState.pageNumber);
  });

  it('pageCount returns state.pageCount', () => {
    const result = (getters as StoriesGetter).pageCount(storiesState, {}, rootState, {});
    expect(result).toEqual(storiesState.pageCount);
  });
});
