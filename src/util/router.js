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
            path: '/admin',
            redirect: '/admin/users',
            name: 'admin'
        },
        {
            path: '/admin/users',
            name: 'users',
            // lazy-loaded
            component: () => import('@/components/admin/user/UsersList.vue')
        },
        {
            path: '/admin/publications',
            name: 'publications',
            // lazy-loaded
            component: () => import('@/components/admin/publication/Publications')
        },
        {
            path: '/admin/orders',
            name: 'orders',
            // lazy-loaded
            component: () => import('@/components/admin/order/Orders')
        },
        {
            path: '/admin/users/add',
            name: 'add-user',
            // lazy-loaded
            component: () => import('@/components/admin/user/AddUser')
        },
        {
            path: '/admin/users/edit/:id',
            name: 'edit-user',
            // lazy-loaded
            component: () => import('@/components/admin/user/EditUser')
        }
    ]
});