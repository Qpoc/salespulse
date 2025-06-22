<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Register Chart.js modules
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
)

// Props
const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Line Chart'
  }
})

// Chart.js Data & Options
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title,
      data: props.data,
      fill: false,
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F6',
      tension: 0.4,
      pointRadius: 5
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: props.title,
      font: { size: 16 }
    }
  },
  scales: {
    x: {
      ticks: { color: '#666' }
    },
    y: {
      ticks: { color: '#666' },
      beginAtZero: true
    }
  }
}
</script>

<style scoped>
div {
  height: 300px;
}
</style>
