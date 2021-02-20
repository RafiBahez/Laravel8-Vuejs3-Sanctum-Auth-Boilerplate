<template>
 <!-- component: LoadingModal; showing progress -->
  <div v-if="isLoading">
    <loading-modal message="Please Wait..."></loading-modal>
  </div>

  <button
    class="px-3 py-2 rounded-md text-sm text-blue-800 hover:bg-blue-400 focus: border-none"
    @click="logout()"
  >
    Logout
  </button>
</template>

<script>
//utility to store login status in local storage.
import { logOut } from "../store/utils.js";

import LoadingModal from "../components/LoadingModal.vue";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://development.test:8000";

export default {
  data() {
    return {
      isLoading: false,
    };
  },

  components: {
    LoadingModal,
  },

  methods: {
    // setting visibility of LoadingModal Component.
    setLoading() {
      this.isLoading = true;
    },

    // setting visibility of LoadingModal Component.
    stopLoading() {
      this.isLoading = false;
    },

    // loggin user into the system.
    logout() {
      this.setLoading();
      try {
        axios
          .get("/sanctum/csrf-cookie")
          .then(() => {
            axios
              .post("api/logout")
              .then(() => {
                //action for removing user state data.
                this.$store.dispatch("removeUser");

                //action for setting login to false.
                this.$store.dispatch("setIsLoggedIn", false);

                // saving login status to false in local storage.
                logOut();

                // toggles the loading animation components.
                this.stopLoading();

                // move to dashboard once user is authenticated.
                // we do replace hence to not go back!
                this.$router.replace("login");
              })
              .catch((getLogoutError) => {
                // stops the loading animation components.
                this.stopLoading();
                this.errors = getLogoutError;
              });
          })
          .catch((sanctumError) => {
            // stops the loading animation components.
            this.stopLoading();
            this.errors = sanctumError;
          });
      } catch (error) {
        // stops the loading animation components.
        this.stopLoading();
      }
    },
  },
};
</script>
