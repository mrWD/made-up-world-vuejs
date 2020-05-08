import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import users from './users';
import page from './page';
import stories from './stories';
import chats from './chats';
import requestStatus from './requestStatus';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    page,
    stories,
    chats,
    requestStatus,
  },
});
