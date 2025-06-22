<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>SalesPulse</q-toolbar-title>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
    </q-toolbar>
  </q-header>
  <CommonNavigationDrawer :drawer="drawer" />
</template>

<script setup lang="ts">
const drawer = ref(true);
</script>
