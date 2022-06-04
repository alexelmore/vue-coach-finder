<template>
  <li>
    <div>
      <a :href="mailto">Respond via Email</a>
      <p>
        Message from <strong> {{ request.userEmail }}:</strong>
        {{ request.userMessage }}
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'RequestItem',
  props: ['request'],
  data() {
    return {};
  },
  computed: {
    mailto() {
      return `mailto:${this.request.userEmail}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>