<template>
  <div>
    <BaseDialog
      @close="() => this.closeModule()"
      :show="!!isLoading"
      title="Message Sent"
    >
      <h3>{{ messageConfirmation }}</h3>
    </BaseDialog>

    <div v-if="!isLoading">
      <form @submit.prevent="validateForm()">
        <div class="form-control" :class="{ errors: !email.isValid }">
          <label for="email">Your E-mail</label>
          <input type="email" id="email" v-model.trim="email.val" />
          <label for="email" v-if="!email.isValid"
            >Please fill out your email</label
          >
        </div>
        <div class="form-control" :class="{ errors: !message.isValid }">
          <label for="message">Message</label>
          <textarea
            v-model="message.val"
            id="message"
            cols="30"
            rows="10"
          ></textarea>
          <label for="email" v-if="!message.isValid"
            >Please fill out a message for the coach</label
          >
        </div>
        <div class="actions" :class="{ errors: !this.formIsValid }">
          <label v-if="!this.formIsValid">
            Please fix the form fields highlighted in red
          </label>
          <BaseButton>Send Message</BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ContactCoach',
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      isLoading: false,
    };
  },

  methods: {
    ...mapActions({
      addRequest: 'requests/addRequest',
    }),
    submitForm() {
      this.addRequest({
        coachId: this.coachId,
        email: this.email.val,
        message: this.message.val,
      }).then(() => {
        this.isLoading = true;
      });
    },
    validateForm() {
      if (this.email.val === '') {
        this.email.isValid = false;
        return;
      } else {
        let format =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
            this.email.val
          );
        if (format) {
          this.email.isValid = true;
        } else {
          this.email.isValid = false;
          return;
        }
      }
      if (this.message.val === '') {
        this.message.isValid = false;
        return;
      } else {
        this.message.isValid = true;
      }

      if (this.email.isValid && this.message.isValid) {
        this.formIsValid = true;
        this.submitForm();
      } else {
        this.formIsValid = false;
        return;
      }
    },
    closeModule() {
      if (this.validateForm) {
        this.isLoading = false;
        this.$router.replace('/coaches');
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: 'userId',
      coaches: 'coaches/coaches',
    }),
    coachId() {
      return this.$route.params.id;
    },
    messageConfirmation() {
      return `Your email has been sent to ${this.coachName}`;
    },
    coachName() {
      const coach = this.coaches.filter((coach) => coach.id === this.coachId);
      return coach[0].firstName;
    },
    loadingStatus() {
      return this.isLoading;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 2rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>