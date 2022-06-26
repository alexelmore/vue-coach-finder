<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ errors: !email.isValid }">
        <label for="email">E-Mail</label>
        <input v-model="email.val" type="email" id="email" />
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
      <base-button>Login</base-button>
      <base-button mode="flat">Signup Instead</base-button>
    </form>
  </base-card>
</template>

<script>
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
    };
  },
  methods: {
    submitForm() {
      let isValid = this.validateForm();
      if (isValid) {
        alert('form is good');
      } else {
        alert('fix form errors');
      }
    },
    validateForm() {
      if (this.email.val === '') {
        this.email.isValid = false;
        this.email.errorMessage = 'Email field cannot be left blank';
      } else {
        let format =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
            this.email.val
          );
        if (format) {
          this.email.isValid = true;
        } else {
          this.email.isValid = false;
          this.email.errorMessage = 'Please enter a valid email address';
          return;
        }
      }
      if (this.password.val === '') {
        this.password.isValid = false;
        this.password.errorMessage = 'Password field cannot be left blank';
      } else {
        this.password.isValid = true;
      }
      if (this.email.isValid && this.password.isValid) {
        return true;
      } else {
        return false;
      }
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