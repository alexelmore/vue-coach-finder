
import { createRouter, createWebHistory } from 'vue-router';
import Coaches from './components/Coaches.vue'

// Init and store ref to Vue Router object in a constant
const router = createRouter({
    // Set history property to the createWebHistory method
    history: createWebHistory(),
    // Routes registration and config
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: Coaches },
        {
            path: '/coaches:id', component: null, childredn: [
                { path: 'contact', component: null }
            ]
        },
        { path: '/register', component: null },
        { path: '/requests', component: null },

        {
            path: "/:notFound(.*)", component: null,
        }

    ]
})

// Export router const to use throughout the app
export default router