<template>
  <form @submit.prevent="registerCoach" ref="coachForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name</label>
      <input id="firstName" type="text" v-model.trim="firstName.val" />

      <label v-if="!firstName.isValid" for="firstName"
        >Please fill out the first name field</label
      >
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label ref="lastName" for="lastName">Last Name</label>
      <input id="lastName" type="text" v-model.trim="lastName.val" />

      <label v-if="!lastName.isValid" for="lastName"
        >Please fill out the last name field</label
      >
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input id="rate" type="number" v-model.number="rate.val" />

      <label v-if="!rate.isValid" for="role"
        >A Rate amount between $1-$999 is required</label
      >
    </div>

    <div class="form-control" :class="{ invalid: !this.areas.isValid }">
      <label>Type of Coach (select at least one coaching area):</label>
      <input
        type="checkbox"
        id="frontend"
        name="frontend"
        value="frontend"
        @change="addArea"
      />
      <label for="frontend"> I am a frontend coach</label><br />

      <input
        type="checkbox"
        id="backend"
        name="backend"
        value="backend"
        @change="addArea"
      />
      <label for="backend"> I am a backend coach</label><br />
      <input
        type="checkbox"
        id="career"
        name="career"
        value="career"
        @change="addArea"
      />
      <label for="career"> I am a career coach</label><br />

      <label v-if="!areas.isValid" for="areas"
        >Please select at least one area of coaching</label
      >
    </div>

    <div class="form-control">
      <p><label for="description">Description (optional):</label></p>
      <textarea
        id="description"
        name="description"
        rows="4"
        cols="100"
        placeholder="Tell us about yourself"
        v-model="description.val"
      ></textarea>
    </div>
    <div class="form-control" :class="{ invalid: !this.formIsValid }">
      <label v-if="!this.formIsValid">
        Please fix the form fields highlighted in red
      </label>

      <BaseButton mode="outline">Register Now!</BaseButton>
    </div>
  </form>
</template>
<script>
export default {
  name: 'CoachForm',
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      rate: { val: null, isValid: true },
      description: { val: '', isValid: true },

      areas: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  emits: ['coachToAdd'],
  methods: {
    registerCoach() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      } else {
        let newCoach = {
          firstName: this.firstName.val,
          lastName: this.lastName.val,
          description: this.description.val,
          hourlyRate: this.rate.val,
          areas: this.areas.val,
        };
        this.$emit('coachToAdd', newCoach);
        this.clearFormFields();
      }
    },
    addArea(e) {
      let area = e.target.value;
      let areaChecked = e.target.checked;
      if (this.areas.val.length === 0 && areaChecked) {
        this.areas.val.push(area);
      } else if (this.areas.val.length >= 1 && !areaChecked) {
        let filteredArray = this.areas.val.filter((a) => a !== area);
        this.areas.val = filteredArray;
      } else if (this.areas.val.length >= 1 && areaChecked) {
        if (!this.areas.val.includes(area)) {
          this.areas.val.push(area);
        }
      }
    },
    clearFormFields() {
      this.firstName.val = '';
      this.lastName.val = '';
      this.description.val = '';
      this.rate.val = null;
      this.areas.val = [];
      let checkboxes = document.querySelectorAll('input[type=checkbox]');
      checkboxes.forEach((check) => {
        check.checked = false;
      });
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
      } else {
        this.firstName.isValid = true;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
      } else {
        this.lastName.isValid = true;
      }

      if (this.rate.val <= 0 || this.rate.val === null || this.rate.val > 999) {
        this.rate.isValid = false;
      } else {
        this.rate.isValid = true;
      }
      if (this.areas.val.length > 0) {
        this.areas.isValid = true;
      } else {
        this.areas.isValid = false;
      }

      if (
        !this.areas.isValid ||
        !this.firstName.isValid ||
        !this.lastName.isValid ||
        !this.rate.isValid
      ) {
        this.formIsValid = false;
        this.goto('coachForm');
      } else if (
        this.areas.isValid &&
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.rate.isValid
      ) {
        this.formIsValid = true;
      }
    },
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
  },
};
</script>


<style scoped>
.form-control {
  margin: 2rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

input[type='checkbox'] + label {
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

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
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