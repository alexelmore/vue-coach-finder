<template>
  <div>
    <div v-if="requests.length > 0">
      <div v-for="request in requests" :key="request.id">
        <BaseCard>
          <h2>Messgage from {{ request.userEmail }}</h2>

          <p>{{ request.userMessage }}</p>
        </BaseCard>
      </div>
    </div>
    <div v-else>No requests</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RequestReceived',

  computed: {
    ...mapGetters({
      requests: 'requests/getRequests',
    }),
    coachId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style>
</style>