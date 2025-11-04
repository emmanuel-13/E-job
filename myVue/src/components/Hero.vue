<script setup>
    import logo from "@/assets/img/glo.jpg"
    import { defineProps } from "vue";

    defineProps({
      title: {
        type: String,
        default: "Digital Experience"        
      },
      subtitle: {
        type: String,
        default: "Build, design, and deploy fast with modern tools.  Explore limitless possibilities with our intuitive platform."
      }
    });
</script>

<template>
  <section class="bg-gray-50 min-h-[70vh] flex items-center">
    <div class="max-w-7xl mx-auto px-2 md:px-12 lg:px-2 grid md:grid-cols-2 gap-10 items-center">
      
      <!-- Left Content -->
      <div class="space-y-6">
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Empower Your <span class="text-blue-600"> {{ title }} </span>
        </h1>
        <p class="text-gray-600 text-lg md:text-xl leading-relaxed">
          {{  subtitle }}
        </p>
        <div class="flex flex-wrap gap-4">
          <router-link
            to="/get-started"
            class="px-6 py-3 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </router-link>
          <router-link
            to="/learn-more"
            class="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Learn More
          </router-link>
        </div>
      </div>

      <!-- Right Image -->
      <div class="flex justify-center md:justify-end">
        <img
          :src="logo"
          alt="Hero Illustration"
          class="w-full max-w-md md:max-w-lg object-contain"
        />
      </div>

    </div>
  </section>
</template>
