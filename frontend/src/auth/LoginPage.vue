<template>
  <!-- component: LoadingModal; showing progress -->
  <div v-if="isLoading">
    <loading-modal message="Please Wait..."></loading-modal>
  </div>

  <!-- Login Page Content-->
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="my-6 text-center text-3xl font-extrabold text-gray-900">
          Login in to your account
        </h2>
      </div>

      <div>
        <form @submit.prevent="login">
          <div class="space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email" class="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="formData.email"
                  autocomplete="email"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  v-model="formData.password"
                  autocomplete="current-password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <h2 class="text-red-900 text-sm" v-if="errors.message">
                Wrong username or password.
              </h2>
              </div>
            </div>
           
            <div class="flex items-center justify-between">
              <button
                @click="setLoading"
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingModal from "../components/LoadingModal.vue";

// utility to store login status in local storage.
import {logIn} from "../store/utils.js";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://development.test:8000";

export default {
  data() {
    return {
      // user data for loggin.
      formData: {
        eamil: "",
        password: "",
      },

      // for Loading Modal's visiblity.
      isLoading: false,

      // for storing errors.
      errors: [],
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
    async login() {
      try {
        await axios
          .get("/sanctum/csrf-cookie")
          .then(() => {
            axios
              .post("api/login", this.formData)
              .then(() => {
                axios
                  .get("api/user")
                  .then((response) => {
                    // get user data from response
                    const user = response.data;

                    //action for setting user data.
                    this.$store.dispatch("setUser", user);

                    //action for setting login to true.
                    this.$store.dispatch("setIsLoggedIn", true);

                    // saving login status to ture in local storage.
                    logIn();

                    // toggles the loading animation components.
                    this.stopLoading();

                    // move to dashboard once user is authenticated.
                    // we do replace hence to not go back!
                    this.$router.replace("dashboard");
                  })
                  .catch((getLoginError) => {
                    // stops the loading animation components.
                    this.stopLoading();
                    this.errors = getLoginError;
                  });
              })
              .catch((loginError) => {
                // stops the loading animation components.
                this.stopLoading();
                this.errors = loginError;
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
