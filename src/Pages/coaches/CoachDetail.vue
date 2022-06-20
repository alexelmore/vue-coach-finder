<template>
  <div>
    <section>
      <BaseCard
        ><h3>{{ fullName }}</h3>
        <h3>*** ${{ this.selectedCoach.hourlyRate }} per hour ***</h3>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <header v-if="displayContactHeader">
          <h2>Interested? Lets connect!</h2>
          <BaseButton :to="contactPath" link="true"> Contact </BaseButton>
        </header>
        <router-view />
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in this.selectedCoach.areas"
          :key="area"
          :title="area"
          :type="area"
        >
        </BaseBadge>
        <p>{{ this.selectedCoach.description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CoachDetails',
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    if (this.id) {
      this.selectedCoach = this.coaches.find(({ id }) => id === this.id);
    }
  },

  computed: {
    ...mapGetters({
      coaches: 'coaches/coaches',
      hasCoaches: 'coaches/hasCoaches',
    }),
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactPath() {
      return `${this.$route.path}/contact`;
    },
    detailsPath() {
      return `${this.$route.path}/${this.selectedCoach.id}`;
    },
    displayContactHeader() {
      return `${this.$route.path}`.includes('contact') ? false : true;
    },
  },
};
</script>

<style>
</style>