import Home from '../components/Home.vue'
import SignUp from '../components/SignUp.vue'
import Login from '../components/Login.vue'
import ProductManagement from '../views/ProductManagement.vue'
import Profile from '../views/Profile.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/product-management',
        name: 'ProductManagement',
        component: ProductManagement
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router= createRouter({
    history:createWebHistory(),
    routes
})

export default router;

