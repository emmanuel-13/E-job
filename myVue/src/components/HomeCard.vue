<script setup>
    import Card from './Card.vue';
    import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Card>
                <h2 class="text-2xl font-bold">For Developers</h2>
                <p class="mt-2 mb-4">
                    Explore thousands of job opportunities from top companies looking for talented developers like you.
                </p>
                <RouterLink to="/jobs" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-grey-700">
                    Browse Jobs
                </RouterLink>
            </Card>

            <Card bg="bg-green-200">
                <h2 class="text-2xl font-bold">For Emloyers </h2>
                <p class="mt-2 mb-4">
                    Find the perfect candidates for your job openings with our comprehensive employer tools.
                </p>
                <RouterLink to="/jobs/add" class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-grey-700">
                    Add Jobs
                </RouterLink>
            </Card>
            </div>
        </div>
    </section>
</template>