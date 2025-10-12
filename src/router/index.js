import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import inscription from "../views/inscription.vue";
import Connexion from "@/views/connexion.vue";
import FormulaireDeConnexionAuPanneauAdmin from "@/views/FormulaireDeConnexionAuPanneauAdmin.vue";
import Dashboard from "@/views/Dashboard.vue";
import MontresFemmes from "@/views/MontresFemmes.vue";
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
       {
      path: "/Admin",
      name: "Admin",
      component: FormulaireDeConnexionAuPanneauAdmin,
    },
        {
      path: "/Dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
     {
      path: "/Montres_femmes",
      name: "Montres_femmes",
      component: MontresFemmes,
    },
  ],
});

export default router;

 

