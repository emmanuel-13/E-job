<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import BackButton from '@/components/BackButton.vue'

// Initialize router and toast
const router = useRouter()
const toast = useToast()

// Form state
const form = reactive({
  title: '',
  type: '',
  description: '',
  salary: '',
  company: {
    name: '',
    website: '',
    industry: '',
    location: '',
    country: ''
  }
})

// Loading and submission state
const isSubmitting = ref(false)

// Submit handler
const toggleSubmit = async () => {
  if (!form.title || !form.type || !form.description || !form.company.name) {
    toast.warning('Please fill in all required fields')
    return
  }

  isSubmitting.value = true

  try {
    const response = await axios.post('/api/jobs', form)
    toast.success('Job successfully submitted')
    router.push(`/jobs/${response.data.job?.id || ''}`)
  } catch (error) {
    console.error('Failed to submit job', error)
    toast.error('Failed to submit job. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BackButton />

  <form
    class="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
    @submit.prevent="toggleSubmit"
  >
    <h2 class="text-2xl font-bold mb-4 text-gray-800">
      Add New Job
    </h2>

    <!-- Job Title -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Job Title</label>
      <input
        type="text"
        v-model="form.title"
        placeholder="Enter job title"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Job Type -->
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

    <!-- Description -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Description</label>
      <textarea
        v-model="form.description"
        rows="4"
        placeholder="Write a short job description..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      ></textarea>
    </div>

    <!-- Salary -->
    <div>
      <label class="block text-gray-700 font-medium mb-2">Salary</label>
      <input
        type="text"
        v-model="form.salary"
        placeholder="e.g. ₦200,000 / month"
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Company Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-gray-700 font-medium mb-2">Company Name</label>
        <input
          type="text"
          v-model="form.company.name"
          placeholder="e.g. Tech Solutions Ltd."
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-2">Company Website</label>
        <input
          type="url"
          v-model="form.company.website"
          placeholder="https://example.com"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-2">Industry</label>
        <input
          type="text"
          v-model="form.company.industry"
          placeholder="e.g. Software Development"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-2">Location</label>
        <input
          type="text"
          v-model="form.company.location"
          placeholder="e.g. Lagos"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-gray-700 font-medium mb-2">Country</label>
        <input
          type="text"
          v-model="form.company.country"
          placeholder="e.g. Nigeria"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>

    <!-- Submit Button -->
    <div class="pt-4">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {{ isSubmitting ? 'Submitting...' : 'Add Job' }}
      </button>
    </div>
  </form>
</template>
