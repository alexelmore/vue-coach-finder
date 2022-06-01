export default {
    getRequests(state) {
        return state.requests;
    },
    hasRequests(_state, getters) {
        if (getters.getRequests.length > 0) {
            return true
        } else {
            return false
        }

    }

}