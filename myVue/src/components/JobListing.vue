<script setup>
    import { defineProps, ref, computed } from 'vue';
    import { RouterLink } from 'vue-router';
    
    const props = defineProps({
        jobs: {
            type: Object
        }
    });

    const showFullDesc = ref(false)

    const toggleButton = () => {
        showFullDesc.value = !showFullDesc.value;
    }

    const shortDescription = computed(() => {
        if (!showFullDesc.value) {
            return props.jobs.description.slice(0, 100) + '...';
        }
        return props.jobs.description;
    });
</script>

<template>
    <div class="bg-white shadow-md rounded-xl p-6 max-w-sm m-auto relative">
        <div class="p-4">
            <div class="mb-6">
                <div class="text-gray-600">{{ jobs.type }}</div>
                <h3 class="text-gray-900 mb-6">{{ jobs.title }}</h3>
            </div>

            <div class="mb-6">
                <div>
                    {{ shortDescription }}
                </div>
                <button @click="toggleButton" class="text-green-500 hover:text-green-600">
                    {{ showFullDesc ? 'Show Less' : 'Read More' }}
                </button>
            </div>

            <h3 class="text-green-500 mb-2"> {{ jobs.salary }} / Year </h3>
            
            <div class="border border-gray-100 mb-4"></div>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                   <i class="pi pi-map-marker text-orange-700"></i> {{ jobs.company.name }}
                </div>

                <RouterLink :to="`/jobs/${jobs.id}`" class="h-[36px] text-white px-4 py-2 rounded-lg text-center text-sm bg-green-500 hover:bg-green-600">
                    Read More
                </RouterLink>
            </div>

            <!-- <div class="text-gray-600">Location: {{ jobs.country.location }}</div> -->
        </div>
    </div>
</template>
