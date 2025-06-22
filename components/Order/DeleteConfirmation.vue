<template>
  <q-dialog v-model="props.deleteDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Delete Order</div>
      </q-card-section>

      <q-card-section>
        Are you sure you want to delete this order?
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn label="Delete" color="negative" @click="emit('delete')" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ deleteDialog: boolean }>();
const emit = defineEmits<{ delete: () => void }>();
</script>
