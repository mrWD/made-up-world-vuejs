import { shallowMount } from '@vue/test-utils';

import Navigation from '@/components/header-block/Navigation.vue';

describe('Navigation.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(Navigation, {
      stubs: ['router-link'],
    });

    expect(wrapper.exists()).toBeTruthy();
  });
});
