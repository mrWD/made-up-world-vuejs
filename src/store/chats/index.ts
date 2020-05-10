import axios from 'axios';
import { Module } from 'vuex';
import {
  GET_CHAT_LIST,
  GET_CHAT,
  GET_MSG_LIST,
  GET_MSG,
  TOKEN,
  UPDATE_REQUEST_COUNT,
  ADD_ERROR,
} from '@/constants/story';
import { IChatState, IRootState, IMsg, ChatListWithLogin, MsgListWithLogin } from '../interfaces';

const { VUE_APP_API_URL } = process.env;

const chats: Module<IChatState, IRootState> = {
  namespaced: true,

  state: {
    currentChat: null,
    chatList: [],
    msgList: [],
  },

  actions: {
    async getChatByRecipient({ commit }, recipientID) {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.post(`${VUE_APP_API_URL}/chats/new`, { recipientID }, {
          headers: { Authorization: token },
        });

        commit(GET_CHAT, data);
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async getChatList({ commit }): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios.get(`${VUE_APP_API_URL}/chats/`, {
          headers: { Authorization: token },
        });

        commit(GET_CHAT_LIST, data);
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
      }
    },

    async getMsgList({ commit }, chatID): Promise<void> {
      const token = localStorage.getItem(TOKEN);

      if (!token) return;

      try {
        commit(UPDATE_REQUEST_COUNT, true, { root: true });

        const { data } = await axios
          .post(`${VUE_APP_API_URL}/chats/messages`, { chatID }, {
            headers: { Authorization: token },
          });

        commit(GET_MSG_LIST, data);
      } catch (err) {
        commit(ADD_ERROR, 'Problems with grabbing the page!', { root: true });
      } finally {
        commit(UPDATE_REQUEST_COUNT, false, { root: true });
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
      const stateChat = state.chatList.find(({ id }) => id === chat.id);

      if (!stateChat) {
        state.chatList.push(chat);
      }

      state.currentChat = chat.id;
    },

    [GET_MSG_LIST](state, msgList) {
      state.msgList = msgList;
    },

    [GET_MSG](state, newMsg) {
      state.msgList.push(newMsg);
    },
  },

  getters: {
    currentChat: ({ currentChat }) => currentChat,

    chatListWithLogin: ({ chatList }, _, { auth }): ChatListWithLogin[] => (
      chatList.map(({ id, members }) => {
        const member = members.find(({ login }) => login !== auth.authInfo?.login);

        return { id, login: member?.login || '' };
      })
    ),

    msgListWithLogin: ({ msgList }): MsgListWithLogin[] => msgList
      .map(({ text, chatID, author }) => ({ text, chatID, login: author.login })),
  },
};

export default chats;
