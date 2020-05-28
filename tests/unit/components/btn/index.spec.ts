import { shallowMount } from '@vue/test-utils';

import Btn from '@/components/btn/index.vue';

describe('Btn.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(Btn, {
      listeners: {
        click: jest.fn(),
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      isSmall: {
        type: Boolean,
      },
      isError: {
        type: Boolean,
      },
      isText: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
    };

    expect((Btn as any).options.props).toEqual(expectedProps);
  });
});
