<script setup>
import { reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import BackButton from '@/components/BackButton.vue'

const router = useRouter()
const route = useRoute()
const jobId = route.params.id
const toast = useToast()

const state = reactive({
  job: {},
  isLoading: true
})

const form = reactive({
  title: '',
  type: '',
  description: '',
  salary: '',
  company: {
    name: '',
    website: '',
    industry: '',
    location: ''
  }
})

const toggleSubmit = async () => {
  try {
    const response = await axios.post('/api/jobs', form)
    toast.success('Job successfully submitted')
    // form.clear();
    router.push(`/jobs/${response.data.job.id}`)
  } catch (error) {
    console.error('Failed to submit job', error)
    toast.error('Failed to submit job. Please try again.')
  }
}

const toggleUpdate = async () => {
  try {
    const response = await axios.put(`/api/jobs/${jobId}`, form)
    toast.success('Job successfully updated')
    router.push(`/jobs/${response.data.job.id}`)
  } catch (error) {
    console.error('Failed to update job', error)
    toast.error('Failed to update job. Please try again.')
  }
}

if (jobId) {
  onMounted(async () => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`)
      state.job = response.data
      Object.assign(form, state.job)
      form.company = { ...state.job.company }
    } catch (error) {
      console.error('Error fetching job details:', error)
      toast.error('Failed to load job details.')
    } finally {
      state.isLoading = false
    }
  })
}

</script>

<template>

  <BackButton />
  <form
    class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
    @submit.prevent="() => jobId ? toggleUpdate() : toggleSubmit()"
  >
    <h2 class="text-2xl font-bold mb-4 text-gray-800">
      {{ jobId ? 'Edit Job' : 'Add New Job' }}
    </h2>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Job Title</label>
      <input
        type="text"
        v-model="form.title"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Job Type</label>
      <select
        v-model="form.type"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Description</label>
      <textarea
        v-model="form.description"
        rows="4"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      ></textarea>
    </div>

    <div>
      <label class="block text-gray-700 font-medium mb-2">Salary</label>
      <input
        type="text"
        v-model="form.salary"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 font-medium mb-2">Company Name</label>
        <input
          type="text"
          v-model="form.company.name"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-2">Company Website</label>
        <input
          type="url"
          v-model="form.company.website"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-2">Industry</label>
        <input
          type="text"
          v-model="form.company.industry"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-medium mb-2">Location</label>
        <input
          type="text"
          v-model="form.company.location"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>

    <div class="pt-4">
      <button
        type="submit"
        class="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors"
      >
        {{ jobId ? 'Update Job' : 'Add Job' }}
      </button>
    </div>
  </form>
</template>