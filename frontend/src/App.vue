<template>
  <top-navigation />
  <router-view />
</template>

<script>
import TopNavigation from "./components/TopNavigation.vue";
export default {
  components: {
    TopNavigation,
  },
};
</script>
