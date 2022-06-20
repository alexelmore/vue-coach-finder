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

    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true
        }
        const currentTimeStamp = new Date().getTime()
        return (currentTimeStamp - lastFetch) / 1000 > 60
    }
}