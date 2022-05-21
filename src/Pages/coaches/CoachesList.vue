<template>
  <section>filter</section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton>Refresh</BaseButton>
        <BaseButton link="true" to="/register">Register As A Coach</BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <div v-for="coach in coaches" :key="coach.id">
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

export default {
  name: 'CoachesList',
  data() {
    return {};
  },
  components: { CoachItem },
  computed: {
    ...mapGetters({
      coaches: 'coaches/coaches',
      hasCoaches: 'coaches/hasCoaches',
    }),
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