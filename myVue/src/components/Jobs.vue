<script setup>
import joblisting from './JobListing.vue';
import { reactive, defineProps, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from "axios";

const state = reactive({
  job: [],
  isLoading: true,
  searchQuery: '',
  searchFilter: 'all'
});

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
});

// ✅ Computed: Filter jobs by type and search query
const filteredJobs = computed(() => {
  let jobs = state.job;

  if (state.searchFilter !== 'all') {
    jobs = jobs.filter(job => job.type.toLowerCase() === state.searchFilter);
  }

  if (state.searchQuery) {
    jobs = jobs.filter(job =>
      job.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }

  return jobs;
});

onMounted(async () => {
  try {
    const response = await axios.get("/api/jobs");
    state.job = response.data.jobs;
  } catch (error) {
    console.error("Error fetching job listings:", error);
  } finally {
    state.isLoading = false;
  }
});

// ✅ Update filter when a button is clicked
function setFilter(type) {
  state.searchFilter = type;
}
</script>

<template>
  <section class="bg-blue-50 px-4 py-20">
    <div class="container-xl lg:container m-auto">
      <h1 class="text-3xl font-bold text-center text-green-500">
        Browse Job Listings
      </h1>
    </div>

    <!-- show loading spinner if data is being fetched -->
    <div v-if="state.isLoading" class="flex justify-center items-center my-10">
      <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
    </div>

    <div v-else>
      <h3 class="text-center py-6 px-3 text-2xl">
        Found {{ filteredJobs.slice(0, limit).length }} job{{ filteredJobs.length !== 1 ? 's' : '' }} available
      </h3>

      <div class="container-xl lg:container mx-auto mb-8 px-4">
        <!-- Search Bar -->
        <div class="flex flex-col sm:flex-row gap-4 items-center">
          <input
            v-model="state.searchQuery"
            type="text"
            placeholder="Search jobs..."
            class="w-full sm:flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center sm:justify-end gap-3 mt-6">
          <button
            v-for="type in ['all', 'full-time', 'part-time', 'contract', 'internship']"
            :key="type"
            @click="setFilter(type)"
            :class="[
              'px-4 py-2 rounded-lg transition font-medium',
              state.searchFilter === type
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ type === 'all' ? 'All' : type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
          </button>
        </div>
      </div>

      <!-- Job Listings -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-3" v-if="filteredJobs.length > 0">
        <joblisting
            v-for="jobs in filteredJobs.slice(0, limit || filteredJobs.length)"
            :key="jobs.id"
            :jobs="jobs"
            class="animate__animated animate__fadeInUp animate__faster"
        />
      </div>

      <div v-else class="text-center text-gray-600 py-10">
        <p class="text-xl font-semibold">No jobs found.</p>
        <p class="text-sm mt-2">
            Try adjusting your search or selecting a different job type.
        </p>
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-3 px-6">
    <RouterLink
      to="/jobs"
      class="block text-white text-center px-6 py-4 bg-green-500 rounded-xl hover:bg-gray-500"
    >
      View All Jobs
    </RouterLink>
  </section>
</template>
