<template>
  <q-page class="q-pa-lg">
    <!-- Page Header -->
    <OrderHeader @search="searchOrders" @filter-dialog="filterDialog = true" />

    <!-- Stats Cards -->
    <OrderLoaderStatCard v-if="getAllOrdersStatus === 'Pending'" />
    <OrderStatCard v-else :orders="allOrders" />

    <!-- Orders Table -->
    <OrderLoaderTable v-if="getPaginateOrdersStatus === 'Pending'" />
    <OrderTable
      v-else
      :orders="paginateOrders"
      :page="page"
      :per-page="perPage"
      :rowsNumber="rowsNumber"
      @confirm-delete="confirmDelete"
      @request="onPageRequest"
    />

    <!-- Filter Dialog -->
    <OrderFilterDialog
      :filter-dialog="filterDialog"
      @close="filterDialog = false"
      @apply-filters="applyFilters"
    />

    <!-- Delete Confirmation -->
    <OrderDeleteConfirmation
      :delete-dialog="deleteDialog"
      @delete="deleteOrder"
    />
  </q-page>
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

const ordersRepository = useOrdersRepository();
const paginateOrders = ref<Order[]>([]);
const getPaginateOrdersStatus = ref<string>("Pending");

const page = ref(1);
const perPage = ref(10);
const rowsNumber = ref(0);

const getPaginateOrders = async (
  pageNumber = 1,
  perPageNumber = 10,
  search = ""
) => {
  const { status, data: customerOrders } = await useAsyncData(
    `getOrders-${pageNumber}`,
    () =>
      ordersRepository.getOrders({
        page: pageNumber,
        per_page: perPageNumber,
        search: search,
      }),
    {
      transform: (orders) => {
        return {
          data: orders.data.map((order) => ({
            id: order.id,
            status: order.status,
            created_at: order.date,
            customer: order.customer,
            items: order.items,
            total: order.total_price,
          })),
          links: orders.links,
          meta: orders.meta,
        };
      },
    }
  );

  getPaginateOrdersStatus.value = status;
  paginateOrders.value = customerOrders.value.data ?? [];
  page.value = parseInt(customerOrders?.value?.meta?.current_page);
  perPage.value = parseInt(customerOrders?.value?.meta?.per_page);
  rowsNumber.value = parseInt(customerOrders?.value?.meta?.last_page);
};

getPaginateOrders();

const allOrders = ref<Order[]>([]);
const getAllOrdersStatus = ref("Pending");

const getAllOrders = async () => {
  const { status, data: customerOrders } = await useAsyncData(
    `getOrders`,
    () =>
      ordersRepository.getOrders({
        month: "this month",
      }),
    {
      transform: (orders) =>
        orders.data.map((order) => ({
          id: order.id,
          status: order.status,
          created_at: order.date,
          customer: order.customer,
          items: order.items,
          total: order.total_price,
        })),
    }
  );

  getAllOrdersStatus.value = status;
  allOrders.value = customerOrders.value ?? [];
  page.value = parseInt(customerOrders.value.meta?.current_page) ?? 1;
  perPage.value = parseInt(customerOrders.value.meta?.per_page) ?? 10;
  rowsNumber.value = parseInt(customerOrders.value.meta?.last_page) ?? 0;
};

getAllOrders();

const filterDialog = ref(false);
const deleteDialog = ref(false);
const orderToDelete = ref("");

const searchText = ref("");
const searchOrders = async (searchQuery: string) => {
  searchText.value = searchQuery;
  onPageRequest({
    page: page.value,
    rowsPerPage: perPage.value,
    rowsNumber: rowsNumber.value,
  });
};

const statusFilter = ref("");
const fromFilter = ref("");
const toFilter = ref("");
const applyFilters = async ({
  status,
  from,
  to,
}: {
  status: number;
  from: string;
  to: string;
}) => {
  statusFilter.value = status;
  fromFilter.value = from;
  toFilter.value = to;
  onPageRequest({
    page: page.value,
    rowsPerPage: perPage.value,
    rowsNumber: rowsNumber.value,
  });
};

const onPageRequest = async (pagination: any) => {
  const data = await ordersRepository.getOrders({
    page: pagination.page,
    per_page: pagination.rowsPerPage,
    search: searchText.value,
    status: statusFilter.value,
    start_date: fromFilter.value,
    end_date: toFilter.value,
  });

  paginateOrders.value = data.data.map((order) => ({
    id: order.id,
    status: order.status,
    created_at: order.date,
    customer: order.customer,
    items: order.items,
    total: order.total_price,
  }));

  page.value = parseInt(data.meta?.current_page) ?? 1;
  perPage.value = parseInt(data.meta?.per_page) ?? 10;
  rowsNumber.value = parseInt(data.meta?.last_page) ?? 0;
};

// Order actions
const confirmDelete = (orderId: string) => {
  orderToDelete.value = orderId;
  deleteDialog.value = true;
};

const deleteOrder = () => {
  paginateOrders.value = paginateOrders.value.filter(
    (o) => o.id !== orderToDelete.value
  );
  deleteDialog.value = false;
};
</script>

<style scoped></style>
