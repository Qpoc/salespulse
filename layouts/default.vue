<template>
  <div>
    <q-layout style="min-height: 100vh" class="shadow-2 rounded-borders">
      <CommonHeader />

      <q-page-container>
        <q-page class="q-pa-md">
          <slot />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup lang="ts">

</script>
