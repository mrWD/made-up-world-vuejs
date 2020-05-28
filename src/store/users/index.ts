import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_USER_INFO,
  GET_USER_LIST,
  GET_PAGE_NUMBER,
  GET_PAGE_COUNT,
  GET_IMAGE_DESTINATION,
  TOKEN,
  UPDATE_REQUEST_COUNT,
  ADD_FOLLOWING,
  REMOVE_FOLLOWING,
} from '@/constants/story';
import { IUsersState, IRootState } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const users: Module<IUsersState, IRootState> = {
  namespaced: true,

  state: {
    userInfo: null,
    userList: null,
    destination: '',
    pageNumber: 1,
    pageCount: 0,
    newFollowings: [],
    newUnfollowings: [],
  },

  actions: {
    async getUserInfo({ commit, dispatch }, login): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/users/user-info`, { login });

        commit(GET_USER_INFO, data.user);
        commit(GET_IMAGE_DESTINATION, data.destination);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async getUserList({ commit, dispatch }, body): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/users/all`, body);

        commit(GET_USER_LIST, data.userList);
        commit(GET_PAGE_NUMBER, data.page);
        commit(GET_PAGE_COUNT, data.pages);
        commit(GET_IMAGE_DESTINATION, data.destination);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async follow({ commit, dispatch }, login): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        await axios.post(`${VUE_APP_API_URL}/users/follow`, { login }, {
          headers: { Authorization: token },
        });

        commit(ADD_FOLLOWING, login);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async unfollow({ commit, dispatch }, login): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        await axios.post(`${VUE_APP_API_URL}/users/unfollow`, { login }, {
          headers: { Authorization: token },
        });

        commit(REMOVE_FOLLOWING, login);
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
    [GET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo;
    },
    [GET_USER_LIST](state, userList) {
      state.userList = userList;
    },
    [ADD_FOLLOWING](state, login) {
      state.newFollowings.push(login);

      state.newUnfollowings.splice(state.newUnfollowings.indexOf(login), 1);
    },
    [REMOVE_FOLLOWING](state, login) {
      state.newUnfollowings.push(login);

      state.newFollowings.splice(state.newFollowings.indexOf(login), 1);
    },
    [GET_IMAGE_DESTINATION](state, destination) {
      state.destination = `${VUE_APP_API_URL}/${destination}`;
    },
  },

  getters: {
    userInfo: ({ userInfo }) => userInfo,
    userList: ({ userList }) => userList,
    newFollowings: ({ newFollowings }) => newFollowings,
    newUnfollowings: ({ newUnfollowings }) => newUnfollowings,
    destination: ({ destination }) => destination,
    pageNumber: ({ pageNumber }) => pageNumber,
    pageCount: ({ pageCount }) => pageCount,
  },
};

export default users;
