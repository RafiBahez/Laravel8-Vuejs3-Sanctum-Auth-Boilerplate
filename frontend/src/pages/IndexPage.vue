<template>
  <div class="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
    <h1>This is the Index page!</h1>

    <div v-if="isLoading">
      <loading-modal
        message="IndexPage loading..."
      >
      </loading-modal>
    </div>
    

  
    <div></div>
  </div>
</template>

<script>
import LoadingModal from "../components/LoadingModal.vue";

export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    loading(){
      this.isLoading = !this.isLoading;
    }
  },

  components: {
    LoadingModal,
  },
};
</script>
