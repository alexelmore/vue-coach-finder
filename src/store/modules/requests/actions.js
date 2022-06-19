export default {
    async addRequest(context, payload) {
        // Current User Id
        const userId = context.rootGetters.userId;

        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
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

        try {
            if (response.ok && response.status === 200) {
                context.commit('addRequest', newRequest)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }
}