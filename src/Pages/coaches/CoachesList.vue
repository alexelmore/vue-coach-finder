<template>
  <div>
    <BaseDialog
      @close="() => (this.error = null)"
      :show="!!error"
      title="An Error Occurred"
    >
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <section>
        <CoachFilter
          :updateMenu="updateMenu"
          @filterBy="(type) => this.filterTheCoaches(type)"
        />
      </section>
      <section>
        <BaseCard>
          <div class="controls">
            <BaseButton mode="outline" @click="loadCoaches(true)"
              >Refresh</BaseButton
            >
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
            <ul v-if="filteredCoaches.length">
              <div v-for="coach in filteredCoaches" :key="coach.id">
                <CoachItem :coach="coach" />
              </div>
            </ul>
          </div>
          <h3 v-else>No Coaches Found...</h3>
        </BaseCard>
      </section>
    </section>
  </div>
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
      update: false,
      error: null,
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
    updateMenu() {
      return this.update;
    },
  },
  methods: {
    filterTheCoaches(area) {
      this.isLoading = true;
      this.filterKey = area;
      if (this.filterKey === 'all') {
        this.filteredCoaches = this.coaches;
        this.isLoading = false;
      } else {
        this.filteredCoaches = this.coaches.filter((coach) =>
          coach.areas.includes(area)
        );
        this.isLoading = false;
      }
    },
    async loadCoaches(forceReload = false) {
      this.update = true;
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/fetchCoaches', {
          forceRefresh: forceReload,
        });
        this.filterTheCoaches('all');
        this.isLoading = false;
        this.update = false;
      } catch (err) {
        this.error = 'Unable to load coaches. Please try again at a later time';
        this.isLoading = false;
        this.update = false;
      }
    },
  },
  created() {
    this.loadCoaches(false);
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