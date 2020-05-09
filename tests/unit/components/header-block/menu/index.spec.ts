import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import Menu from '@/components/header-block/menu/index.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Menu.vue', () => {
  let actions;
  let getters;
  let store: Store<{}>;

  beforeEach(() => {
    actions = {
      getAuthInfo: jest.fn(),
      signOut: jest.fn(),
    };

    getters = {
      authInfo: () => ({ login: 'user' }),
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          actions,
          getters,
          namespaced: true,
        },
      },
    });
  });

  it('render the component', () => {
    const wrapper = shallowMount(Menu, {
      localVue,
      store,
      stubs: ['router-link', 'Btn'],
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('methods.showAuth changes $data.formType', () => {
    const formType = new FileReader();
    const wrapper = shallowMount(Menu, {
      localVue,
      store,
      stubs: ['router-link', 'Btn'],
    });

    expect(wrapper.vm.$data.formType).not.toBe(formType);

    (wrapper.vm as any).showAuth(formType);

    expect(wrapper.vm.$data.formType).toBe(formType);
  });

  it('methods.showAuth set $data.formType = "", if $data.formType equals the argument', () => {
    const formType = new FileReader();
    const wrapper = shallowMount(Menu, {
      localVue,
      store,
      stubs: ['router-link', 'Btn'],
      data: () => ({ formType }),
    });

    expect(wrapper.vm.$data.formType).toBe(formType);

    (wrapper.vm as any).showAuth(formType);

    expect(wrapper.vm.$data.formType).toBe('');
  });
});
