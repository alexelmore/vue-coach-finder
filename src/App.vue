<template>
  <TheHeader />
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    TheHeader,
  },
  created() {
    // Once app is created, dispatch the "tryLogin" action
    this.$store.dispatch("tryLogin");
    // Check if user is logged in, if so, route them to coaches page, if not, route them to login page
    const isAuthorized = this.$store.getters.isloggedIn;
    if (!isAuthorized) {
      this.$router.replace("/auth");
    } else {
      this.$router.replace("/coaches");
    }
  },

  computed: {
    ...mapGetters({
      autoLogoutStatus: "autoLogoutStatus",
    }),
  },

  // Watcher that checks if user is or was auto logged out, if yes, then they are redirected to login screen
  watch: {
    autoLogoutStatus(curValue, prevValue) {
      if (curValue && curValue !== prevValue) {
        this.$router.replace("/auth");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
