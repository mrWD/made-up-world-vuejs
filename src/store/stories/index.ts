import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_STORY_LIST,
  GET_STORY,
  GET_ALL_PAGES,
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
  TOKEN,
} from '@/constants/story';
import { IStory, IStoryState, IRootState } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const page: Module<IStoryState, IRootState> = {
  namespaced: true,

  state: {
    currentStory: null,
    storyList: null,
    pageList: null,
    pageNumber: 1,
    pageCount: 0,
  },

  actions: {
    async getStoryList({ commit }, body): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      try {
        const { data } = await axios.post(`${VUE_APP_API_URL}/reading/all`, body, {
          headers: { ...(token && { Authorization: token }) },
        });

        commit(GET_STORY_LIST, data.storyList);
        commit(GET_PAGE_NUMBER, data.page);
        commit(GET_PAGE_COUNT, data.pages);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async getStory({ commit }, { storyURL, pageId }): Promise<void> {
      try {
        const { data } = await axios.post(`${VUE_APP_API_URL}/reading/page`, { storyURL, pageId });

        commit(GET_STORY, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async getAllPages({ commit }, storyURL): Promise<void> {
      try {
        const { data } = await axios.post(`${VUE_APP_API_URL}/editing/all`, { storyURL }, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_ALL_PAGES, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async saveStory({ commit }, body): Promise<void> {
      try {
        const { data } = await axios.post(`${VUE_APP_API_URL}/editing/save-story`, body, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_ALL_PAGES, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async removeStory({ commit }, storyURL): Promise<void> {
      try {
        const { data } = await axios.post(`${VUE_APP_API_URL}/editing/remove-story`, storyURL, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_ALL_PAGES, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async publishStory(_, storyURL): Promise<void> {
      try {
        await axios.post(`${VUE_APP_API_URL}/editing/publish`, { storyURL }, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async unpublishStory(_, storyURL): Promise<void> {
      try {
        await axios.post(`${VUE_APP_API_URL}/editing/unpublish`, { storyURL }, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },
  },

  mutations: {
    [GET_PAGE_NUMBER](state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    [GET_PAGE_COUNT](state, pageCount) {
      state.pageCount = pageCount;
    },
    [GET_STORY_LIST](state, storyList) {
      state.storyList = storyList;
    },
    [GET_STORY](state, currentStory) {
      state.currentStory = currentStory;
    },
    [GET_ALL_PAGES](state, pageList) {
      state.pageList = pageList;
    },
  },

  getters: {
    currentStory: ({ currentStory }): IStory | null => currentStory,
    storyList: ({ storyList }): IStory[] | null => storyList,
    pageList: ({ pageList }): object[] | null => pageList,
    pageNumber: ({ pageNumber }): number => pageNumber,
    pageCount: ({ pageCount }): number => pageCount,
  },
};

export default page;
