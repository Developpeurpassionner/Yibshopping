import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import inscription from "../views/inscription.vue";
import Connexion from "@/views/connexion.vue";
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
     {
      path: "/connexion",
      name: "connexion",
      component: Connexion,
    },
  ],
});

export default router;

 

