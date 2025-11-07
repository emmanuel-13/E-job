<script setup>
    import { Bar } from 'vue-chartjs';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
    } from 'chart.js';
    import { computed, defineProps } from 'vue';

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    const props = defineProps({
        labels: { type: Array, default: () => []},
        data: { type: Array, default: () => []},
        label: { type: String, default: "Data" },
        color: { type: String, default: "#10B981" }
    });

    const chartData = computed(() => ({
        labels: props.labels,
        datasets: [
            {
                label: props.label,
                backgroundColor: props.color,
                data: props.data,
            },
        ],
    }));

    const chartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


</script>


<template>
    <div class="h-80">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>