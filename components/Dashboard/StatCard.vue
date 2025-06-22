<template>
  <div v-if="status === 'pending'" class="row q-col-gutter-md q-mb-md">
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-primary">
        <q-card-section>
          <div class="text-h6 text-white">
            <q-skeleton type="text" />
          </div>
          <div class="text-h4 text-white q-mt-sm">
            <q-skeleton type="text" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-secondary">
        <q-card-section>
          <div class="text-h6 text-white">
            <q-skeleton type="text" />
          </div>
          <div class="text-h4 text-white q-mt-sm">
            <q-skeleton type="text" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-accent">
        <q-card-section>
          <div class="text-h6 text-white">
            <q-skeleton type="text" />
          </div>
          <div class="text-h4 text-white q-mt-sm">
            <q-skeleton type="text" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-positive">
        <q-card-section>
          <div class="text-h6 text-white">
            <q-skeleton type="text" />
          </div>
          <div class="text-h4 text-white q-mt-sm">
            <q-skeleton type="text" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-else class="row q-col-gutter-md q-mb-md">
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-primary">
        <q-card-section>
          <div class="text-h6 text-white">Total Sales</div>
          <div class="text-h4 text-white q-mt-sm">
            {{ useFormatCurrency(totalSales) }}
          </div>
          <q-icon name="sell" size="lg" class="stat-icon" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-secondary">
        <q-card-section>
          <div class="text-h6 text-white">Total Revenue</div>
          <div class="text-h4 text-white q-mt-sm">
            &#8369;{{ useFormatCurrency(totalRevenue) }}
          </div>
          <q-icon name="wallet" size="lg" class="stat-icon" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-accent">
        <q-card-section>
          <div class="text-h6 text-white">Average Sale Value</div>
          <div class="text-h4 text-white q-mt-sm">
            &#8369;{{ useFormatCurrency(averageSaleValue) }}
          </div>
          <q-icon name="price_change" size="lg" class="stat-icon" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-3">
      <q-card class="stat-card bg-positive">
        <q-card-section>
          <div class="text-h6 text-white">Top Category</div>
          <div class="text-h4 text-white q-mt-sm">
            {{ topCategory }}
          </div>
          <q-icon name="category" size="lg" class="stat-icon" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  totalSales: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  averageSaleValue: {
    type: Number,
    default: 0,
  },
  topCategory: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "pending",
  },
});
</script>

<style scoped>
.stat-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  opacity: 0.2;
  transform: scale(3);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stat-card {
    margin-bottom: 16px;
  }
}
</style>
