<template>
  <div>
    <div v-if="!error">
      <div v-if="isLoading" class="request-spinner"><BaseSpinner /></div>
      <div v-else-if="readyToGo">
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
    <div v-else>
      <BaseDialog
        @close="() => (this.error = null)"
        :show="!!error"
        title="An Error Occurred"
      >
        <p>{{ error }}</p>
      </BaseDialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  name: 'RequestReceived',
  components: { RequestItem },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  created() {
    this.loadRequests();
  },
  computed: {
    ...mapGetters({
      requests: 'requests/getRequests',
      hasRequests: 'requests/hasRequests',
    }),
    coachId() {
      return this.$route.params.id;
    },
    readyToGo() {
      return !this.isLoading && this.requests.length;
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        const data = await this.$store.dispatch('requests/fetchRequests');
        console.log(data);
        this.isLoading = false;
      } catch (err) {
        console.log(err.message);
        this.error =
          'Unable to load request messages. Please try again at a later time';
        this.isLoading = false;
      }
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
.request-spinner {
  margin-top: 2.5rem;
}
</style>