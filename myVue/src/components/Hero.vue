<script setup>
import { ref, computed } from "vue"
import "animate.css"

// Array of hero slides
const slides = ref([
  {
    id: 1,
    title: "Digital Experience",
    subtitle:
      "Build, design, and deploy fast with modern tools. Explore limitless possibilities with our intuitive platform.",
    image: "/src/assets/img/5995587.jpg",
  },
  {
    id: 2,
    title: "Innovation Meets Speed",
    subtitle:
      "Deliver exceptional digital products with unmatched efficiency and creative freedom.",
    image: "/src/assets/img/589.jpg",
  },
  {
    id: 3,
    title: "Empower Your Team",
    subtitle:
      "Collaborate seamlessly, accelerate development, and scale your business with confidence.",
    image: "/src/assets/img/5883.jpg",
  },
])

const currentIndex = ref(0)

// Computed current slide
const currentSlide = computed(() => slides.value[currentIndex.value])

// Navigation
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

// Auto-slide every 7 seconds
setInterval(() => {
  nextSlide()
}, 7000)
</script>

<template>
  <section
    class="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-center bg-cover transition-all duration-700"
      :style="{
        backgroundImage: `url(${currentSlide.image})`,
        filter: 'brightness(0.6)',
      }"
    ></div>

    <!-- Overlay Content -->
    <div
      class="relative z-10 text-center max-w-3xl px-6 text-white animate__animated animate__fadeIn animate__slow"
      key="currentSlide.id"
    >
      <h1 class="text-4xl md:text-6xl font-extrabold mb-4 animate__animated animate__fadeInDown">
        {{ currentSlide.title }}
      </h1>
      <p
        class="text-lg md:text-xl mb-8 leading-relaxed animate__animated animate__fadeInUp"
      >
        {{ currentSlide.subtitle }}
      </p>

      <div class="flex justify-center gap-4 animate__animated animate__zoomIn">
        <router-link
          to="/jobs"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </router-link>
        <router-link
          to="/learn-more"
          class="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
        >
          Learn More
        </router-link>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-md transition"
    >
      <i class="fas fa-chevron-left text-2xl"></i>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-md transition"
    >
      <i class="fas fa-chevron-right text-2xl"></i>
    </button>

    <!-- Dots Indicator -->
    <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
      <span
        v-for="(slide, i) in slides"
        :key="slide.id"
        @click="currentIndex = i"
        class="w-3 h-3 rounded-full cursor-pointer transition-all"
        :class="i === currentIndex ? 'bg-white w-5' : 'bg-white/40'"
      ></span>
    </div>
  </section>
</template>
