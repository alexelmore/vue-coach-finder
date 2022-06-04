export default {
    addCoach(context, coach) {
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
        fetch(`https://vue-coach-bc6a2-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                coachData
            })
        })
            .then((response) => {
                //do something awesome that makes the world a better place
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
        context.commit('addCoach', { ...coachData, id: userId })
    }
}