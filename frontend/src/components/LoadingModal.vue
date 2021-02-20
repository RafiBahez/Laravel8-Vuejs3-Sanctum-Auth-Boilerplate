<template>
  <div
    class="h-screen w-full fixed left-0 top-0 flex flex-col justify-center items-center bg-gray-700 transition duration-150 ease-in-out z-10 "
  >
    <flower-spinner :animation-duration="2500" :size="70" :color="'#fff'" />

    <header class="pt-5 text-white size text-2xl">
      {{ message}}
    </header>
  </div>
</template>

<script>
import { FlowerSpinner } from "epic-spinners";

export default {
  props: {
    message: { String, default: "Loading, Please Wait..."},
  },

  components: {
    FlowerSpinner,
  },

};
</script>
