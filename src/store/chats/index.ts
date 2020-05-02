import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_CHAT_LIST,
  GET_CHAT,
  GET_MSG_LIST,
  GET_MSG,
  TOKEN,
} from '@/constants/story';
import { IChatState, IRootState, IMsg } from '../interfaces';

const chats: Module<IChatState, IRootState> = {
  namespaced: true,

  state: {
    chatList: null,
    msgList: null,
  },

  actions: {
    async createChat({ commit }, recipientID) {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        const { data } = await axios
          .post(`${process.env.VUE_APP_API_URL}/chats/new`, { recipientID }, {
            headers: { Authorization: token },
          });

        commit(GET_CHAT, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },
    async getChatList({ commit }): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/chats/`, {
          headers: { Authorization: token },
        });

        commit(GET_CHAT_LIST, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },
    async getMsgList({ commit }, chatID): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        const { data } = await axios
          .post(`${process.env.VUE_APP_API_URL}/chats/messages`, { chatID }, {
            headers: { Authorization: token },
          });

        commit(GET_MSG_LIST, data);
      } catch (e) {
        throw new Error('Problems with grabbing the page!');
      }
    },
    getMsg({ commit }, { data }): void {
      commit(GET_MSG, JSON.parse(data));
    },
  },

  mutations: {
    [GET_CHAT_LIST](state, chatList) {
      state.chatList = chatList;
    },
    [GET_CHAT](state, chat) {
      if (!state.chatList) {
        state.chatList = [chat];
      } else {
        state.chatList.push(chat);
      }
    },
    [GET_MSG_LIST](state, msgList) {
      state.msgList = msgList;
    },
    [GET_MSG](state, newMsg) {
      if (!state.msgList) {
        state.msgList = [newMsg];
      } else {
        state.msgList.push(newMsg);
      }
    },
  },

  getters: {
    chatListWithLogin: ({ chatList }, _, { auth }): object[] | null => {
      if (!chatList) {
        return null;
      }

      return chatList.map(({ id, members }) => {
        const member = members.find(({ login }) => login !== auth.authInfo?.login);

        return { id, login: member?.login };
      });
    },
    msgListWithLogin: ({ msgList }): object[] | null => msgList && msgList
      .map(({ text, chatID, author }) => ({ text, chatID, login: author.login })),
  },
};

export default chats;
