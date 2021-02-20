<template>
  <div class="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">

    <logout-button></logout-button>

    <h1>Welcome to the Dashboard Page!</h1>
    <h2>Is a user logged in: {{ isLoggedIn }}</h2>

    <div>{{ user.name }}</div>
    <div>
      {{ user.email }}
    </div>
  </div>
</template>

<script>
import LogoutButton from "../components/LogoutButton.vue";

export default{
  data() {
    return {
      isLoggedIn: false,
      user: [],
    };
  },

  components: 
  {
    LogoutButton
  },


  created() {

    this.isLoggedIn = !!localStorage.getItem("isLoggedIn");

    if (this.isLoggedIn) {
      this.$store.dispatch("loadUser");
      this.user = this.$store.getters.getUser;
    }
  },
};
</script>
