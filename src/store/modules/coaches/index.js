import coachMutations from './mutations.js';
import coachActions from './actions.js';
import coachGetters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            coaches: [
                {
                    id: 'a1',
                    firstName: 'Alex',
                    lastName: 'Elmore',
                    areas: ['frontend', 'AEM'],
                    description: 'I am Alex and I have worked as a front end AEM developer for 2 years now.',
                    hourlyRate: 100
                },
                {
                    id: 'r1',
                    firstName: 'Rama',
                    lastName: 'Man',
                    areas: ['backend', 'AEM'],
                    description: 'I am Rama and I have worked as a back end AEM developer for 2 years now.',
                    hourlyRate: 110
                }
            ]
        };
    },
    mutations: coachMutations,
    actions: coachActions,
    getters: coachGetters
};