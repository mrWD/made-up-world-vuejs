import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store, ActionTree } from 'vuex';

import Chat from '@/components/chat/index.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Chat.vue', () => {
  const token = 'token-data';
  let getters;
  let actions: ActionTree<{}, {}>;
  let store: Store<{}>;

  beforeEach(() => {
    getters = {
      chatListWithLogin: () => null,
      msgListWithLogin: () => null,
      currentChat: () => null,
    };

    actions = {
      getChatList: jest.fn(),
      getMsgList: jest.fn(),
      getMsg: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        chats: {
          getters,
          actions,
          namespaced: true,
        },
      },
    });
  });

  it('render the component', () => {
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['Btn', 'svgicon', 'MsgList'],
      propsData: {
        token: 'token-data',
        authInfo: { login: 'user' },
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      token: {
        type: String,
      },
      authInfo: {
        type: Object as () => ({ login: string }),
      },
    };

    expect((Chat as any).options.props).toEqual(expectedProps);
  });

  it('has certain data', () => {
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['Btn', 'svgicon', 'MsgList'],
      propsData: {
        token: 'token-data',
        authInfo: { login: 'user' },
      },
    });

    const expectedData = {
      isChatVisisble: false,
      message: null,
      chatID: '',
      socket: new WebSocket(process.env.VUE_APP_CHAT_URL),
    };

    expect(wrapper.vm.$data).toEqual(expectedData);
  });

  it('methods.toggleChatList set to $data.isChatVisisble the opposite value', () => {
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['Btn', 'svgicon', 'MsgList'],
      propsData: {
        token: 'token-data',
        authInfo: { login: 'user' },
      },
      data: () => ({
        isChatVisisble: false,
      }),
    });

    (wrapper.vm as any).toggleChatList();

    expect(wrapper.vm.$data.isChatVisisble).toBeTruthy();

    (wrapper.vm as any).toggleChatList();

    expect(wrapper.vm.$data.isChatVisisble).toBeFalsy();
  });

  it('methods.toggleChat proxys the first argument to $data.chatID and this.getMsgList', () => {
    const chatID = 'test';
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['Btn', 'svgicon', 'MsgList'],
      propsData: {
        token: 'token-data',
        authInfo: { login: 'user' },
      },
      data: () => ({
        isChatVisisble: false,
        chatID: '',
      }),
    });

    wrapper.setMethods({
      getMsgList: jest.fn(),
    });

    (wrapper.vm as any).toggleChat(chatID);

    expect(wrapper.vm.$data.chatID).toBe(chatID);

    expect((wrapper.vm as any).getMsgList).toHaveBeenCalled();
    expect((wrapper.vm as any).getMsgList).toHaveBeenCalledWith(chatID);
  });

  it('methods.toggleChat clears the $data.chatID if the first argument === $data.chatID', () => {
    const chatID = 'test';
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn', 'MsgList'],
      propsData: {
        token: 'token-data',
        authInfo: { login: 'user' },
      },
      data: () => ({
        isChatVisisble: false,
        chatID,
      }),
    });

    (wrapper.vm as any).toggleChat(chatID);

    expect(wrapper.vm.$data.chatID).toBe('');
  });

  it('methods.sendMessage does not do anything if the argument is empty', () => {
    const token = 'token-data';
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn', 'MsgList'],
      propsData: {
        token,
        authInfo: { login: 'user' },
      },
      data: () => ({
        socket: {
          send: jest.fn(),
        },
      }),
    });

    (wrapper.vm as any).sendMessage();

    expect(wrapper.vm.$data.socket.send).not.toHaveBeenCalled();
  });

  it('methods.sendMessage proxys the argument to the $data.socket.send', () => {
    const text = 'test text';
    const chatID = 'test-chat-id';
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn', 'MsgList'],
      propsData: {
        token,
        authInfo: { login: 'user' },
      },
      data: () => ({
        chatID,
        socket: {
          send: jest.fn(),
        },
      }),
    });

    (wrapper.vm as any).sendMessage(text);

    expect(wrapper.vm.$data.socket.send).toHaveBeenCalled();
    expect(wrapper.vm.$data.socket.send)
      .toHaveBeenCalledWith(JSON.stringify({ chatID, token, text }));
  });

  it('watch.currentChat does not do anything if value is empty', () => {
    const wrapper = shallowMount(Chat, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn', 'MsgList'],
      propsData: {
        token,
        authInfo: { login: 'user' },
      },
      data: () => ({ isChatVisisble: false }),
    });

    jest.spyOn(wrapper.vm as any, 'toggleChat');

    expect(wrapper.vm.$data.isChatVisisble).toBeFalsy();
    expect((wrapper.vm as any).toggleChat).not.toHaveBeenCalled();
  });

  it(`watch.currentChat proxys the argument to the methods.toggleChat
    and change $data.isChatVisisble to the opposite`,
    () => {
      const currentChat = 'current-chat';

      store = new Vuex.Store({
        modules: {
          chats: {
            namespaced: true,
            actions,
            getters: {
              chatListWithLogin: () => null,
              msgListWithLogin: () => null,
              currentChat: () => currentChat,
            },
          },
        },
      });

      const wrapper = shallowMount(Chat, {
        localVue,
        store,
        stubs: ['svgicon', 'Btn', 'MsgList'],
        propsData: {
          token,
          authInfo: { login: 'user' },
        },
        data: () => ({ isChatVisisble: false }),
      });

      jest.spyOn(wrapper.vm as any, 'toggleChat');

      expect(wrapper.vm.$data.isChatVisisble).toBeTruthy();
    });
});
