<template>
  <section>
    <BaseCard>
      <BaseDialog @close="this.closeModal()" :show="showRegModal" title="Huzzah!">
        <h3>{{ message }}</h3>
      </BaseDialog>
      <h2>Become a Developer!</h2>
      <CoachForm @coachToAdd="registerCoach" />
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
import { mapActions } from "vuex";

export default {
  name: "CoachRegistration",
  data() {
    return {
      showRegModal: false,
      message: "",
    };
  },
  components: { CoachForm },
  methods: {
    async registerCoach(coach) {
      await this.addCoach(coach);
      this.confirmCoach(coach);
    },
    ...mapActions({
      addCoach: "coaches/addCoach",
    }),

    confirmCoach(coach) {
      this.showRegModal = true;
      this.message = `${coach.firstName} has been registered as a Developer with a rate of $${coach.hourlyRate} per hour!`;
    },
    closeModal() {
      this.showRegModal = false;
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
