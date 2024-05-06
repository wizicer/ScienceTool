import { createRouter, createWebHistory } from 'vue-router'
import CcfTool from './pages/CcfTool.vue';
import Home from './pages/HomePage.vue'
import PubDeadlines from './pages/PubDeadlines.vue';
import PublicationGenerator from './pages/PublicationGenerator.vue';
import TextCombiner from './pages/TextCombiner.vue';
import TextDistiller from './pages/TextDistiller.vue';
import DbPubInfo from './pages/DbPubInfo.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/pubgen', component: PublicationGenerator },
    { path: '/distiller', component: TextDistiller },
    { path: '/ccf', component: CcfTool },
    { path: '/combiner', component: TextCombiner },
    { path: '/deadlines', component: PubDeadlines },
    { path: '/pub/db', component: DbPubInfo },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
