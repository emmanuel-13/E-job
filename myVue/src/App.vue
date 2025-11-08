<script setup>
  import Navbar from './components/Navbar.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
    <Navbar />
    <div class="min-h-screen px-4 animate__animated animate__fadeInUp animate__faster">
      <RouterView />
  </div>
</template>

<style scoped>
  .animate__animated {
  --animate-duration: 0.7s;
}
</style>
