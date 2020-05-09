import { shallowMount } from '@vue/test-utils';

import Photo from '@/components/photo/index.vue';

describe('Photo.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(Photo);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      src: {
        type: String,
      },
      alt: {
        type: String,
      },
      width: {
        type: String,
      },
      height: {
        type: String,
      },
    };

    expect((Photo as any).options.props).toEqual(expectedProps);
  });

  it('$data.srcData = $props.src', () => {
    const src = 'test-src';
    const wrapper = shallowMount(Photo, {
      propsData: {
        src,
      },
    });

    expect((wrapper.vm as any).srcData).toBe(src);
  });

  it('methods.handleErr changes the value $data.srcData', () => {
    const srcData = 'test-src';
    const wrapper = shallowMount(Photo, {
      data: () => ({ srcData }),
    });

    (wrapper.vm as any).handleErr();

    expect((wrapper.vm as any).srcData).not.toBe(srcData);
  });
});
