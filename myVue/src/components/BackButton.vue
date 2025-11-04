<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()
const jobId = route.params.id;

defineProps({
    height: {
        type: Number,
        default: 0
    }
});


const goBack = () => {
    if (!jobId) {
        router.push("/jobs/");
    }
    router.go(-1); // This will go back to the previous page in history
};
</script>

<template>
    <div class="container py-6 px-0 mt-13"> <!-- Added mt-20 for navbar height -->
        <button @click="goBack" class="inline-flex items-center bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-300 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
        </button>
    </div>
</template>