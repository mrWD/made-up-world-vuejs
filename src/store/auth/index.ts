import axios from 'axios';
import { Module } from 'vuex';
import { GET_AUTH_INFO, GET_TOKEN, TOKEN } from '@/constants/story';
import { IAuthState, IRootState } from '../interfaces';

const auth: Module<IAuthState, IRootState> = {
  namespaced: true,

  state: {
    token: null,
    authInfo: null,
  },

  actions: {
    async getAuthInfo({ commit }): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        const { data } = await axios.get('http://localhost:5000/api/auth', {
          headers: { Authorization: token },
        });

        commit(GET_TOKEN, token);
        commit(GET_AUTH_INFO, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async signUp(_, body): Promise<void> {
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/signup', body);
        const formData = new FormData();

        formData.append('userId', data);
        formData.append('file', body.file);

        await axios.post('http://localhost:5000/api/upload/image', formData, {
          headers: {
            'Content-type': 'multipart/form-data; charset=utf8; boundary="--Boundary-8F6C36F3-A273-4FF8-AED2-1098C7C5BD87"--Boundary-8F6C36F3-A273-4FF8-AED2-1098C7C5BD87',
          },
        });
      } catch (error) {
        throw new Error('Problems with grabbing the page!');
      }
    },

    async signIn({ dispatch }, body): Promise<void> {
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/signin', body);

        localStorage.setItem(TOKEN, data.token);

        dispatch('getAuthInfo');
      } catch (error) {
        throw new Error('Problems with grabbing the page!');
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
