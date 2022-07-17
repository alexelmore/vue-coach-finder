export default {

    async signup({ commit }, payload) {
        const key = 'AIzaSyAEj9e2mRH7mgh-hS-EytaT8a3sGWaaD3M'

        const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`

        // Construct request object to send with post request to our FB DB
        const newRequest = {
            email: payload.email,
            password: payload.password,
            returnSecureTown: true
        }

        // Send Fetch POST request to our FB DB, signing up the new user
        const request = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(newRequest)
        })

        // Wait for request data to be returned from our FB DB
        const requestData = await request.json()

        // Error Handling for request
        try {
            if (request.status === 200 && request.ok) {
                // Call signup mutation, passing it an object contructed from our newRequest object 
                commit('setUser', {
                    token: requestData.idToken,
                    userId: requestData.localId,
                    tokenExpiration: requestData.expiresIn
                })

            } else {
                // Throw error if request status is not 200 or if not ok
                // Pull error object out of requestData object use it as the error
                const { error } = requestData;

                throw new Error(error.message)
            }
        } catch (error) {
            // Return error message
            return error.message

        }
    }
}