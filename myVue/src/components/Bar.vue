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

    // Map titles & extract salary values
    state.jobTitle = state.jobs.map((job) => job.title);
    state.jobSalary = state.jobs.map((j) => {
      const salaryMatch = String(j.salary).match(/\$([\d,]+)/);
      return salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, "")) : 0;
    });
  } catch (error) {
    console.error("Error processing the data:", error);
    toast.error("Error loading chart data");
  } finally {
    state.isLoading = false;
  }
});
</script>

<!-- <template>
  <section class="bg-gray-50 py-12 min-h-screen flex flex-col justify-center">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-green-600 mb-2">
        Salary Chart by Job Title
      </h2>
      <p class="text-gray-600">A visualization of salaries for each position</p>
    </div>

    <div v-if="state.isLoading" class="flex justify-center items-center my-10">
      <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
    </div>

    <div v-else class="flex justify-center items-center">
      <Chart
        :labels="state.jobTitle"
        :data="state.jobSalary"
        label="Salary ($)"
      />
    </div>
  </section>
</template> -->


<template>
  <section class="bg-gray-50 py-12 min-h-screen flex flex-col justify-center">
    <div class="text-center mb-8 animate__animated animate__fadeInDown">
      <h2 class="text-3xl font-bold text-green-600 mb-2">
        Salary Chart by Job Title
      </h2>
      <p class="text-gray-600">A visualization of salaries for each position</p>
    </div>

    <div
      v-if="state.isLoading"
      class="flex justify-center items-center my-10 animate__animated animate__pulse animate__infinite"
    >
      <PulseLoader :loading="state.isLoading" color="#34D399" size="15px" />
    </div>

    <div
      v-else
      class="flex justify-center items-center animate__animated animate__fadeInUp"
    >
      <Chart
        :labels="state.jobTitle"
        :data="state.jobSalary"
        label="Salary ($)"
      />
    </div>
  </section>
</template>
