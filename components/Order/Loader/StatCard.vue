<template>
  <div class="row q-col-gutter-md q-mb-lg">
    <q-card v-for="index in 4" :key="index" flat class="stat-card col">
      <q-card-section>
        <div class="row items-center">
          <q-skeleton animation="blink" type="QAvatar" />
          <div>
            <div class="text-h5 text-weight-bold">
              <q-skeleton animation="blink" type="rect" style="width: 100px;" />
            </div>
            <div class="text-subtitle2">
              <q-skeleton animation="blink" type="rect" style="width: 100px;" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
.stat-card {
  transition: transform 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-3px);
}
</style>
