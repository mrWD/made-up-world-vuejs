import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_STORY_LIST,
  GET_STORY,
  GET_ALL_PAGES,
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
  ADD_PUBLISH,
  REMOVE_PUBLISH,
  TOKEN,
  UPDATE_REQUEST_COUNT,
} from '@/constants/story';
import { IStoryState, IRootState } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const stories: Module<IStoryState, IRootState> = {
  namespaced: true,

  state: {
    currentStory: null,
    storyList: null,
    pageList: null,
    pageNumber: 1,
    pageCount: 0,
    newPublishings: [],
    newUnpublishings: [],
  },

  actions: {
    async getStoryList({ commit, dispatch }, body): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/reading/all`, body, {
          headers: { ...(token && { Authorization: token }) },
        });

        commit(GET_STORY_LIST, data.storyList);
        commit(GET_PAGE_NUMBER, data.page);
        commit(GET_PAGE_COUNT, data.pages);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async getStory({ commit, dispatch }, { storyURL, pageId }): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/reading/page`, { storyURL, pageId });

        commit(GET_STORY, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async getAllPages({ commit, dispatch }, storyURL): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/editing/all`, { storyURL }, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_ALL_PAGES, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async saveStory({ commit, dispatch }, body): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/editing/save-story`, body, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_ALL_PAGES, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async removeStory({ commit, dispatch }, storyURL): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/editing/remove-story`, storyURL, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(GET_ALL_PAGES, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async publishStory({ commit, dispatch }, storyURL): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        await axios.post(`${VUE_APP_API_URL}/editing/publish`, { storyURL }, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(ADD_PUBLISH, storyURL);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async unpublishStory({ commit, dispatch }, storyURL): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        await axios.post(`${VUE_APP_API_URL}/editing/unpublish`, { storyURL }, {
          headers: { Authorization: localStorage.getItem(TOKEN) },
        });

        commit(REMOVE_PUBLISH, storyURL);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
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
    [ADD_PUBLISH](state, storyURL) {
      state.newPublishings.push(storyURL);

      state.newUnpublishings.splice(state.newUnpublishings.indexOf(storyURL), 1);
    },
    [REMOVE_PUBLISH](state, storyURL) {
      state.newUnpublishings.push(storyURL);

      state.newPublishings.splice(state.newPublishings.indexOf(storyURL), 1);
    },
  },

  getters: {
    currentStory: ({ currentStory }) => currentStory,
    storyList: ({ storyList }) => storyList,
    pageList: ({ pageList }) => pageList,
    pageNumber: ({ pageNumber }) => pageNumber,
    pageCount: ({ pageCount }) => pageCount,
    newPublishings: ({ newPublishings }) => newPublishings,
    newUnpublishings: ({ newUnpublishings }) => newUnpublishings,
  },
};

export default stories;
