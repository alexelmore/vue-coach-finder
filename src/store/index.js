import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index.js';
const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
    },
    state() {
        return {
            userId: 'a3'
        }
    },
    getters: {
        userId(state) {
            return state.userId
        }
    }
})


export default store;