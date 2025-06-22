<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="row justify-center items-center full-height bg-grey-1" style="min-height: 100vh">
        <div class="col-12 col-md-6 col-lg-4 q-px-lg">
          <q-card class="login-card shadow-10">
            <div class="row justify-center q-pt-xl">
              <div class="text-center">
                <q-avatar size="80px" class="logo-bg">
                  <q-icon
                    name="mdi-chart-areaspline"
                    size="40px"
                    color="white"
                  />
                </q-avatar>
                <div class="text-h4 text-weight-bold q-mt-md text-primary">
                  SalesPulse
                </div>
                <div class="text-subtitle1 text-grey-7">
                  Powering your sales performance
                </div>
              </div>
            </div>

            <q-card-section class="q-pt-xl">
              <q-form @submit.prevent="handleLogin">
                <q-input
                  v-model="email"
                  label="Email"
                  outlined
                  lazy-rules
                  :rules="[(val) => !!val || 'Email is required']"
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>

                <q-input
                  v-model="password"
                  label="Password"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  lazy-rules
                  :rules="[(val) => !!val || 'Password is required']"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>

                <div class="row justify-between items-center q-mt-md">
                  <q-checkbox v-model="remember" label="Remember me" />
                  <q-btn
                    flat
                    label="Forgot password?"
                    color="primary"
                    size="sm"
                    no-caps
                    @click="showForgotPasswordDialog = true"
                  />
                </div>

                <q-btn
                  type="submit"
                  label="Login"
                  color="primary"
                  size="lg"
                  class="full-width q-mt-lg"
                  rounded
                  :loading="loading"
                >
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    Authenticating...
                  </template>
                </q-btn>

                <div class="text-center q-mt-lg">
                  <div class="text-caption text-grey-7">
                    Don't have an account?
                  </div>
                  <q-btn
                    flat
                    label="Create account"
                    color="primary"
                    size="sm"
                    no-caps
                    class="q-mt-xs"
                    @click="$router.push('/register')"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Forgot Password Dialog -->
      <q-dialog v-model="showForgotPasswordDialog">
        <q-card style="width: 400px; max-width: 90vw">
          <q-card-section class="row items-center">
            <div class="text-h6">Reset Password</div>
            <q-space />
            <q-btn icon="mdi-close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="forgotPasswordEmail"
              label="Email"
              outlined
              class="q-mb-md"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              label="Send Reset Link"
              color="primary"
              @click="handleForgotPassword"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "guest",
});
const router = useRouter();
const email = ref("");
const password = ref("");
const remember = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const showForgotPasswordDialog = ref(false);
const forgotPasswordEmail = ref("");
const authStore = useAuthStore();

const handleLogin = () => {
  authStore.login({ email: email.value, password: password.value });

  if (authStore.loggedIn) {
    router.push("/dashboard");
  }
};

const handleForgotPassword = () => {
  // Add your forgot password logic here
  showForgotPasswordDialog.value = false;
};
</script>

<style scoped>
.login-card {
  border-radius: 16px;
  max-width: 450px;
  margin: 0 auto;
}

.logo-bg {
  background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%);
}

.full-height {
  height: 100vh;
}

/* Animation for the login card */
.q-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.q-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
