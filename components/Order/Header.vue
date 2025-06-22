<template>
  <div class="row items-center q-mb-md">
    <div class="text-h4 text-weight-bold q-mb-lg">Orders</div>
    <q-space />
    <q-input
      v-model="searchQuery"
      outlined
      dense
      placeholder="Search orders..."
      class="q-mr-md"
      style="width: 300px"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-btn
      color="primary"
      icon="filter_list"
      label="Filters"
      @click="emit('filterDialog')"
      class="q-mr-sm"
    />
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['filterDialog', 'search'])

const searchQuery = ref("");

const searching = ref(false);

watch(searchQuery, () => {
    if (searching.value) {
      clearTimeout(searching.value);
    }
    searching.value = setTimeout(() => {
      emit('search', searchQuery.value);
    }, 500);
})
</script>

