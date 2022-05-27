export default {
    addCoach({ commit }, coach) {
        const coachData = {
            id: coach.id,
            firstName: coach.firstName,
            lastName: coach.lastName,
            areas: coach.areas,
            description: coach.description,
            hourlyRate: coach.hourlyRate
        }

        commit('addCoach', coachData)
    }
}