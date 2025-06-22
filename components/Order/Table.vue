<template>
  <q-card flat bordered class="orders-table">
    <q-table
      flat
      bordered
      :rows="orders"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      binary-state-sort
      @request="onRequest"
    >
      <!-- Custom header -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-weight-bold"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width>Actions</q-th>
        </q-tr>
      </template>

      <!-- Custom body cells -->
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="$router.push(`/orders/${props.row.id}`)"
          class="cursor-pointer"
        >
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="col.name === 'status'">
              <q-badge :color="getStatusColor(props.row.status)">
                {{ props.row.status }}
              </q-badge>
            </template>
            <template v-else-if="col.name === 'customer'">
              <div class="row items-center">
                <q-avatar size="sm" class="q-mr-sm">
                  <img
                    :src="
                      props.row.customer?.avatar ||
                      'https://cdn.quasar.dev/img/avatar.png'
                    "
                  />
                </q-avatar>
                <div>
                  <div class="text-weight-bold">
                    {{ props.row.customer?.name }}
                  </div>
                  <div class="text-caption">
                    {{ props.row.customer?.email }}
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="col.name === 'total'">
              &#8369;{{ props.row.total.toFixed(2) }}
            </template>
            <template v-else-if="col.name === 'created_at'">
              {{ formatDate(props.row.created_at) }}
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
          <q-td auto-width>
            <q-btn flat round icon="more_vert" @click.stop>
              <q-menu auto-close>
                <q-list style="min-width: 150px">
                  <q-item
                    clickable
                    @click="$router.push(`/orders/${props.row.id}`)"
                  >
                    <q-item-section avatar>
                      <q-icon name="visibility" />
                    </q-item-section>
                    <q-item-section>View</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                    clickable
                    @click="emit('confirm-delete', props.row.id)"
                  >
                    <q-item-section avatar>
                      <q-icon name="delete" color="negative" />
                    </q-item-section>
                    <q-item-section class="text-negative"
                      >Delete</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>

      <!-- Empty State -->
      <template v-slot:no-data>
        <div class="full-width row flex-center q-gutter-sm q-pa-lg">
          <q-icon name="mdi-package-variant-closed" size="sm" />
          <span>No orders found</span>
          <q-btn
            v-if="searchQuery"
            flat
            label="Clear search"
            @click="searchQuery = ''"
          />
        </div>
      </template>
    </q-table>
  </q-card>
</template>
<script setup lang="ts">
interface Order {
  id: string;
  status: string;
  created_at: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  items: Array<{
    product: {
      name: string;
    };
    quantity: number;
  }>;
  total: number;
}

const props = defineProps<{
  orders: Order[];
  page: number;
  perPage: number;
  rowsNumber: number;
}>();

const emit = defineEmits<{
  (e: "confirm-delete", id: string): void;
  (e: "request", pagination: any): void;
}>();

const loading = ref(false);

// Table configuration
const columns = [
  {
    name: "id",
    required: true,
    label: "Order ID",
    align: "left",
    field: "id",
    sortable: false,
  },
  {
    name: "customer",
    label: "Customer",
    align: "left",
    field: "customer",
    sortable: false,
  },
  {
    name: "items",
    label: "Items",
    align: "center",
    field: (row) => row.items?.length,
    sortable: false,
  },
  {
    name: "status",
    label: "Status",
    align: "center",
    field: "status",
    sortable: false,
  },
  {
    name: "total",
    label: "Total",
    align: "right",
    field: "total",
    sortable: false,
  },
  {
    name: "created_at",
    label: "Date",
    align: "right",
    field: "created_at",
    sortable: false,
  },
];

const pagination = ref({
  page: props.page,
  rowsPerPage: props.perPage,
  rowsNumber: props.rowsNumber,
});

watch(
  () => props.page,
  (newPage) => {
    if (!isNaN(newPage)) {
      pagination.value.page = newPage;
      pagination.value.rowsPerPage = props.perPage;
      pagination.value.rowsNumber = props.rowsNumber;
    }
  }
);

// Table pagination/sorting
const onRequest = async (props: any) => {
  emit("request", props.pagination);
};

// Filtered orders
// Filters
const searchQuery = ref("");
const statusFilter = ref<string[]>([]);
const dateRange = ref<any>(null);
const customerFilter = ref<any[]>([]);
const customerOptions = ref<any[]>([]);
const statusOptions = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pending: "orange",
    processing: "blue",
    shipped: "teal",
    delivered: "green",
    cancelled: "red",
  };
  return statusColors[status?.toLowerCase()] || "grey";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>
<style scoped>
.orders-table {
  border-radius: 8px;
  overflow: hidden;
}

.q-table {
  height: calc(100vh - 300px);
}
</style>
