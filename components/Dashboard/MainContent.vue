<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-12">
      <q-card v-if="status === 'pending'" class="popular-product-card">
        <q-card-section>
          <div class="text-h6"><q-skeleton type="text" /></div>
          <div class="text-caption text-grey"><q-skeleton type="text" /></div>
        </q-card-section>
        <q-separator />
        <q-card-section class="full-width">
          <div class="row items-center q-gutter-md full-width">
            <div class="col-auto">
              <q-skeleton type="QAvatar" size="80px" />
            </div>
            <div class="col">
              <q-skeleton type="text" class="full-width" />
              <q-skeleton type="text" class="full-width q-mt-xs" />
              <q-skeleton type="text" class="full-width q-mt-xs" />
              <q-skeleton type="QBadge" class="q-mt-xs" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card v-else class="popular-product-card">
        <q-card-section>
          <div class="text-h6">Most Popular Variants</div>
          <div class="text-caption text-grey">
            Best selling product variants
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row items-center q-col-gutter-md">
            <div
              class="col-3 row"
              v-for="variant in topVariants"
              :key="variant.id"
            >
              <q-avatar size="80px" font-size="52px" icon="local_pizza" />
              <div>
                <div class="text-h6">
                  {{ variant?.product_name }}
                </div>
                <div class="text-subtitle1">
                  Variant: {{ variant?.variant }}
                </div>
                <div class="text-subtitle2">
                  Price: &#8369;{{ useFormatCurrency(variant?.variant_price) }}
                </div>
                <q-badge color="positive">
                  Sold: {{ useFormatCurrency(variant?.quantity_sold) }} units
                </q-badge>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Sales Chart -->
    <div class="col-12 col-md-6">
      <q-card v-if="status === 'pending'" class="chart-card">
        <q-card-section>
          <div class="text-h6"><q-skeleton type="text" /></div>
          <div class="text-caption text-grey"><q-skeleton type="text" /></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-skeleton class="chart-placeholder-loader" type="rect" />
        </q-card-section>
      </q-card>
      <q-card v-else class="chart-card">
        <q-card-section>
          <div class="text-h6">Sales Overview</div>
          <div class="text-caption text-grey">Last 30 days performance</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="chart-container">
            <!-- Chart would go here - using a placeholder -->
            <div class="chart-placeholder">
              <q-icon name="bar_chart" size="xl" />

              <ChartBar
                :labels="labels"
                :data="data"
                title="Top Products by Quantity Sold"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-6">
      <q-card v-if="status === 'pending'" class="chart-card">
        <q-card-section>
          <div class="text-h6"><q-skeleton type="text" /></div>
          <div class="text-caption text-grey"><q-skeleton type="text" /></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-skeleton class="chart-placeholder-loader" type="rect" />
        </q-card-section>
      </q-card>
      <q-card v-else class="chart-card">
        <q-card-section>
          <div class="text-h6">Revenue Over Time</div>
          <div class="text-caption text-grey">Sales trends by day</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <ChartLine
            :labels="revenueLabels"
            :data="revenueData"
            title="Daily Revenue"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  status: {
    type: String,
    default: "pending",
  },
  topProducts: {
    type: Array,
    default: [],
  },
  topVariants: {
    type: Array,
    default: [],
  },
  revenueOverTime: {
    type: Array,
    default: [],
  },
});

const labels = computed(() => {
  return props.topProducts?.map((product) => product?.name);
});

const data = computed(() => {
  return props.topProducts?.map((product) => product?.quantity_sold);
});

const revenueLabels = computed(() => {
  return props.revenueOverTime?.map((revenue) => revenue?.date);
});

const revenueData = computed(() => {
  return props.revenueOverTime?.map((revenue) => revenue?.total_revenue);
});
</script>
<style scoped>
.chart-card,
.activity-card {
  border-radius: 12px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ccc;
}

.chart-placeholder-loader {
  height: 300px;
}

.activity-list {
  max-height: 300px;
  overflow-y: auto;
}

.full-width {
  width: 100%;
}
</style>
