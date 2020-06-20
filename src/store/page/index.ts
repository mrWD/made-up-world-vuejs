import axios from 'axios';
import { Module } from 'vuex';

import {
  GET_PAGES,
  SAVE_PAGE,
  TOKEN,
  UPDATE_REQUEST_COUNT,
} from '@/constants/story';

import { IPage, IPageState, IRootState } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const page: Module<IPageState, IRootState> = {
  namespaced: true,

  state: {
    pageList: [],
  },

  actions: {
    async getPage({ commit, dispatch }, pageId): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post<IPage[]>(
          `${VUE_APP_API_URL}/editing/edit`,
          { pageId },
          { headers: { Authorization: localStorage.getItem(TOKEN) } },
        );

        commit(GET_PAGES, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async removePage({ commit, dispatch }, storyURL): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post<IPage[]>(`${VUE_APP_API_URL}/editing/edit`, {
          data: { storyURL },
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_PAGES, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async savePage({ commit, dispatch }, body) {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios
          .post<IPage>(`${VUE_APP_API_URL}/editing/save`, body, {
            headers: { Authorization: localStorage.getItem(TOKEN) },
          });

        commit(SAVE_PAGE, {
          ...body,
          pageId: data.pageId,
          storyURL: data.storyURL,
        });
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },
  },

  mutations: {
    [GET_PAGES](state, pageList: IPage[]) {
      state.pageList = pageList;
    },

    [SAVE_PAGE](state, newPage: IPage) {
      const pageIndex = state.pageList.findIndex(({ pageId }) => pageId === newPage.pageId);

      if (pageIndex < 0) {
        state.pageList.push(newPage);
        return;
      }

      state.pageList[pageIndex] = newPage;
    },
  },

  getters: {
    pageList: ({ pageList }): IPage[] => pageList,
  },
};

export default page;
