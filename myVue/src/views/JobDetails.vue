<template>
  <section class="bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BackButton />

      <!-- show loading spinner if data is being fetched -->
      <div v-if="state.isLoading" class="flex justify-center items-center my-10">
        <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
      </div>

      <!-- error state -->
      <div v-else-if="state.error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      <!-- main content -->
      <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-8">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ state.job_single.title }}</h1>
              <div class="flex items-center gap-4 text-gray-600 mb-4">
                <span class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ state.job_single.type }}
                </span>

                <span v-if="state.job.company && state.job_single.company.location" class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {{ state.job_single.company.location }}
                </span>
              </div>
            </div>

            <div class="text-right">
              <p class="text-2xl font-semibold text-green-600">{{ state.job_single.salary }}</p>
            </div>
          </div>

          <!-- Company Info -->
          <div class="mt-6 p-6 bg-gray-50 rounded-lg">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-500">Company Name</p>
                <p class="mt-1 text-gray-900">{{ state.job_single.company.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Industry</p>
                <p class="mt-1 text-gray-900">{{ state.job_single.company.industry }}</p>
              </div>
              <div class="col-span-1 md:col-span-2">
                <p class="text-sm font-medium text-gray-500">Website</p>
                <a
                  v-if="state.job_single.company.website"
                  :href="state.job_single.company.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-1 text-blue-600 hover:text-blue-800 inline-block"
                >
                  {{ state.job_single.company.website }}
                </a>
                <p v-else class="mt-1 text-gray-700">—</p>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div class="mt-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ state.job_single.description }}
            </p>
          </div>

          <!-- Apply Button -->
          <div class="mt-8">
            <button
              class="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply for this position
            </button>
          </div>

          <div class="mt-8 flex justify-end gap-4">
            <!-- Edit and Delete use the same modal -->
            <button
              @click="jobStore.openModal('edit')"
              class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Job
            </button>

            <button
              @click="jobStore.openModal('delete')"
              class="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Job
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Unified Modal (Edit & Delete) -->
    <div
      v-if="state.showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate__animated animate__fadeIn"
    >
      <div
        v-if="state.modalType === 'edit'"
        class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full animate__animated animate__slideInRight"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-gray-800">Edit Job</h3>
          <button @click="jobStore.closeModal" aria-label="Close" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form @submit.prevent="handleUpdate" class="space-y-4 text-left">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input
                v-model="state.job_single.title"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <input
                v-model="state.job_single.type"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                v-model="state.job_single.salary"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                v-model="state.job_single.company.location"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              v-model="state.job_single.company.name"
              type="text"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <input
                v-model="state.job_single.company.industry"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                v-model="state.job_single.company.website"
                type="url"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="state.job_single.description"
              rows="4"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              @click="jobStore.closeModal"
              class="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              :disabled="state.updating"
              type="submit"
              class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              <span v-if="!updating">Save Changes</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Delete Confirmation -->
      <div
        v-else-if="state.modalType === 'delete'"
        class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate__animated animate__fadeInUp"
      >
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{{ state.job_single.title }}</strong>?
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="handleDelete"
            class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            @click="jobStore.closeModal"
            class="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useJobStore  } from "@/store/jobs";
import axios  from "axios";
import { useRoute } from "vue-router";

const jobStore = useJobStore();

const { state } = storeToRefs(jobStore);

const route = useRoute();
const jobId = route.params.id;

// fetch job details
onMounted(async () => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      // assume API returns job object directly or under data.job
      // try common shapes
      const data = response.data && (response.data.job || response.data);
      // merge into state.job to preserve reactivity & shape
      jobStore.state.job_single = {
      id: data.id ?? jobStore.state.job_single.id,
      title: data.title ?? "",
      salary: data.salary ?? "",
      description: data.description ?? "",
      type: data.type ?? "",
      company: {
          name: data.company?.name ?? (data.company_name ?? ""),
          industry: data.company?.industry ?? (data.company_industry ?? ""),
          website: data.company?.website ?? (data.company_website ?? ""),
          location: data.company?.location ?? (data.location ?? "")
      }
      };
  } catch (err) {
      console.error("Error fetching job details:", err);
      jobStore.state.error = "Error loading job details. Please try again later.";
  } finally {
      jobStore.state.isLoading = false;
  }
});


async function handleUpdate() {
    state.updating = true;
    try {
        // prepare payload - adapt to your API contract
        const payload = {
        title: jobStore.state.job_single.title,
        salary: jobStore.state.job_single.salary,
        description: jobStore.state.job_single.description,
        type: jobStore.state.job_single.type,
        company: {
            name: jobStore.state.job_single.company.name,
            industry: jobStore.state.job_single.company.industry,
            website: jobStore.state.job_single.company.website,
            location: jobStore.state.job_single.company.location
        }
        };

        await axios.put(`/api/jobs/${jobId}`, payload);
        toaster.success("Job updated successfully");
        jobStore.closeModal();
    } catch (err) {
        console.error("Error updating job:", err);
        toaster.error("Failed to update job. Please try again.");
    } finally {
        jobStore.state.updating = false;
    }
    }

    // delete handlers
    async function handleDelete() {
    try {
        await axios.delete(`/api/jobs/${jobId}`);
        toaster.success("Job successfully deleted");
        jobStore.closeModal();
        router.push("/jobs");
    } catch (err) {
        console.error("Error deleting job:", err);
        toaster.error("Failed to delete job. Please try again.");
    }
    }
</script>

<style scoped>
/* small shadow tweak kept from your previous style */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* optional: prevent background scroll while modal is open (works in many cases) */
body.modal-open {
  overflow: hidden;
}
</style>
