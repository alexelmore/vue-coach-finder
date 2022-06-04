export default {
    getRequests(state, _getters, rootGetters) {
        const userId = rootGetters.userId;

        return state.requests.filter(req => req.userId !== userId);
    },
    hasRequests(_state, getters) {
        if (getters.getRequests.length) {
            return true
        } else {
            return false
        }

    }

}