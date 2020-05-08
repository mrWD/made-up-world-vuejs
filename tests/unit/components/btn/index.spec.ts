import { shallowMount } from '@vue/test-utils';

import Btn from '@/components/btn/index.vue';

describe('Btn.vue', (): void => {
  it('render the component', (): void => {
    const wrapper = shallowMount(Btn);

    expect(wrapper.exists()).toBeTruthy();
  });

  // it('Renders component with certain props', () => {
  //   const expectedProps = {
  //     isSmall: {
  //       type: Boolean,
  //     },
  //     isText: {
  //       type: Boolean,
  //     },
  //     disabled: {
  //       type: Boolean,
  //     },
  //   };

  //   const wrapper = shallowMount(Btn);

  //   console.log(wrapper);

  //   expect(wrapper.props).toEqual(expectedProps);
  // });
});
