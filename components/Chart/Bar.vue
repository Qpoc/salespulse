<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  data: Array,
  labels: Array,
  title: { type: String, default: "Sales Chart" },
});

// Optional: random colors
const backgroundColors = props.labels.map((_, i) => `hsl(${i * 50}, 70%, 60%)`);

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: props.title,
      backgroundColor: backgroundColors,
      borderRadius: 4,
      data: props.data,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: props.title,
    },
  },
};
</script>
