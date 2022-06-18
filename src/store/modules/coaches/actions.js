export default {
    async addCoach(context, coach) {

        // Current User Id
        const userId = context.rootGetters.userId;
        // New Coach Object
        const coachData = {
            firstName: coach.firstName,
            lastName: coach.lastName,
            areas: coach.areas,
            description: coach.description,
            hourlyRate: coach.hourlyRate
        }

        // Setup post request to add coach to FB data
        const response = await fetch(`https://vue-coach-bc6a2-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(coachData)
        })

        const data = await response.json()
        try {
            if (response.ok && response.status === 200) {
                console.log(`data:${data}`)
                context.commit('addCoach', { ...data, id: userId })
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }

    },

    async fetchCoaches(context) {
        console.log('context:', context)
        // Setup for sending GET request for the coaches stored in our FB DB.
        const response = await fetch('https://vue-coach-bc6a2-default-rtdb.firebaseio.com/coaches.json')

        const data = await response.json()
        try {
            if (response.ok && response.status === 200) {
                const coaches = []
                for (const key in data) {
                    const coach = {
                        id: key,
                        firstName: data[key].firstName,
                        lastName: data[key].lastName,
                        areas: data[key].areas,
                        description: data[key].description,
                        hourlyRate: data[key].hourlyRate
                    }
                    coaches.push(coach)
                }
                context.commit('initCoaches', coaches)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }
}