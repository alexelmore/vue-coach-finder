export default {
    coaches(state) {
        // Setup GET request to fetch coaches from FB DB
        return state.coaches;
    },
    hasCoaches(state) {
        if (state.coaches.length > 0) {
            return true
        } else {
            return false
        }
    },
    isCoach(_state, getters, _rootState, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.userId
        return coaches.some(coach => coach.id === userId)
    }
}