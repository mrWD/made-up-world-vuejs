import { shallowMount } from '@vue/test-utils';

import MsgList from '@/components/chat/MsgList.vue';

describe('MsgList.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(MsgList, {
      stubs: ['router-link', 'Btn', 'Field', 'svgicon'],
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      authLogin: {
        type: String,
      },
      msgList: {
        type: Array as () => Array<{ login: string; text: string }>,
      },
    };

    expect((MsgList as any).options.props).toEqual(expectedProps);
  });

  it('has certain data', () => {
    const wrapper = shallowMount(MsgList, {
      stubs: ['router-link', 'Btn', 'Field', 'svgicon'],
    });

    const expectedData = {
      message: null,
    };

    expect(wrapper.vm.$data).toEqual(expectedData);
  });

  it('method sendMsg calls $emmit.send, proxys data.message there and clear data.message',
    () => {
      const message = 'Test';
      const wrapper = shallowMount(MsgList, {
        stubs: ['router-link', 'Btn', 'Field', 'svgicon'],
        data() {
          return {
            message,
          };
        },
      });

      expect(wrapper.vm.$data.message).toBe(message);

      (wrapper.vm as any).sendMsg();

      expect(wrapper.emitted().sendMsg).toBeTruthy();
      expect(wrapper.emitted().sendMsg[0][0]).toBe(message);

      expect(wrapper.vm.$data.message).toBeNull();
    });
});
