import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Catalog from "@/components/Catalog";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/catalog',
            component: Catalog
        },
        {
            path: '/catalog',
            component: Catalog
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/registration',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('@/components/Profile')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('@/components/AdminPage')
        },
        // {
        //     path: '/mod',
        //     name: 'moderator',
        //     // lazy-loaded
        //     component: () => import('./views/BoardModerator.vue')
        // },
        // {
        //     path: '/user',
        //     name: 'user',
        //     // lazy-loaded
        //     component: () => import('./views/BoardUser.vue')
        // }
    ]
});