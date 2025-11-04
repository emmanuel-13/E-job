<script setup>
    import { onMounted, reactive } from 'vue';
    import axios from 'axios';
    import { useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    const router = useRouter();
    const route = useRoute();

    const jobId = route.params.id;

    const state = reactive({
        job: {},
        isLoading: true,
    });

    const form = reactive({
        title: "",
        type: '',
        description: '',
        salary: '',
        company: {
            name: '',
            website: '',
            industry: '',
            location: ''
        }
    });

    const toast = useToast();

  const toggleSubmit = async () => {
        // Handle form submission logic here
        const JobData = {
            title: form.title,
            type: form.type,
            description: form.description,
            salary: form.salary,
            company: {
                name: form.company.name,
                website: form.company.website,
                industry: form.company.industry,
                location: form.company.location
            }
        }
        
        try {
          // Post to the same server the app uses for listings
          const response = await axios.put(`/api/jobs/${jobId}`, JobData);
          // navigate to the newly created job details using returned id
          toast.success("Job successfully submitted");
          
          router.push(`/jobs/${response.data.id}`);
        } catch(error) {
          console.error("failed to submit job", error)
          toast.error("Failed to submit job. Please try again.");
        }
    }

    onMounted(async () => {
        try {
            // Fetch existing job details to pre-fill the form
            const response = await axios.get(`/api/jobs/${jobId}`);
            state.job = response.data;
            form.title = state.job.title;
            form.type = state.job.type;
            form.description = state.job.description;
            form.salary = state.job.salary;
            form.company.name = state.job.company.name;
            form.company.website = state.job.company.website;
            form.company.industry = state.job.company.industry;
            form.company.location = state.job.company.location;
        } catch (error) {
            console.error("Error fetching job details:", error);
            toast.error("Failed to load job details. Please try again.");
        } finally {
            state.isLoading = false;
        }
    });
</script>

<template>
  <form class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 my-10" @submit.prevent="toggleSubmit">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Edit Job</h2>
    <!-- Job Title -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Job Title</label>
      <input type="text" v-model="form.title" name="title" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
    </div>
    <!-- Job Type -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Job Type</label>
      <select name="type" v-model="form.type" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
        <option value="">Select type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>
    </div>
    <!-- Description -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Description</label>
      <textarea v-model="form.description" name="description" rows="4" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
    </div>
    <!-- Salary -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Salary</label>
      <input type="text" v-model="form.salary" name="salary" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
    </div>
    <!-- Company Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 font-medium mb-2">Company Name</label>
        <input type="text" v-model="form.company.name" name="companyName" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-2">Company Website</label>
        <input type="url" v-model="form.company.website" name="companyWebsite" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-2">Industry</label>
        <input type="text" v-model="form.company.industry" name="companyIndustry" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-2">Location</label>
        <input type="text" v-model="form.company.location" name="companyLocation" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
    </div>
    <!-- Submit Button -->
    <div class="pt-4">
      <button type="submit" class="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors">
        Edit Job
      </button>
    </div>
  </form>
</template>