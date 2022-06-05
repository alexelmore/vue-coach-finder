export default {
    coaches(state) {
        console.log(state)
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