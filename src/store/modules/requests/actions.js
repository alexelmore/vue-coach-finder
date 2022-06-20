export default {
    async addRequest(context, payload) {
        // Current User Id
        const userId = context.rootGetters.userId;

        // Construct request object to send with post request 
        const newRequest = {
            coachId: userId,
            userEmail: payload.email,
            userMessage: payload.message
        }

        // Setup post request to add coach to FB data
        const response = await fetch(`https://vue-coach-bc6a2-default-rtdb.firebaseio.com/requests/${userId}.json`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(newRequest)
        })

        // Store response data and parse it into json format
        const responseData = await response.json()


        try {
            if (response.ok && response.status === 200) {
                // Call addRequest mutation, passing it an object contructed from a speard out newRequest object and the id returned back from the responseData object
                context.commit('addRequest', { ...newRequest, id: responseData.name })
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    },

    async fetchRequests(context) {
        // Current User Id
        const userId = context.rootGetters.userId;

        // Setup for sending GET request for the coaches stored in our FB DB.
        const response = await fetch(`https://vue-coach-bc6a2-default-rtdb.firebaseio.com/requests/${userId}.json`)

        // Parse returned data into json format
        const data = await response.json()

        try {
            if (response.ok && response.status === 200) {
                const requests = []
                for (const key in data) {
                    const request = {
                        coachId: key,
                        id: data[key].firstName,
                        userEmail: data[key].userEmail,
                        userMessage: data[key].userMessage
                    }
                    requests.push(request)
                }
                // Commit requests to state via fetchRequests mutation
                context.commit('fetchRequests', requests)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }
}