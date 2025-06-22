export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (!auth.loggedIn && to.path !== "/" && to.path !== "/register") {
    return navigateTo("/");
  }

  if (to.path === "/" && auth.loggedIn) {
    return navigateTo("/dashboard");
  }
});
