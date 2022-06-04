import coachMutations from './mutations.js';
import coachActions from './actions.js';
import coachGetters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            coaches: [

                {
                    id: 'r1',
                    firstName: 'Rama',
                    lastName: 'Man',
                    areas: ['backend'],
                    description: 'I am Rama and I have worked as a back end developer for 3 years now.',
                    hourlyRate: 110
                },
                {
                    id: 'm1',
                    firstName: 'Mr',
                    lastName: 'Robot',
                    areas: ['backend', 'frontend'],
                    description: 'I am Mr.Robot and I have worked as a back end and a front end developer for 3 years now.',
                    hourlyRate: 120
                },
                {
                    id: 'c1',
                    firstName: 'Carl',
                    lastName: 'Career',
                    areas: ['career'],
                    description: 'I am Carl Career and I have worked as a Career Coach for over 3 years.',
                    hourlyRate: 120
                }
            ]
        };
    },
    mutations: coachMutations,
    actions: coachActions,
    getters: coachGetters
};