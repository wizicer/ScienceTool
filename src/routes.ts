import { createRouter, createWebHistory } from 'vue-router'
import CcfTool from './pages/CcfTool.vue';
import Home from './pages/HomePage.vue'
import PublicationGenerator from './pages/PublicationGenerator.vue';
import TextCombiner from './pages/TextCombiner.vue';
import TextDistiller from './pages/TextDistiller.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/pubgen', component: PublicationGenerator },
    { path: '/distiller', component: TextDistiller },
    { path: '/ccf', component: CcfTool },
    { path: '/combiner', component: TextCombiner },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
