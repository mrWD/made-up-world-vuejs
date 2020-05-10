import {
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
  GET_STORY_LIST,
  GET_STORY,
  GET_ALL_PAGES
} from '@/constants/story';
import { MutationTree } from 'vuex';

import stories from '@/store/stories';
import { IStoryState } from '@/store/interfaces';

describe('store.stories.mutations', () => {
  type Mutations = MutationTree<IStoryState>;

  const { mutations } = stories;
  let state: IStoryState;

  beforeEach(() => {
    state = {
      currentStory: null,
      storyList: null,
      pageList: null,
      pageNumber: 1,
      pageCount: 0,
    };
  });

  it('GET_PAGE_NUMBER proxys the argument to the state.pageNumber', () => {
    const pageNumber = 9;

    (mutations as Mutations)[GET_PAGE_NUMBER](state, pageNumber);

    expect(state.pageNumber).toBe(pageNumber);
  });

  it('GET_PAGE_COUNT proxys the argument to the state.pageCount', () => {
    const pageCount = 9;

    (mutations as Mutations)[GET_PAGE_COUNT](state, pageCount);

    expect(state.pageCount).toBe(pageCount);
  });

  it('GET_STORY_LIST proxys the argument to the state.storyList', () => {
    const storyList = [{
      storyURL: 'storyId',
      title: 'story title',
      owner: 'story-owner',
      isPublished: true,
    }];

    (mutations as Mutations)[GET_STORY_LIST](state, storyList);

    expect(state.storyList).toEqual(storyList);
  });

  it('GET_STORY proxys the argument to the state.currentStory', () => {
    const currentStory = {
      storyURL: 'storyId',
      title: 'story title',
      owner: 'story-owner',
      isPublished: true,
    };

    (mutations as Mutations)[GET_STORY](state, currentStory);

    expect(state.currentStory).toEqual(currentStory);
  });

  it('GET_ALL_PAGES proxys the argument to the state.pageList', () => {
    const pageList = [{
      id: 'Id',
      pageId: 'pageId',
      title: 'page title',
      body: 'page body',
      isPublished: true,
    }];

    (mutations as Mutations)[GET_ALL_PAGES](state, pageList);

    expect(state.pageList).toEqual(pageList);
  });
});
