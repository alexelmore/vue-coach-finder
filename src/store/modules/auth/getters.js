export default {
    userId(state) {
        return state.userId
    },
    token(state) {
        return state.token
    },

    isloggedIn(state) {
        return state.userId === null || undefined ? false : true
    },

    autoLogoutStatus(state) {
        return state.didAutoLogout
    }
}