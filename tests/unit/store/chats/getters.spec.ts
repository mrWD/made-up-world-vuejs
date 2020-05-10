import { GetterTree } from 'vuex';
import { IRootState, IChatState } from '@/store/interfaces';

import chats from '@/store/chats';

describe('store.chats.getters', () => {
  type ChatGetter = GetterTree<IChatState, IRootState>;

  const { getters } = chats;
  const authLogin = 'user';
  const rootState = {
    auth: {
      token: null,
      authInfo: {
        login: authLogin,
      },
    },
    users: {
      userInfo: null,
      userList: null,
      pageNumber: 0,
      pageCount: 0,
    },
    pages: {
      pageList: [],
    },
    stories: {
      currentStory: null,
      storyList: [],
      pageList: [],
      pageNumber: 0,
      pageCount: 0,
    },
  };

  const chatState = {
    currentChat: 'chatId',
    chatList: [
      {
        id: 'chatId1',
        members: [
          { login: authLogin },
          { login: 'member2' },
        ],
      },
      {
        id: 'chatId2',
        members: [
          { login: 'member3' },
          { login: authLogin },
        ],
      },
    ],
    msgList: [
      {
        text: 'Chat text 1',
        chatID: 'chatId',
        author: { login: 'memberLogin' },
      },
      {
        text: 'Chat text 2',
        chatID: 'chatId',
        author: { login: 'memberLogin' },
      },
    ],
  };

  it('currentChat returns state.currentChat', () => {
    const result = (getters as ChatGetter).currentChat(chatState, {}, rootState, {});
    expect(result).toBe(chatState.currentChat);
  });

  it('chatListWithLogin returns modified state.chatList', () => {
    const result = (getters as ChatGetter).chatListWithLogin(chatState, {}, rootState, {});
    const expected = chatState.chatList.map(({ id, members }) => ({
      id,
      login: members.find(({ login }) => login !== authLogin)?.login,
    }));

    expect(result).toEqual(expected);
  });

  it('msgListWithLogin returns modified state.chatList', () => {
    const result = (getters as ChatGetter).msgListWithLogin(chatState, {}, rootState, {});
    const expected = chatState.msgList
      .map(({ text, chatID, author }) => ({ text, chatID, login: author.login }));

    expect(result).toEqual(expected);
  });
});
