
import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './Pages/coaches/CoachDetail.vue'
import CoachesList from './Pages/coaches/CoachesList.vue'
import CoachesRegistration from './Pages/coaches/CoachRegistration.vue'
import RequestReceived from './Pages/requests/RequestReceived.vue'
import ContactCoach from './Pages/requests/ContactCoach.vue'
import NotFound from './Pages/NotFound.vue'

// Init and store ref to Vue Router object in a constant
const router = createRouter({
    // Set history property to the createWebHistory method
    history: createWebHistory(),
    // Routes registration and config
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id', component: CoachDetail, children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachesRegistration },
        { path: '/requests', component: RequestReceived },

        {
            path: "/:notFound(.*)", component: NotFound,
        }

    ]
})

// Export router const to use throughout the app
export default router