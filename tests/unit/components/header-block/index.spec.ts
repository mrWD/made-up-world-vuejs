import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import HeaderBlock from '@/components/header-block/index.vue';

import pushNotifications from '@/utils/pushNotifications';

const localVue = createLocalVue();

localVue.use(Vuex);

jest.mock('@/utils/pushNotifications');

describe('HeaderBlock.vue', () => {
  let getters;
  let store: Store<{}>;

  beforeEach(() => {
    (pushNotifications as any).mockClear();

    getters = {
      token: () => 'token-data',
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          getters,
          namespaced: true,
        },
      },
    });
  });

  it('render the component', () => {
    const wrapper = shallowMount(HeaderBlock, {
      localVue,
      store,
      stubs: ['router-link', 'Btn', 'svgicon'],
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('has certain data', () => {
    const wrapper = shallowMount(HeaderBlock, {
      localVue,
      store,
      stubs: ['router-link', 'Btn', 'svgicon'],
    });

    const expectedData = {
      isMobileMenuVisible: false,
    };

    expect(wrapper.vm.$data).toEqual(expectedData);
  });

  it('watch.token calls pushNotifications if token is not empty', () => {
    shallowMount(HeaderBlock, {
      localVue,
      store,
      stubs: ['router-link', 'Btn', 'svgicon'],
    });

    expect(pushNotifications).toHaveBeenCalled();
  });

  it('watch.token does not call pushNotifications if token is empty', () => {
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          getters: {
            token: () => null,
          },
        },
      },
    });

    shallowMount(HeaderBlock, {
      localVue,
      store,
      stubs: ['router-link', 'Btn', 'svgicon'],
    });

    expect(pushNotifications).not.toHaveBeenCalled();
  });
});
