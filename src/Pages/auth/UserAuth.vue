<template>
  <div v-if="isLoading" class="request-spinner"><BaseSpinner /></div>
  <base-card v-else>
    <BaseDialog
      @close="() => this.closeErrorModule()"
      :show="!!error.hasError"
      title="Access Denined!"
    >
      <h3>{{ error.message }}</h3>
    </BaseDialog>

    <BaseDialog
      @close="() => this.closeLoggedInModal()"
      :show="!!loggedIn.isLoggedIn"
      title="Greetings!"
    >
      <h3>{{ loggedIn.message }}</h3>
    </BaseDialog>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ errors: !email.isValid }">
        <label for="email">E-Mail</label>
        <input v-model="email.val" type="text" id="email" />
        <label for="email" v-if="!email.isValid">{{ email.errorMessage }}</label>
      </div>
      <div class="form-control" :class="{ errors: !password.isValid }">
        <label for="password">Password</label>
        <input v-model="password.val" type="password" id="password" />
        <label for="email" v-if="!password.isValid">{{ password.errorMessage }}</label>
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
import { validateForm } from "../../utils/Validator.js";
import { mapActions } from "vuex";

export default {
  name: "UserAuth",
  data() {
    return {
      email: {
        val: "",
        isValid: true,
        errorMessage: "",
      },
      password: {
        val: "",
        isValid: true,
        errorMessage: "",
      },
      actionType: "login",
      error: { hasError: false, message: "" },
      loggedIn: { isLoggedIn: false, message: "You are good to go!" },
      isLoading: false,
    };
  },
  computed: {
    ctaCaption() {
      return this.actionType === "login" ? "Login" : "Sign Me Up";
    },
  },
  methods: {
    ...mapActions({
      signupUser: "signup",
    }),

    async submitForm() {
      let isValid = validateForm(this.email, this.password, "");
      let { emailValidation, passwordValidation } = isValid;

      if (!emailValidation.isValid) {
        this.email = { ...emailValidation };
      } else {
        this.email = { ...emailValidation, errorMessage: "" };
      }

      if (!passwordValidation.isValid) {
        this.password = { ...passwordValidation };
      } else {
        this.password = { ...passwordValidation, errorMessage: "" };
      }

      if (passwordValidation.isValid && emailValidation.isValid) {
        this.isLoading = true;
        if (this.actionType === "signUp") {
          let access = await this.signupUser({
            email: this.email.val,
            password: this.email.val,
          });
          this.isLoading = false;
          if (access !== undefined) {
            this.showErrorModal(access);
          } else {
            this.showLoggedInModal();
            this.setFieldsToDefault(passwordValidation, emailValidation);
          }
        } else {
          this.isLoading = false;
          console.log("Log dem HOES in!:", this.email.val, this.password.val);
          this.setFieldsToDefault(passwordValidation, emailValidation);
        }
      } else {
        return false;
      }
    },
    switchActionType(formType) {
      formType === "login" ? (this.actionType = "signUp") : (this.actionType = "login");
    },

    setFieldsToDefault(passwordValidation, emailValidation) {
      this.email = { ...emailValidation, val: "" };
      this.password = { ...passwordValidation, val: "" };
    },

    showErrorModal(errorMessage) {
      // Used var to get around block scope
      var message = "";
      if (errorMessage.includes("EXISTS")) {
        message = `The email you selected, "${this.email.val}", already exists. Please use a different email.`;
      } else if (errorMessage.includes("INVALID")) {
        message = `The email you selected, "${this.email.val}", is invalid. Please use a different email.`;
      } else {
        message =
          "There are errors preventing your from signing up. Please try again at a later time.";
      }
      this.error.message = message;
      this.error.hasError = true;
    },
    closeErrorModule() {
      this.error.hasError = false;
    },

    showLoggedInModal() {
      this.loggedIn.isLoggedIn = true;
    },
    closeLoggedInModal() {
      this.loggedIn.isLoggedIn = false;
      this.$router.replace("/coaches");
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
.request-spinner {
  margin-top: 2.5rem;
}
</style>
