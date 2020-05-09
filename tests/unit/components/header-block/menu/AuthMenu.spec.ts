import { shallowMount } from '@vue/test-utils';

import AuthMenu from '@/components/header-block/menu/AuthMenu.vue';

describe('AuthMenu.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(AuthMenu, {
      stubs: ['router-link', 'Btn'],
      listeners: {
        signOut: jest.fn(),
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      login: {
        type: String,
      },
    };

    expect((AuthMenu as any).options.props).toEqual(expectedProps);
  });
});
