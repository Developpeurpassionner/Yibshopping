import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import inscription from "../views/inscription.vue";
import Connexion from "@/views/connexion.vue";
import FormulaireDeConnexionAuPanneauAdmin from "@/views/FormulaireDeConnexionAuPanneauAdmin.vue";
import MontresFemmes from "@/views/MontresFemmes.vue";
import Connexionotp from "@/views/connexionotp.vue";
import DashboardMontres from "@/views/DashboardMontres.vue";
import DashboardCommandes from "@/views/DashboardCommandes.vue";
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
      path: "/Dashboard/Montres",
      name: "Dashboard_montres",
      component: DashboardMontres,
    },
     {
      path: "/Montres_femmes",
      name: "Montres_femmes",
      component: MontresFemmes,
    },
    {
      path: "/connexionOTP",
      name: "connexionOTP",
      component: Connexionotp
    },
       {
      path: "/Dashboard/commandes",
      name: "Dashboard_commandes",
      component: DashboardCommandes,
    },
  ],
});

export default router;

 

