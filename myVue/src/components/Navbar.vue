<template>
  <nav class="bg-green-500 shadow-md fixed top-0 w-full z-50 mb-5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <img :src="logo" alt="Logo" class="h-10 w-auto img-fluid" />
          <span class="font-semibold text-lg text-gray-800">E-Job</span>
        </RouterLink>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-2">
          <RouterLink to="/" class="font-medium text-white px-3 py-4 hover:bg-gray-500" active-class="bg-green-900">Home</RouterLink>
          <RouterLink to="/about" class="font-medium text-white px-3 py-4 hover:bg-gray-500" active-class="bg-green-900">About</RouterLink>
          <RouterLink to="/jobs" class="font-medium text-white px-3 py-4 hover:bg-gray-500" active-class="bg-green-900">Jobs</RouterLink>
          <RouterLink to="/contact" class="font-medium text-white px-3 py-4 hover:bg-gray-500" active-class="bg-green-900">Contact</RouterLink>
        </div>

        <!-- Mobile Toggle -->
        <button @click="toggleMenu" class="md:hidden text-gray-700">
          <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="menuOpen" class="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
      <RouterLink to="/" class="block font-medium text-gray-800 px-3 py-4 hover:bg-gray-100" active-class="bg-green-900 text-white" @click="closeMenu">Home</RouterLink>
      <RouterLink to="/about" class="block font-medium text-gray-800 px-3 py-4 hover:bg-gray-100" active-class="bg-green-900 text-white" @click="closeMenu">About</RouterLink>
      <RouterLink to="/jobs" class="block font-medium text-gray-800 px-3 py-4 hover:bg-gray-100" active-class="bg-green-900 text-white" @click="closeMenu">Jobs</RouterLink>
      <RouterLink to="/contact" class="block font-medium text-gray-800 px-3 py-4 hover:bg-gray-100" active-class="bg-green-900 text-white" @click="closeMenu">Contact</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import logo from '@/assets/img/glo.jpg'
import { ref } from 'vue'

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const closeMenu = () => (menuOpen.value = false)
</script>
