<template>
  <div class="row q-col-gutter-md q-mt-md">
    <!-- Recent Orders -->
    <div class="col-12 col-md-12">
      <q-card v-if="status === 'pending'">
        <q-card-section>
          <div class="text-h6"><q-skeleton type="text" /></div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left" style="width: 150px">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
                <th class="text-right">
                  <q-skeleton animation="blink" type="text" />
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="n in 5" :key="n">
                <td class="text-left">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="50px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="35px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="65px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="25px" />
                </td>
                <td class="text-right">
                  <q-skeleton animation="blink" type="text" width="85px" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
      <q-card v-else>
        <q-card-section>
          <div class="text-h6">Recent Orders</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-table
            :rows="recentOrders"
            :columns="orderColumns"
            row-key="id"
            flat
            bordered
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
  recentOrders: {
    type: Array,
    default: [],
  },
});

const orderColumns = [
  { name: "customer", label: "Customer", field: "customer", align: "left" },
  { name: "date", label: "Date", field: "date" },
  { name: "total_price", label: "Amount", field: "total_price" },
  { name: "status", label: "Status", field: "status" },
];
</script>

<style scoped>
.q-table {
  width: 100%;
}

.q-item {
  transition: background-color 0.3s;
}

.q-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
