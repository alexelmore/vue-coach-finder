export default {
    getRequests(state, _getters, rootGetters) {
        // Get user ID from auth module
        const userId = rootGetters.auth.userId;
        // filter coaches agaisnt userID
        let stateCoaches = state.requests.filter(req => req.coachId !== userId)
        console.log(stateCoaches)
        // Return coach with an id that matches userId
        return state.requests.filter(req => req.coachId === userId);
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