<script setup>
  import Hero from '@/components/Hero.vue';
  import HomeCard from '@/components/HomeCard.vue';
  import Jobs from '@/components/Jobs.vue';
</script>

<template>
    <Hero />
    <HomeCard />
    <Jobs :limit="4" :showButton="true" />
</template>