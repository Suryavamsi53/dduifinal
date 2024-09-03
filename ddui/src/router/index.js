import { createRouter, createWebHistory } from 'vue-router';
import LookupList from '../components/LookupComponent.vue';
 

const routes = [
  {
    path: '/',
    name: 'LookupList',
    component: LookupList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
