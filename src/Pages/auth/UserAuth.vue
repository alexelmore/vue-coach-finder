<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ errors: !email.isValid }">
        <label for="email">E-Mail</label>
        <input v-model="email.val" type="text" id="email" />
        <label for="email" v-if="!email.isValid">{{
          email.errorMessage
        }}</label>
      </div>
      <div class="form-control" :class="{ errors: !password.isValid }">
        <label for="password">Password</label>
        <input v-model="password.val" type="password" id="password" />
        <label for="email" v-if="!password.isValid">{{
          password.errorMessage
        }}</label>
      </div>
      <base-button>{{ ctaCaption }}</base-button>
      <base-button
        v-if="actionType === 'login'"
        mode="flat"
        @click="switchActionType(actionType)"
        >Signup Instead</base-button
      >
      <base-button v-else mode="flat" @click="switchActionType(actionType)"
        >Login Instead</base-button
      >
    </form>
  </base-card>
</template>

<script>
import { validateForm } from '../../utils/Validator.js';

export default {
  name: 'UserAuth',
  data() {
    return {
      email: {
        val: '',
        isValid: true,
        errorMessage: '',
      },
      password: {
        val: '',
        isValid: true,
        errorMessage: '',
      },
      actionType: 'login',
    };
  },
  computed: {
    ctaCaption() {
      return this.actionType === 'login' ? 'Login' : 'Sign Me Up';
    },
  },
  methods: {
    submitForm() {
      let isValid = validateForm(this.email, this.password);
      let { emailValidation, passwordValidation } = isValid;

      if (!emailValidation.isValid) {
        this.email = { ...emailValidation };
      } else {
        this.email = { ...emailValidation, errorMessage: '' };
      }

      if (!passwordValidation.isValid) {
        this.password = { ...passwordValidation };
      } else {
        this.password = { ...passwordValidation, errorMessage: '' };
      }

      if (passwordValidation.isValid && emailValidation.isValid) {
        this.email = { ...emailValidation, val: '' };
        this.password = { ...passwordValidation, val: '' };
        return true;
      } else {
        return false;
      }
    },
    switchActionType(formType) {
      formType === 'login'
        ? (this.actionType = 'signUp')
        : (this.actionType = 'login');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
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
</style>