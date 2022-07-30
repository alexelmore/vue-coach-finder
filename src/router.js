
import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './Pages/coaches/CoachDetail.vue'
import CoachesList from './Pages/coaches/CoachesList.vue'
import CoachesRegistration from './Pages/coaches/CoachRegistration.vue'
import RequestReceived from './Pages/requests/RequestReceived.vue'
import ContactCoach from './Pages/requests/ContactCoach.vue'
import NotFound from './Pages/NotFound.vue'
import UserAuth from './Pages/auth/UserAuth.vue'
import store from './store/index.js';

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
        { path: '/', redirect: '/coaches', beforeEnter: isAuthorized },
        { path: '/coaches', component: CoachesList, beforeEnter: isAuthorized },
        {
            path: '/coaches/:id', props: true, component: CoachDetail, children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachesRegistration },
        { path: '/requests', component: RequestReceived, beforeEnter: isAuthorized },
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