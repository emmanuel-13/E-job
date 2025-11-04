<script setup>
    import joblisting from '@/Joblisting.vue';
    import { reactive, defineProps, onMounted, inject } from 'vue';
    import { RouterLink } from 'vue-router';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import axios from "axios";

    // using ref
    // const job = ref([]);

    const state = reactive({
        job: [],
        isLoading: true
    })

    defineProps({
        limit: Number,
        showButton: {
            type: Boolean,
            default: false
        }

    });

    onMounted(async () => {
        try {
            const response = await axios.get("/api/jobs");
            // job.value = response.data;  // using ref
            state.job = response.data;  // using reactive
        } catch (error) {
            console.error("Error fetching job listings:", error);
        } finally {
            state.isLoading = false;
        }
    })
</script>

<template>
    <section class="bg-blue-50 px-4 py-20">
        <div class="container-xl lg:container m-auto">
            <h1 class="text-3xl font-bold text-center mb-6 text-green-500">
                Browse Job Listings
            </h1>
        </div>

        <!-- show loading spinner if data is being fetched -->
        <div v-if="state.isLoading" class="flex justify-center items-center my-10">
            <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
        </div>

            
        <div v-else>
        <h3 class="text-center py-4 px-3 text-2xl"> Found {{ state.job.slice(0, limit).length }} job{{ state.job.length !== 1 ? 's' : '' }} available </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            <joblisting v-for="jobs in state.job.slice(0, limit || state.job.length)" 
                :key="jobs.id" 
                :jobs="jobs" 
            />
        </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-3 px-6">
        <RouterLink to="/jobs" class="block text-white text-center px-6 py-4 bg-green-500 rounded-xl hover:bg-gray-500">
            View All Jobs
        </RouterLink>
    </section>
    
</template>