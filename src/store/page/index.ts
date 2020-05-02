import axios from 'axios';
import { Module } from 'vuex';
import { GET_PAGES, SAVE_PAGE, TOKEN } from '@/constants/story';
import { IPage, IPageState, IRootState } from '../interfaces';

const page: Module<IPageState, IRootState> = {
  namespaced: true,

  state: {
    pageList: null,
  },

  actions: {
    async getPage({ commit }, storyURL): Promise<void> {
      try {
        const { data } = await axios.get<IPage[]>('http://localhost:5000/api/editing/edit', {
          data: { storyURL },
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_PAGES, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async removePage({ commit }, storyURL): Promise<void> {
      try {
        const { data } = await axios.get<IPage[]>('http://localhost:5000/api/editing/edit', {
          data: { storyURL },
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_PAGES, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async savePage({ commit }, body) {
      try {
        const { data } = await axios.post<IPage>('http://localhost:5000/api/editing/save', body, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(SAVE_PAGE, {
          ...body,
          pageId: data.pageId,
          storyURL: data.storyURL,
        });
      } catch (e) {
        throw new Error('Problems with saving the page!');
      }
    },
  },

  mutations: {
    [GET_PAGES](state, pageList: IPage[]) {
      state.pageList = pageList;
    },

    [SAVE_PAGE](state, newPage: IPage) {
      if (!state.pageList || !state.pageList[0]) {
        state.pageList = [newPage];
        return;
      }

      const pageIndex = state.pageList.findIndex(({ pageId }) => pageId === newPage.pageId);

      if (!pageIndex) {
        state.pageList.push(newPage);
        return;
      }

      state.pageList[pageIndex] = newPage;
    },
  },

  getters: {
    pageList: ({ pageList }): IPage[] | null => pageList,
  },
};

export default page;
