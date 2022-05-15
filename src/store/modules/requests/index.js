import requestsMutations from './mutations.js';
import requestsActions from './actions.js';
import requestsGetters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            requests: '666'
        };
    },
    mutations: requestsMutations,
    actions: requestsActions,
    getters: requestsGetters
};