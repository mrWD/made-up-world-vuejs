import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_USER_INFO,
  GET_USER_LIST,
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
  TOKEN,
  UPDATE_REQUEST_COUNT,
  ADD_ERROR,
} from '@/constants/story';
import { IUsersState, IRootState } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const users: Module<IUsersState, IRootState> = {
  namespaced: true,

  state: {
    userInfo: null,
    userList: null,
    pageNumber: 1,
    pageCount: 0,
  },

  actions: {
    async getUserInfo({ commit }, login): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/users/user-info`, { login });

        commit(GET_USER_INFO, data);
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async getUserList({ commit }, body): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/users/all`, body);

        commit(GET_USER_LIST, data.userList);
        commit(GET_PAGE_NUMBER, data.page);
        commit(GET_PAGE_COUNT, data.pages);
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async follow({ commit }, login): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        await axios.post(`${VUE_APP_API_URL}/users/follow`, { login }, {
          headers: { Authorization: token },
        });
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async unfollow({ commit }, login): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        await axios.post(`${VUE_APP_API_URL}/users/unfollow`, { login }, {
          headers: { Authorization: token },
        });
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
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
    [GET_USER_INFO](state, userInfo: object | null) {
      state.userInfo = userInfo;
    },
    [GET_USER_LIST](state, userList: object[] | null) {
      state.userList = userList;
    },
  },

  getters: {
    userInfo: ({ userInfo }): object | null => userInfo,
    userList: ({ userList }): object[] | null => userList,
    pageNumber: ({ pageNumber }): number => pageNumber,
    pageCount: ({ pageCount }): number => pageCount,
  },
};

export default users;
