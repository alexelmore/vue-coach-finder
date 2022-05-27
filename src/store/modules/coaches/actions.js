export default {
    addCoach(context, coach) {
        const coachData = {
            id: context.rootGetters.userId,
            firstName: coach.firstName,
            lastName: coach.lastName,
            areas: coach.areas,
            description: coach.description,
            hourlyRate: coach.hourlyRate
        }

        context.commit('addCoach', coachData)
    }
}