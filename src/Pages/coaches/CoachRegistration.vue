<template>
  <section>
    <BaseCard>
      <h2>Become a Coach!</h2>
      <form class="form-control" @submit.prevent="registerCoach">
        <div class="field">
          <label for="firstName">First Name</label>
          <input required id="firstName" type="text" v-model="firstName" />
        </div>
        <div class="field">
          <label for="lastName">Last Name</label>
          <input required id="lastName" type="text" v-model="lastName" />
        </div>

        <div class="field">
          <label for="rate">Hourly Rate</label>
          <input required id="rate" type="number" v-model.number="rate" />
        </div>

        <div class="field">
          <h3>Type of Coach:</h3>
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
        </div>
        <div>
          <p><label for="description">Desciption:</label></p>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="100"
            placeholder="Tell us about yourself"
            v-model="description"
          ></textarea>
        </div>
        <div class="field">
          <BaseButton mode="outline">Register Now!</BaseButton>
        </div>
      </form>
    </BaseCard>
  </section>
  {{ this.areas }}
</template>

<script>
export default {
  name: 'CoachRegistration',
  data() {
    return {
      firstName: '',
      lastName: '',
      rate: null,
      description: '',
      id: '',
      areas: [],
    };
  },
  methods: {
    registerCoach() {
      let id = `${this.firstName[0]}-${this.lastName[0]}`;
      if (this.areas.length > 0) {
        let newCoach = {
          id,
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          hourlyRate: this.rate,
          areas: this.areas,
        };
        console.log('coach to add:', newCoach);
        this.clearFormFields();
      } else {
        alert('Please select at least one type of coach');
      }
    },
    addArea(e) {
      const id = e.target.id;
      const hasArea = e.target.checked;
      if (hasArea) {
        if (!this.areas.includes(id)) {
          this.areas.push(id);
        }
      } else {
        if (this.areas.includes(id)) {
          let filteredArray = this.areas.filter((area) => area !== id);
          this.areas = filteredArray;
        }
      }
    },
    clearFormFields() {
      this.firstName = '';
      this.lastName = '';
      this.description = '';
      this.rate = null;
      this.areas = [];
      let checkboxes = document.querySelectorAll('input[type=checkbox]');
      checkboxes.forEach((check) => {
        check.checked = false;
      });
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


