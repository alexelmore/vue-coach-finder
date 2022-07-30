export default {
    addRequest(state, payload) {
        state.requests.push(payload)
    },
    fetchRequests(state, payload) {
        state.requests = payload
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    },

    resetFetchTimer(state) {
        state.lastFetch = 1;
    }
}