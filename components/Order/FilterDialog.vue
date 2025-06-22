<template>
  <q-dialog v-model="props.filterDialog" persistent>
    <q-card style="width: 500px; max-width: 90vw">
      <q-card-section class="row items-center">
        <div class="text-h6">Filter Orders</div>
        <q-space />
        <q-btn
          @click="emit('close')"
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-gutter-y-md">
          <q-select
            v-model="statusFilter"
            :options="statusOptions"
            label="Status"
            outlined
          />
        </div>

        <q-input
          v-model="dateRangeText"
          label="Date Range"
          outlined
          clearable
          @clear="clearDateRange"
          readonly
          class="q-mt-md"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="dateRange"
                  range
                  mask="YYYY-MM-DD"
                  :options="validateDateRange"
                >
                  <div class="row items-center justify-end q-gutter-sm q-pa-sm">
                    <q-btn label="Cancel" flat color="primary" v-close-popup />
                    <q-btn
                      label="Apply"
                      color="primary"
                      @click="applyDateRange"
                      :disable="!isDateRangeValid"
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-if="errorMessage" v-slot:error>
            {{ errorMessage }}
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Reset" color="primary" @click="resetFilters" />
        <q-btn
          label="Apply"
          color="primary"
          v-close-popup
          @click="applyFilters"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
const props = defineProps({
  filterDialog: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "apply-filters"]);

const statusFilter = ref<string>("");
const statusOptions = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// date range

import { date } from "quasar";

const { formatDate } = date;

// Date range model (array with from/to dates)
const dateRange = ref({
  from: "",
  to: "",
});

// Text display for the input
const dateRangeText = computed(() => {
  if (!dateRange.value.from && !dateRange.value.to) return "";
  if (dateRange.value.from && dateRange.value.to) {
    return `${formatDate(dateRange.value.from, "MMM D, YYYY")} - ${formatDate(
      dateRange.value.to,
      "MMM D, YYYY"
    )}`;
  }
  return "Select date range";
});

// Validation
const errorMessage = ref("");
const isDateRangeValid = computed(() => {
  return dateRange.value.from && dateRange.value.to;
});

// Date validation rules
const validateDateRange = (d: string) => {
  const selectedDate = new Date(d);
  const today = new Date();

  return selectedDate <= today;
};

// Apply the selected range
const applyDateRange = () => {
  if (!isDateRangeValid.value) {
    errorMessage.value = "Please select a valid date range";
    return;
  }

  const fromDate = new Date(dateRange.value.from);
  const toDate = new Date(dateRange.value.to);

  // Additional validation
  if (fromDate > toDate) {
    errorMessage.value = "End date must be after start date";
    return;
  }

  // Max range validation (e.g., 1 year)
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 365) {
    errorMessage.value = "Maximum date range is 1 year";
    return;
  }

  errorMessage.value = "";
  // Emit event or save to store
  console.log("Valid date range:", dateRange.value);
};

// Clear selection
const clearDateRange = () => {
  dateRange.value = { from: "", to: "" };
  errorMessage.value = "";
};

// Watch for changes
watch(
  dateRange,
  (newVal) => {
    if (newVal.from && newVal.to) {
      applyFilters();
    }
  },
  { deep: true }
);

// apply filters

const applyFilters = () => {
  const statusMapper = {
    pending: 1,
    processing: 2,
    shipped: 3,
    delivered: 4,
    cancelled: 5,
  };
  emit("apply-filters", {
    status: statusMapper[statusFilter.value],
    from: dateRange.value.from,
    to: dateRange.value.to,
  });

  emit("close");
};

const resetFilters = () => {
  statusFilter.value = "";
  clearDateRange();
  applyFilters();
};
</script>
<style scoped></style>
