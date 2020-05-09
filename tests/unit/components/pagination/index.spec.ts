import { shallowMount } from '@vue/test-utils';

import Pagination from '@/components/pagination/index.vue';

describe('Pagination.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(Pagination, {
      stubs: ['Btn', 'svgicon'],
      listeners: {
        click: jest.fn(),
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      pageCount: {
        type: Number,
      },
      pageNumber: {
        type: Number,
      },
    };

    expect((Pagination as any).options.props).toEqual(expectedProps);
  });
});
