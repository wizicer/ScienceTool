import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/HomePage.vue'
import PublicationGenerator from './pages/PublicationGenerator.vue';
import TextDistiller from './pages/TextDistiller.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/pubgen', component: PublicationGenerator },
    { path: '/distiller', component: TextDistiller },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
