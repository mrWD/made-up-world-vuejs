import {
  GET_CHAT_LIST,
  GET_CHAT,
  GET_MSG_LIST,
  GET_MSG,
} from '@/constants/story';
import { MutationTree } from 'vuex';

import chats from '@/store/chats';
import { IChatState } from '@/store/interfaces';

describe('store.chats.mutations', () => {
  type Mutations = MutationTree<IChatState>;

  const { mutations } = chats;
  let state: IChatState;

  beforeEach(() => {
    state = {
      currentChat: null,
      chatList: [],
      msgList: [],
    };
  });

  it('GET_CHAT_LIST mutates state.chatList', () => {
    const newChatList = [
      {
        id: 'chatId1',
        members: [
          { login: 'member1' },
          { login: 'member2' },
        ],
      },
      {
        id: 'chatId2',
        members: [
          { login: 'member3' },
          { login: 'member1' },
        ],
      },
    ];

    expect(state.chatList).toEqual([]);

    (mutations as Mutations)[GET_CHAT_LIST](state, newChatList);

    expect(state.chatList).toEqual(newChatList);
  });

  it(`GET_CHAT the argument push to the state.chatList
    and proxys the argument.id to the state.currentChat`,
    () => {
      const newChat = {
        id: 'chatId',
        members: [
          { login: 'member1' },
          { login: 'member2' },
        ],
      };

      expect(state.chatList).toEqual([]);

      (mutations as Mutations)[GET_CHAT](state, newChat);

      expect(state.chatList).toEqual([newChat]);
      expect(state.currentChat).toEqual(newChat.id);
    });

  it('GET_CHAT proxys the argument.id to the state.currentChat', () => {
    const newChat = {
      id: 'chatId',
      members: [
        { login: 'member1' },
        { login: 'member2' },
      ],
    };

    state.chatList = [newChat];

    expect(state.chatList).toEqual([newChat]);

    (mutations as Mutations)[GET_CHAT](state, newChat);

    expect(state.chatList).toEqual([newChat]);
    expect(state.currentChat).toEqual(newChat.id);
  });

  it('GET_MSG_LIST mutates state.msgList', () => {
    const newMsgList = [
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
    ];

    expect(state.msgList).toEqual([]);

    (mutations as Mutations)[GET_MSG_LIST](state, newMsgList);

    expect(state.msgList).toEqual(newMsgList);
  });

  it('GET_MSG the argument push to the state.msgList', () => {
    const newMsg = {
      text: 'Chat text 1',
      chatID: 'chatId',
      author: { login: 'memberLogin' },
    };

    expect(state.msgList).toEqual([]);

    (mutations as Mutations)[GET_MSG](state, newMsg);

    expect(state.msgList).toEqual([newMsg]);
  });
});
