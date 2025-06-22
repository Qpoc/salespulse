<template>
  <q-page class="q-pa-lg">
    <!-- Order Header -->
    <div class="row items-center q-mb-lg">
      <q-btn
        flat
        round
        icon="mdi-arrow-left"
        @click="$router.back()"
        class="q-mr-md"
      />
      <div>
        <div class="text-h4 text-weight-bold">Order #{{ order.id }}</div>
        <div class="text-subtitle1 text-grey-7">
          {{ order.date }} •
          <q-badge :color="getStatusColor(order.status)" class="q-ml-sm">
            {{ order.status }}
          </q-badge>
        </div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="row q-col-gutter-lg">
      <!-- Left Column - Order Details -->
      <div class="col-12 col-md-8">
        <!-- Order Items -->
        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-2">
            <div class="text-h6">Items Ordered</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list bordered separator>
              <q-item
                v-for="item in order.items"
                :key="item.id"
                class="q-pa-md"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img
                      :src="
                        item.product.image ||
                        'https://cdn.quasar.dev/img/avatar.png'
                      "
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">{{
                    item.product.name
                  }}</q-item-label>
                  <q-item-label caption>
                    {{ item.variant.label }} • Qty: {{ item.quantity }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <div class="text-h6">&#8369;{{ item.price }}</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Order Timeline -->
        <q-card>
          <q-card-section class="bg-grey-2">
            <div class="text-h6">Order Timeline</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="event in order.timeline"
                :key="event.timestamp"
                :title="event.status"
                :subtitle="formatDateTime(event.timestamp)"
                :icon="getTimelineIcon(event.status)"
              >
                <div>{{ event.description }}</div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right Column - Summary -->
      <div class="col-12 col-md-4">
        <!-- Order Summary -->
        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-2">
            <div class="text-h6">Order Summary</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-list dense>
              <q-item>
                <q-item-section>Subtotal</q-item-section>
                <q-item-section side
                  >&#8369;{{ order.total_price?.toFixed(2) }}</q-item-section
                >
              </q-item>
              <q-separator class="q-my-sm" />
              <q-item class="text-h6">
                <q-item-section>Total</q-item-section>
                <q-item-section side
                  >&#8369;{{ order.total_price?.toFixed(2) }}</q-item-section
                >
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Customer Info -->
        <q-card class="q-mb-lg">
          <q-card-section class="bg-grey-2">
            <div class="text-h6">Customer</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row items-center q-mb-md">
              <q-avatar size="lg" class="q-mr-sm">
                <img
                  :src="
                    order.customer.avatar ||
                    'https://cdn.quasar.dev/img/avatar.png'
                  "
                />
              </q-avatar>
              <div>
                <div class="text-weight-bold">{{ order.customer?.name }}</div>
                <div class="text-caption">{{ order.customer?.email }}</div>
              </div>
            </div>
            <q-list dense>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="phone" />
                </q-item-section>
                <q-item-section>{{
                  order.customer?.phone || "Not provided"
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- Order Actions -->
        <q-card v-if="order.status.toLowerCase() != 'cancelled'">
          <q-card-section class="bg-grey-2">
            <div class="text-h6">Order Actions</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="q-gutter-y-sm">
              <q-btn
                v-if="order?.status.toLowerCase() === 'pending'"
                color="positive"
                label="Approve Order"
                class="full-width"
                @click="approveOrder(order.id)"
              />

              <q-btn
                v-if="order?.status.toLowerCase() === 'processing'"
                color="primary"
                label="Mark as Shipped"
                class="full-width"
                @click="shipOrder(order.id)"
              />
              <q-btn
                color="negative"
                outline
                label="Cancel Order"
                class="full-width"
                @click="confirmCancel(order.id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Cancel Order Dialog -->
    <q-dialog v-model="cancelDialog">
      <q-card style="width: 500px; max-width: 90vw">
        <q-card-section>
          <div class="text-h6">Cancel Order</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="cancelReason"
            label="Reason for cancellation"
            outlined
            type="textarea"
            autogrow
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Confirm" color="negative" @click="cancelOrder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
interface Order {
  id: string;
  status: string;
  created_at: string;
  items: Array<{
    id: string;
    product: {
      id: string;
      name: string;
      image?: string;
    };
    variant: {
      id: string;
      label: string;
    };
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  timeline: Array<{
    status: string;
    timestamp: string;
    description: string;
  }>;
}

// Order data
const order = ref<Order>({});

const cancelDialog = ref(false);
const cancelReason = ref("");
const orderToCancel = ref("");

const orderRepository = useOrdersRepository();

const showOrder = async (id: string) => {
  const { data } = await useAsyncData(`showOrder-${id}`, () =>
    orderRepository.showOrder(id)
  );

  order.value = data.value.data;
};

await showOrder(useRoute().params.id);

// Helper functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    Pending: "orange",
    Processing: "blue",
    Shipped: "teal",
    Delivered: "positive",
    Cancelled: "negative",
  };
  return statusColors[status] || "grey";
};

const getTimelineIcon = (status: string) => {
  const statusIcons: Record<string, string> = {
    Pending: "access_time",
    Processing: "account_balance_wallet",
    Shipped: "airport_shuttle",
    Delivered: "check",
    Cancelled: "close",
  };
  return statusIcons[status] || "information";
};

// Order actions
const confirmCancel = (orderId: string) => {
  orderToCancel.value = orderId;
  cancelDialog.value = true;
};

const cancelOrder = async () => {
  console.log(
    "Cancelling order",
    orderToCancel.value,
    "with reason:",
    cancelReason.value
  );
  cancelDialog.value = false;
  cancelReason.value = "";

  order.value.status = "Cancelled";
  order.value.timeline.push({
    status: "Cancelled",
    timestamp: new Date().toISOString(),
    description: `Order cancelled: ${cancelReason.value}`,
  });
};

const approveOrder = async (orderId: string) => {
  order.value.status = "Processing";
  order.value.timeline.push({
    status: "Processing",
    timestamp: new Date().toISOString(),
    description: "Order approved and is being processed",
  });
};

const shipOrder = async (orderId: string) => {
  order.value.status = "Shipped";
  order.value.timeline.push({
    status: "Shipped",
    timestamp: new Date().toISOString(),
    description: "Order has been shipped to customer",
  });
};
</script>

<style scoped>
.order-card {
  transition: transform 0.3s ease;
}
.order-card:hover {
  transform: translateY(-2px);
}
</style>
