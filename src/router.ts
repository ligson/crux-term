import {createRouter, createWebHistory} from "vue-router"

const routers = [
    {
        path: "/index",
        component: () => import('./Index.vue'),
        children: [
            {
                path: '/pod',
                component: () => import('./components/pod/PodTerm.vue'),
            },
            {
                path: '/server',
                component: () => import('./components/server/ServerTerm.vue'),
            },
        ]
    },
];

export const router = createRouter({
    history: createWebHistory("/"),
    routes: routers,
});
