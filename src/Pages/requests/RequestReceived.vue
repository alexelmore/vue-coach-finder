<template>
  <div>
    <div v-if="hasRequests">
      <ul v-for="request in requests" :key="request.id">
        <RequestItem :request="request" />
      </ul>
    </div>
    <div v-else>
      <BaseCard>
        <h2>No messages...</h2>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  name: 'RequestReceived',
  components: { RequestItem },
  computed: {
    ...mapGetters({
      requests: 'requests/getRequests',
      hasRequests: 'requests/hasRequests',
    }),
    coachId() {
      return this.$route.params.id;
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
header {
  text-align: center;
}
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
</style>