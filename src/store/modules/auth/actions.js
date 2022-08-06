// Global variable to ensure that there is only one logout active logout going at a time
let timer;

export default {

    // Action for logging a user out
    logout({ commit, dispatch }) {
        // Clear timer when user manuelly clicks logout
        clearTimeout(timer)

        // Commit setUser mutation to reset user to default pre login state
        commit('setUser', {
            token: null,
            userId: null,
        })

        // Remove id, token, expirationDate from local storage after user logs out
        localStorage.removeItem('id')
        localStorage.removeItem('token')
        localStorage.removeItem('expirateDate')

        // Call request action to reset the auto fetch timer
        dispatch('requests/resetFetchTimer', {}, { root: true })


    },

    // Authorization Action
    async auth({ commit, dispatch }, payload) {
        // Type of auth action to preform
        let mode = payload.mode

        // API Key
        const key = 'AIzaSyAEj9e2mRH7mgh-hS-EytaT8a3sGWaaD3M'
        let endpoint = ''
        if (mode === 'login') {
            endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        } else if (mode === 'signup') {
            endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        }

        // Construct request object to send with post request to our FB DB
        const newRequest = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }

        // Send Fetch POST request to our FB DB, signing up the new user
        const request = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({ ...newRequest })
        })

        // Wait for request data to be returned from our FB DB
        const requestData = await request.json()
        // Error Handling for request
        if (!request.ok) {
            const { error } = requestData;
            return error.message
        }

        // Add token object to local storage
        localStorage.setItem('token', requestData.idToken)

        // Add id object to local storage
        localStorage.setItem('id', requestData.localId)

        // Set token expiration date and store it in local storage
        const expirationDate = new Date().getTime() + +(requestData.expiresIn * 1000)
        localStorage.setItem('expirateDate', expirationDate)

        // Timer that counts down using the miliseconds stored in the expiration constant as a starting point.Once timer is done, log the user out.
        timer = setTimeout(function () {
            dispatch('autoLogout')
        }, expirationDate)

        // Call signup mutation, passing it an object contructed from our newRequest object 
        commit('setUser', {
            token: requestData.idToken,
            userId: requestData.localId,
        })


    },

    // Action to try to automatically login the user
    tryLogin({ commit, dispatch }) {
        // Store user's token and id retrieved from storage in constants
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id')

        // Get timestamp from localStorage expirationDate 
        const TokenTimerTime = localStorage.getItem('expirateDate')

        // Subtract TokenTimerTime from current time 
        const expiresTime = +TokenTimerTime - new Date().getTime()

        // Check if expiresTime is less than 0, if yes, just return
        if (expiresTime < 0) {
            return
        }

        // Else if expiresTime is greater than 0, set the global timer to a new setTimeout function and use expiresTime as it duration
        timer = setTimeout(() => {
            dispatch('autoLogout')
        }, expiresTime)

        // Check if token and id are present, if so, set the user
        if (token && id) {
            commit('setUser', {
                token: token,
                userId: id,
            })
        }
    },

    // Action to redirect user if and when they get auto logged out
    autoLogout({ commit, dispatch }) {
        dispatch('logout')
        commit('setAutoLogout')
    }
}
