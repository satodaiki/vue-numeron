import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Start from '@/components/templates/Start.vue';
import Play from '@/components/templates/Play.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'start',
    component: Start,
  },
  {
    path: '/:mode',
    name: 'play',
    component: Play,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
