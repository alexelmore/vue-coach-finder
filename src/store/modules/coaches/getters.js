export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        if (state.coaches.length > 0) {
            return true
        } else {
            return false
        }
    }
}