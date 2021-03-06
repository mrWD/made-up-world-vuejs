import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_AUTH_INFO,
  GET_TOKEN,
  TOKEN,
  UPDATE_REQUEST_COUNT,
} from '@/constants/story';
import { IAuthState, IRootState } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const auth: Module<IAuthState, IRootState> = {
  namespaced: true,

  state: {
    token: null,
    authInfo: null,
  },

  actions: {
    async getAuthInfo({ commit, dispatch }): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.get(`${VUE_APP_API_URL}/auth`, {
          headers: { Authorization: token },
        });

        commit(GET_TOKEN, token);
        commit(GET_AUTH_INFO, data);
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async signUp({ commit, dispatch }, body): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/auth/signup`, body);
        const formData = new FormData();

        formData.append('userId', data);
        formData.append('file', body.file);

        await axios.post(`${VUE_APP_API_URL}/upload/image`, formData, {
          headers: {
            'Content-type': 'multipart/form-data; charset=utf8;',
          },
        });
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async signIn({ commit, dispatch }, body): Promise<void> {
      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/auth/signin`, body);

        localStorage.setItem(TOKEN, data.token);

        dispatch('getAuthInfo');
      } catch (err) {
        dispatch('addError', 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    signOut({ commit }): void {
      commit(GET_AUTH_INFO, null);

      localStorage.removeItem(TOKEN);
    },
  },

  mutations: {
    [GET_TOKEN](state, token) {
      state.token = token;
    },
    [GET_AUTH_INFO](state, authInfo) {
      state.authInfo = authInfo;
    },
  },

  getters: {
    token: ({ token }): string | null => token,
    authInfo: ({ authInfo }): object | null => authInfo,
  },
};

export default auth;
