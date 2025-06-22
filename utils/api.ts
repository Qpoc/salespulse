export const useApi = () => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const controller = ref<AbortController>();

  const baseFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      Accept: "application/json",
      ...(authStore.token
        ? {
            Authorization: `Bearer ${authStore.token}`,
          }
        : {}),
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await authStore.logout();
        navigateTo("/login");
      }
    },
  });

  return {
    get: <T>(url: string, params?: Record<string, any>) =>
      baseFetch<T>(url, { method: "GET", params }),

    post: <T>(url: string, body?: Record<string, any>) =>
      baseFetch<T>(url, { method: "POST", body }),

    put: <T>(url: string, body?: Record<string, any>) =>
      baseFetch<T>(url, { method: "PUT", body }),

    delete: <T>(url: string) => baseFetch<T>(url, { method: "DELETE" }),

    patch: <T>(url: string, body?: Record<string, any>) =>
      baseFetch<T>(url, { method: "PATCH", body }),
  };
};
