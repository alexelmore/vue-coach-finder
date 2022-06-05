<template>
  <section>
    <CoachFilter @filterBy="(type) => this.filterTheCoaches(type)" />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline" @click="loadCoaches">Refresh</BaseButton>
        <BaseButton
          v-if="!isCoach && !isLoading"
          mode="outline"
          link="true"
          to="/register"
          >Register As A Coach</BaseButton
        >
      </div>
      <div v-if="isLoading"><BaseSpinner /></div>
      <div v-else-if="readyToGo">
        <ul v-if="coaches.length">
          <div v-for="coach in coaches" :key="coach.id">
            <CoachItem :coach="coach" />
          </div>
        </ul>
      </div>
      <h3 v-else>No Coaches Found...</h3>
    </BaseCard>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from './CoachFilter.vue';

export default {
  name: 'CoachesList',
  data() {
    return {
      filterKey: 'all',
      filteredCoaches: [],
      isLoading: false,
    };
  },
  components: { CoachItem, CoachFilter },
  computed: {
    ...mapGetters({
      coaches: 'coaches/coaches',
      hasCoaches: 'coaches/hasCoaches',
      isCoach: 'coaches/isCoach',
    }),

    readyToGo() {
      return !this.isLoading && this.filteredCoaches.length;
    },
  },
  methods: {
    filterTheCoaches(area) {
      this.filterKey = area;
      if (this.filterKey === 'all') {
        this.filteredCoaches = this.coaches;
      } else {
        this.filteredCoaches = this.coaches.filter((coach) =>
          coach.areas.includes(area)
        );
      }
    },
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/fetchCoaches');
      this.filterTheCoaches('all');
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>