<template>
  <div class="row q-col-gutter-md q-mb-lg">
    <q-card
      v-for="stat in orderStats"
      :key="stat.title"
      flat
      class="stat-card col"
      :class="stat.color"
    >
      <q-card-section>
        <div class="row items-center">
          <q-icon :name="stat.icon" size="lg" class="q-mr-md" />
          <div>
            <div class="text-h5 text-weight-bold">{{ stat.value }}</div>
            <div class="text-subtitle2">{{ stat.title }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ orders: Order[] }>();

const orderStats = computed(() => [
  {
    title: "Total Orders",
    value: props.orders.length,
    icon: "123",
    color: "bg-blue-1",
  },
  {
    title: "Processing",
    value: props.orders.filter((o) => o.status === "processing").length,
    icon: "pending",
    color: "bg-orange-1",
  },
  {
    title: "Revenue",
    value: "₱" + props.orders.reduce((sum, o) => sum + o.total, 0).toFixed(2),
    icon: "monetization_on",
    color: "bg-green-1",
  },
  {
    title: "Avg. Order",
    value:
      "₱" +
      (
        props.orders.reduce((sum, o) => sum + o.total, 0) /
        (props.orders.length || 1)
      ).toFixed(2),
    icon: "bar_chart",
    color: "bg-purple-1",
  },
]);
</script>
<style scoped>
.stat-card {
  transition: transform 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-3px);
}
</style>