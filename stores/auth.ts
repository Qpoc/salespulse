import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | Record<string, any>,
    token: null as null | string,
    loggedIn: false,
    loading: false,
  }),

  actions: {
    async login(credentials: { email: string; password: string }) {
      this.loading = true;
      try {
        const response = await $fetch("/v1/auth/login", {
          method: "POST",
          body: credentials,
          baseURL: useRuntimeConfig().public.apiBaseUrl,
        });

        this.token = response.access_token;
        this.user = response.user;
        this.loggedIn = true;
        navigateTo("/dashboard");
      } catch (err) {
        console.error("Login failed", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      try {
        const user = await $fetch("/v1/auth/me", {
          baseURL: useRuntimeConfig().public.apiBaseUrl,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.user = user;
        this.loggedIn = true;
      } catch (err) {
        this.user = null;
        this.loggedIn = false;
      }
    },

    async logout() {
      await $fetch("/v1/auth/logout", {
        method: "POST",
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.user = null;
      this.loggedIn = false;
      navigateTo("/login");
    },
  },
  persist: true,
});
