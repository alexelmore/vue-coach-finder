<template>
  <section>
    <CoachFilter @filterBy="(type) => this.filterTheCoaches(type)" />
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton v-if="!isCoach" mode="outline" link="true" to="/register"
          >Register As A Coach</BaseButton
        >
      </div>
      <ul v-if="hasCoaches">
        <div v-for="coach in filteredCoaches" :key="coach.id">
          <CoachItem :coach="coach" />
        </div>
      </ul>
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
    };
  },
  components: { CoachItem, CoachFilter },
  computed: {
    ...mapGetters({
      coaches: 'coaches/coaches',
      hasCoaches: 'coaches/hasCoaches',
      isCoach: 'coaches/isCoach',
    }),
  },
  methods: {
    filterTheCoaches(area) {
      this.filteredCoaches = [];
      this.filterKey = area;
      if (this.filterKey === 'all') {
        this.filteredCoaches = this.coaches;
      } else {
        this.filteredCoaches = this.coaches.filter((coach) =>
          coach.areas.includes(area)
        );
      }
    },
  },
  created() {
    this.filterTheCoaches('all');
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