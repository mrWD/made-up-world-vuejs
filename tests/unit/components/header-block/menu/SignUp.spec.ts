import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import SignUp from '@/components/header-block/menu/SignUp.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

jest.mock('@/utils/pushNotifications');

describe('SignUp.vue', () => {
  let actions;
  let store: Store<{}>;

  beforeEach(() => {
    actions = {
      signIn: jest.fn(),
      signUp: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        auth: {
          actions,
          namespaced: true,
        },
      },
    });
  });

  it('render the component', () => {
    const wrapper = shallowMount(SignUp, {
      localVue,
      stubs: ['svgicon', 'Btn'],
      listeners: {
        signOut: jest.fn(),
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('Get certain props', () => {
    const expectedProps = {
      formType: {
        type: String as () => 'signin' | 'signup',
        default: '',
      },
    };

    expect((SignUp as any).options.props).toEqual(expectedProps);
  });

  it('methods.uploadFile does not do anything if target.files is empty', () => {
    const target = { files: [] };
    const wrapper = shallowMount(SignUp, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn'],
    });

    (wrapper.vm as any).uploadFile({ target });

    expect(wrapper.vm.$data.form.file).toEqual(null);
  });

  it('methods.uploadFile change $data.form.file', () => {
    const fileData = new Blob();
    const target = { files: [fileData] };
    const wrapper = shallowMount(SignUp, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn'],
    });

    (wrapper.vm as any).uploadFile({ target });

    expect(wrapper.vm.$data.form.file).toEqual(fileData);
  });

  it('methods.setImage change $data.userImg', () => {
    const target = new FileReader();
    const wrapper = shallowMount(SignUp, {
      localVue,
      store,
      stubs: ['svgicon', 'Btn'],
      data: () => ({ userImg: 'test' }),
    });

    (wrapper.vm as any).setImage({ target });

    expect(wrapper.vm.$data.userImg).toBeNull();
  });
});
