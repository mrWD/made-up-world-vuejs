import { shallowMount } from '@vue/test-utils';
import moment from 'moment';

import Field from '@/components/field/index.vue';

describe('Field.vue', () => {
  it('render the component', () => {
    const wrapper = shallowMount(Field);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      value: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      type: {
        type: String as () => 'text' | 'textarea',
      },
      row: {
        type: [String, Number],
      },
    };

    expect((Field as any).options.props).toEqual(expectedProps);
  });

  it('filters.dateReplacer change the first argument format to "DD.MM.YYYY"', () => {
    const today = new Date();
    const expectedValue = moment(today).format('DD.MM.YYYY');

    expect((Field as any).options.filters.dateReplacer(today)).toBe(expectedValue);
  });

  it('filters.dateReplacer return the second argument if the first one is empty', () => {
    const expectedValue = 'Default value';

    expect((Field as any).options.filters.dateReplacer('', expectedValue)).toBe(expectedValue);
  });
});
