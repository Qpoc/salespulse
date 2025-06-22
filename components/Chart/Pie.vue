<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  labels: Array,
  data: Array,
  title: { type: String, default: "Sales Distribution" },
});

// Optional: random colors
const backgroundColors = props.labels.map((_, i) => `hsl(${i * 50}, 70%, 60%)`);

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: props.title,
      backgroundColor: backgroundColors,
      data: props.data,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: {
      display: true,
      text: props.title,
    },
  },
};
</script>
