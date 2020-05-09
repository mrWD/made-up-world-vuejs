import { shallowMount } from '@vue/test-utils';

import ChatList from '@/components/chat/ChatList.vue';

describe('ChatList.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(ChatList, {
      stubs: ['Btn', 'svgicon'],
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      chatList: {
        type: Array as () => Array<{ id: string; login: string }>,
      },
    };

    expect((ChatList as any).options.props).toEqual(expectedProps);
  });
});
