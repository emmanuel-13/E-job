<script setup>
import { Bar } from "vue-chartjs";
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  labels: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  label: { type: String, default: "Data" },
  color: { type: String, default: "#10B981" },
});

// ✅ Dynamic data (reactive)
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.label,
      backgroundColor: props.color,
      borderRadius: 10,
      borderSkipped: false,
      data: props.data,
    },
  ],
}));

// ✅ Chart Options (animation, styling, responsive)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1500,
    easing: "easeOutBounce",
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#374151",
        font: { size: 14, weight: "bold" },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: { color: "#374151" },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#374151" },
      grid: { color: "#E5E7EB" },
    },
  },
};
</script>

<template>
  <!-- ✅ Center and size chart properly -->
  <div class="flex justify-center items-center w-full  h-[200px] md:h-[400px]">
    <div class="w-[90%] md:w-[50%] h-full">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
