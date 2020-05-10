import { Module } from 'vuex';

import { UPDATE_REQUEST_COUNT, ADD_ERROR, REMOVE_ERROR } from '@/constants/story';

import { IReqStatusState, IRootState } from '../interfaces';

const requestStatus: Module<IReqStatusState, IRootState> = {
  state: {
    isLoading: false,
    requestCount: 0,
    errors: [],
  },

  actions: {
    removeError({ commit }, err) {
      commit(REMOVE_ERROR, err);
    },
  },

  mutations: {
    [UPDATE_REQUEST_COUNT](state, isNewRequest: boolean) {
      if (isNewRequest) {
        state.requestCount += 1;
      } else {
        state.requestCount -= 1;
      }

      state.isLoading = state.requestCount > 0;
    },

    [ADD_ERROR](state, err) {
      const errorsSet = new Set(state.errors);

      errorsSet.add(err);

      state.errors = [...errorsSet];
    },

    [REMOVE_ERROR](state, err) {
      state.errors = state.errors.filter((item) => item !== err);
    },
  },

  getters: {
    isLoading: ({ isLoading }) => isLoading,
    errors: ({ errors }) => errors,
  },
};

export default requestStatus;
