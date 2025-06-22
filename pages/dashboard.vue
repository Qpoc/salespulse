<template>
  <div class="dashboard">
    <!-- Stats Cards Row -->
    <DashboardStatCard
      :status="analyticsStatus"
      :total-sales="analytics?.summary?.total_sales"
      :total-revenue="analytics?.summary?.total_revenue"
      :average-sale-value="analytics?.summary?.average_sale_value"
      :top-category="analytics?.summary?.top_category"
    />

    <!-- Main Content Area -->
    <DashboardMainContent
      :status="analyticsStatus"
      :top-products="analytics?.topProducts"
      :top-variants="analytics?.topVariants"
      :revenue-over-time="analytics?.revenueOverTime"
    />

    <!-- Bottom Row -->
    <DashboardFooter
      :status="analyticsStatus"
      :recent-orders="analytics?.recentOrders?.data"
    />
  </div>
</template>

<script setup lang="ts">
const salesRepo = useSalesRepository();
const ordersRepo = useOrdersRepository();

const {
  data: analytics,
  status: analyticsStatus,
  error: analyticsError,
} = useAsyncData(
  "dashboard-analytics",
  async () => {
    const [summary, topProducts, topVariants, recentOrders, revenueOverTime] =
      await Promise.allSettled([
        salesRepo.getSummary(),
        salesRepo.getTopProducts(5),
        salesRepo.getTopVariants(4),
        ordersRepo.getRecentOrders(10),
        salesRepo.getRevenueOverTime(10),
      ]);

    const unwrap = (result: any) =>
      result.status === "fulfilled" ? result.value : null;

    return {
      summary: unwrap(summary),
      topProducts: unwrap(topProducts),
      topVariants: unwrap(topVariants),
      recentOrders: unwrap(recentOrders),
      revenueOverTime: unwrap(revenueOverTime),
    };
  },
  { lazy: true }
);
</script>
