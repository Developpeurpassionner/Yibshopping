import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import inscription from "../views/inscription.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/inscription",
      name: "inscription",
      component: inscription,
    },
  ],
});

export default router;
