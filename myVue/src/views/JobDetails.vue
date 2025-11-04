<script setup>
    import PulseLoader from "vue-spinner/src/PulseLoader.vue";
    import { reactive, onMounted } from 'vue';
    import { useRoute, useRouter } from "vue-router";
    import axios from "axios";
    import BackButton from '@/components/BackButton.vue';
    import { RouterLink } from 'vue-router';
    import { useToast } from "vue-toastification";

    const route = useRoute();
    const router = useRouter();
    const toaster = useToast();

    const jobId = route.params.id;
    const state = reactive({
        job: {},
        isLoading: true,
        error: null
    });

    const deleteJob = async () => {
        const confirm = window.confirm("Are you sure you want to delete this job?");
        if(confirm) {
            try {
                await axios.delete(`/api/jobs/${jobId}`);
                toaster.success("Job successfully deleted");
                router.push('/jobs');
            } catch (error) {
                console.error("Error deleting job:", error);
                toaster.error("Failed to delete job. Please try again.");
            }
        }
    };

    onMounted(async () => {
        try {
            // First get all jobs
            const response = await axios.get('/api/jobs');
            // Find the specific job
            // Compare as strings to support backends that return string IDs (e.g. "074f")
            const job = response.data.find(job => String(job.id) === String(jobId));
            if (!job) {
                state.error = `Job with ID ${jobId} not found`;
                return;
            }
            state.job = job;
        } catch (error) {
            console.error("Error fetching job listings:", error);
            state.error = "Error loading job details. Please try again later.";
        } finally {
            state.isLoading = false;
        }
    })
</script>

<template>
    <section v-if="!state.isLoading && !state.error" class="bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BackButton />
            <!-- Job Header -->
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="p-8">
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ state.job.title }}</h1>
                            <div class="flex items-center gap-4 text-gray-600 mb-4">
                                <span class="flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {{ state.job.type }}
                                </span>
                                <span class="flex items-center">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {{ state.job.company.location }}
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-semibold text-green-600">{{ state.job.salary }}</p>
                        </div>
                    </div>

                    <!-- Company Info -->
                    <div class="mt-6 p-6 bg-gray-50 rounded-lg">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm font-medium text-gray-500">Company Name</p>
                                <p class="mt-1 text-gray-900">{{ state.job.company.name }}</p>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-500">Industry</p>
                                <p class="mt-1 text-gray-900">{{ state.job.company.industry }}</p>
                            </div>
                            <div class="col-span-2">
                                <p class="text-sm font-medium text-gray-500">Website</p>
                                <a :href="state.job.company.website" target="_blank" class="mt-1 text-blue-600 hover:text-blue-800">
                                    {{ state.job.company.website }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Job Description -->
                    <div class="mt-8">
                        <h2 class="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                        <p class="text-gray-700 leading-relaxed">
                            {{ state.job.description }}
                        </p>
                    </div>

                    <!-- Apply Button -->
                    <div class="mt-8">
                        <button class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Apply for this position
                        </button>
                    </div>

                    <div class="mt-8 flex justify-end gap-4">
                        <RouterLink :to="`/jobs/${state.job.id}/edit`" class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Edit Job
                        </RouterLink>

                        <button @click="deleteJob" class="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
                            Delete Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div v-else-if="state.isLoading">
        <div class="flex justify-center items-center my-10">
            <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
        </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-red-50 border-l-4 border-red-400 p-4 my-10">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-red-700">
                        {{ state.error }}
                    </p>
                    <div class="mt-4">
                        <button @click="router.push('/jobs')" class="text-sm font-medium text-red-700 hover:text-red-600">
                            ← Back to all jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>