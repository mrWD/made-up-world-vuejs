import { GET_PAGES, SAVE_PAGE } from '@/constants/story';
import { MutationTree } from 'vuex';

import page from '@/store/page';
import { IPageState } from '@/store/interfaces';

describe('store.page.mutations', () => {
  type Mutations = MutationTree<IPageState>;

  const { mutations } = page;
  let state: IPageState;

  beforeEach(() => {
    state = {
      pageList: [],
    };
  });

  it('GET_PAGES proxys the argument to state.pageList', () => {
    const pageList = [{
      id: 'Id',
      pageId: 'pageId',
      title: 'page title',
      body: 'page body',
      isPublished: true,
    }];

    expect(state.pageList).toEqual([]);

    (mutations as Mutations)[GET_PAGES](state, pageList);

    expect(state.pageList).toEqual(pageList);
  });

  it('SAVE_PAGE push argument to state.pageList', () => {
    const page = {
      id: 'Id1',
      pageId: 'pageId1',
      title: 'page title',
      body: 'page body',
      isPublished: true,
    };
    const newPage = {
      id: 'Id2',
      pageId: 'pageId2',
      title: 'page new title',
      body: 'page new body',
      isPublished: true,
    };

    state.pageList = [page];

    expect(state.pageList).toEqual([page]);

    (mutations as Mutations)[SAVE_PAGE](state, newPage);

    expect(state.pageList).toEqual([page, newPage]);
  });

  it('SAVE_PAGE replace item with the same id state.pageList', () => {
    const page = {
      id: 'Id1',
      pageId: 'pageId1',
      title: 'page title',
      body: 'page body',
      isPublished: true,
    };
    const newPage = {
      id: 'Id1',
      pageId: 'pageId1',
      title: 'page new title',
      body: 'page new body',
      isPublished: true,
    };

    state.pageList = [page];

    expect(state.pageList).toEqual([page]);

    (mutations as Mutations)[SAVE_PAGE](state, newPage);

    expect(state.pageList).toEqual([newPage]);
  });
});
