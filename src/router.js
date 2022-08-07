import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

// Load Below components and their paths only when they are needed
const CoachDetail = () => import('./Pages/coaches/CoachDetail.vue');
const CoachesRegistration = () => import('./Pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./Pages/requests/ContactCoach.vue');
const RequestReceived = () => import('./Pages/requests/RequestReceived.vue')
const CoachesList = () => import('./Pages/coaches/CoachesList.vue');
const NotFound = () => import('./Pages/NotFound.vue');
const UserAuth = () => import('./Pages/auth/UserAuth.vue');

// Route Guard to send user to login page if they are not authorized
const isAuthorized = (to, from, next) => {
    const authorized = store.getters['isloggedIn'];
    authorized === true ? next() : next('/auth')
}

// Init and store ref to Vue Router object in a constant
const router = createRouter({
    // Set history property to the createWebHistory method
    history: createWebHistory(),
    // Routes registration and config
    routes: [
        {
            path: '/', redirect: '/coaches', beforeEnter: isAuthorized
        },

        {
            path: '/coaches', component: CoachesList, beforeEnter: isAuthorized
        },

        {
            path: '/coaches/:id', props: true, component: CoachDetail, children: [
                { path: 'contact', component: ContactCoach }
            ]
        },

        {
            path: '/register', component: CoachesRegistration
        },

        {
            path: '/requests', component: RequestReceived, beforeEnter: isAuthorized
        },

        {
            path: "/auth", component: UserAuth,
        },

        {
            path: "/:notFound(.*)", component: NotFound, beforeEnter: isAuthorized
        }


    ]
})

// Export router const to use throughout the app
export default router