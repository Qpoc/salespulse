<template>
  <q-drawer v-model="props.drawer" show-if-above :breakpoint="400">
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <q-item
          to="/dashboard"
          clickable
          v-ripple
          :active="route.name === 'dashboard'"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <q-separator />

        <q-item
          to="/orders"
          clickable
          v-ripple
          :active="route.name === 'orders'"
        >
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>

          <q-item-section> Orders </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">{{ authStore.user?.name }}</div>
        <div>{{ authStore.user?.email }}</div>

        <q-btn
          class="absolute-bottom-right q-mr-md q-mb-md"
          label="Logout"
          color="primary"
          icon="logout"
          size="sm"
          no-caps
          @click="authStore.logout()"
        />
      </div>
    </q-img>
  </q-drawer>
</template>
<script setup lang="ts">
const props = defineProps({
  drawer: {
    type: Boolean,
    default: true,
  },
});

const authStore = useAuthStore();

const route = useRoute();
</script>
