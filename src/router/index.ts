import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/story-list/index.vue'),
  },
  {
    path: '/my-stories',
    name: 'MyStories',
    component: () => import('@/views/story-list/index.vue'),
    props: {
      isOwner: true,
    },
  },
  {
    path: '/user-list',
    name: 'UserList',
    component: () => import('@/views/user-list/index.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
  },
  {
    path: '/story/:id',
    name: 'Story',
    component: () => import('@/views/story/index.vue'),
  },
  {
    path: '/edit-page/:id?',
    name: 'EditPage',
    component: () => import('@/views/edit-page/index.vue'),
  },
  {
    path: '/edit-story/:id',
    name: 'EditStory',
    component: () => import('@/views/edit-story/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
