import { GetterTree } from 'vuex';
import { IRootState, IPageState } from '@/store/interfaces';

import page from '@/store/page';

describe('store.page.getters', () => {
  type PageGetter = GetterTree<IPageState, IRootState>;

  const { getters } = page;
  const rootState = {
    auth: {
      token: null,
      authInfo: null,
    },
    users: {
      userInfo: null,
      userList: null,
      newFollowings: [],
      newUnfollowings: [],
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
      newPublishings: [],
      newUnpublishings: [],
      pageNumber: 0,
      pageCount: 0,
    },
  };

  const pageState = {
    pageList: [
      {
        id: 'Id1',
        pageId: 'pageId1',
        title: 'page title 1',
        body: 'page body 1',
        isPublished: true,
      },
      {
        id: 'Id2',
        pageId: 'pageId2',
        title: 'page title 2',
        body: 'page body 2',
        isPublished: true,
      },
    ],
  };

  it('pageList returns state.pageList', () => {
    const result = (getters as PageGetter).pageList(pageState, {}, rootState, {});
    expect(result).toEqual(pageState.pageList);
  });
});
