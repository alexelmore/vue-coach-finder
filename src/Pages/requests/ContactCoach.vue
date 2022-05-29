<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @change="validateForm"
      />
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
        @change="validateForm"
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
</template>

<script>
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
    };
  },
  methods: {
    submitForm(e) {
      if (this.validateForm()) {
        console.log('form is good to go!', e);
      } else {
        return;
      }
    },
    validateForm() {
      if (this.email.val === '') {
        this.email.isValid = false;
      } else {
        this.email.isValid = true;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
      } else {
        this.message.isValid = true;
      }

      if (this.email.isValid && this.message.isValid) {
        this.formIsValid = true;
        return true;
      } else {
        this.formIsValid = false;
        return false;
      }
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