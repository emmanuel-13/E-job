<script setup>
import { reactive, onMounted } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";
import Chart from "./BarChart.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const state = reactive({
  jobTitle: [],
  jobSalary: [],
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const res = await axios.get("/api/jobs");
    state.jobs = res.data.jobs;
    state.jobTitle = state.jobs.map(job => job.title);
    state.jobSalary = state.jobs.map(j => {
      const salaryMatch = String(j.salary).match(/\$([\d,]+)/);
      return salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, '')) : 0;
    });
  } catch (error) {
    console.error("Error processing the data");
    toast.error("Error loading chart data");
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="text-center text-2xl mb-6">Chart of Salary ($) by Jobs</div>

  <div v-if="state.isLoading" class="flex justify-center items-center my-10">
    <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
  </div>

  <div v-else>
    <Chart :labels="state.jobTitle" :data="state.jobSalary" label="Salary ($)" />
  </div>
</template>
