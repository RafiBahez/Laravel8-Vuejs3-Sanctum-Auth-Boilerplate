<template>
  <!-- component: LoadingModal; showing progress -->
  <div v-if="isLoading">
    <loading-modal message="Please Wait..."></loading-modal>
  </div>

  <!-- Registration Page Content-->
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register to create an account
        </h2>
      </div>

      <div>
        <form @submit.prevent="register">
          <div class="space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="name" class="sr-only">Email address</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  v-model="formData.name"
                  autocomplete="name"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label for="email" class="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  v-model="formData.email"
                  autocomplete="email"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label for="password_confirmation" class="sr-only"
                  >Confirm Password</label
                >
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  v-model="formData.password_confirmation"
                  type="password"
                  required
                  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                @click="setLoading"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
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

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://development.test:8000";

export default {
  data() {
    return {
      // user data for registration.
      formData: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

    // register user into the system.
    async register() {
      try {
        await axios
          .get("/sanctum/csrf-cookie")
          .then(() => {
            axios
              .post("api/register", this.formData)
              .then(() => {
                // toggles the loading animation components.
                this.stopLoading();
                // move to login once user is registered.
                this.$router.push({ name: "login" });
              })
              .catch((getRegisterError) => {
                // stops the loading animation components.
                this.stopLoading();
                this.errors = getRegisterError;
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
