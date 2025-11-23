<template>
  <div class="mt-20 overflow-x-hidden">
    <NavBar />
    <Carrousel />
  </div><br><br>
  <ButtonNavigationMontre :categories="categories" :couleurs="couleurs" @filtrer="filtrerMontresParcategorie" />
  <br>
  <div v-if="montresFiltrees.length === 0" class="h-[300px]"></div>
  <Transition name="fade-slide">
    <div v-if="montresFiltrees.length > 0" class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      <div v-for="MontreHomme in montresFiltrees" :key="MontreHomme.id"
        class="bg-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition duration-300">
        <!-- Image cliquable -->
        <img :src="MontreHomme.photo.startsWith('/storage')
            ? BACKEND_URL + MontreHomme.photo
          : MontreHomme.photo" alt="Image de la montre"
          class="w-40 h-40 lg:w-40 lg:h-40 md:w-50 md:h-50 object-cover rounded-md mb-4 cursor-pointer hover:scale-105 transition duration-300"
          @click="openModal(MontreHomme)" />
        <p class="text-2xl lg:text-lg md:text-4xl font-semibold text-gray-800 mb-1">{{ MontreHomme.nom }}</p>
        <p class="text-2xl lg:text-lg md:text-4xl text-gray-600 mb-2">Prix : <span class="font-bold text-blue-600">{{
          MontreHomme.prix }}
            Fcfa</span>
        </p>
        <button
          class="mt-auto text-xl lg:text-base md:text-3xl bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 transition"
          @click="openModal2(MontreHomme)">
          Commander
        </button>
        <!-- Modal -->
        <div v-if="imageZoom" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
           bg-gray-100 p-4 rounded-xl  z-50">
          <div class="relative">
            <!-- Bouton fermer -->
            <button @click="closeModal" class="absolute top-2 right-2 text-black text-2xl md:text-4xl lg:text-xl font-bold cursor-pointer">
              ✕
            </button>
            <!-- Image agrandie -->
            <div class="w-[330px] h-[330px] md:w-[500px] md:h-[500px] lg:w-[400px] lg:h-[400px] flex items-center justify-center">
              <img :src="imageZoom" alt="Montre agrandie" class="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition><br><br>
  <DetailMontrePlusFormulaire v-if="selectmontre" :montre="selectmontre" :onClose="closeModal2" :genre="'homme'"
    @confirm="afficherConfirmation" />
  <Transition name="fade-slide">
    <div v-if="showConfirmationModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 class="text-2xl font-bold text-green-700 mb-4">✅ Commande confirmée</h2>
        <p class="text-gray-700 whitespace-pre-line">{{ confirmationMessage }}</p>
        <button @click="showConfirmationModal = false"
          class="mt-6 px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition">
          Fermer
        </button>
      </div>
    </div>
  </Transition>
  <Footer />
</template>

<script setup>
import Carrousel from "../components/Carrousel.vue";
import NavBar from "../components/NavBar.vue";
import ButtonNavigationMontre from "@/components/ButtonNavigationMontre.vue";
import Footer from "@/components/Footer.vue";
import DetailMontrePlusFormulaire from "@/components/DetailMontrePlusFormulaire.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth';
import { useMontreStore } from '@/stores/montre'
const montreStore = useMontreStore()
const auth = useAuthStore()
const router = useRouter()
const MontresHommes = computed(() => montreStore.hommes)
const montresFiltrees = ref(MontresHommes.value);
const imageZoom = ref(null); // <- état pour l’image agrandie
const couleurs = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']
const categories = ['Rolex', 'Hugo', 'Carter', 'Digital', 'Sport', 'Autres']
const selectmontre = ref(null);
const confirmationMessage = ref(null)
const showConfirmationModal = ref(false)
const API_URL = import.meta.env.VITE_API_URL; // ✅ variable d'environnement
const BACKEND_URL = API_URL.replace("/api", ""); // enlève /api pour obtenir l'URL de base du backend
onMounted(async () => {
  auth.checkAuth()

  if (!montreStore.isLoaded) {
    await montreStore.chargerMontres()
  }

  montresFiltrees.value = montreStore.hommes
})

function filtrerMontresParcategorie(categorie) {
  if (categorie === 'Tous') {
    montresFiltrees.value = MontresHommes.value;
  } else {
    montresFiltrees.value = MontresHommes.value.filter(MontreHomme => MontreHomme.categorie === categorie);
  }
}
// Ouvrir le modal
function openModal(MontreHomme) {
  imageZoom.value = MontreHomme.photo.startsWith("/storage")
     ? BACKEND_URL + MontreHomme.photo
    : MontreHomme.photo;
}

// Fermer le modal
function closeModal() {
  imageZoom.value = null;
}

// Ouvrir le modal detail montre plus formulaire si l'utilisateur est authentifié si non rediriger vers la page de connexion
function openModal2(MontreHomme) {
  if (auth.isAuthenticated) {
    selectmontre.value = MontreHomme
  } else {
    router.push('/connexion')
  }
}
// Fermer le modal detail montre plus formulaire
function closeModal2() {
  selectmontre.value = null
}
function afficherConfirmation(message) {
  confirmationMessage.value = message
  selectmontre.value = null // ferme la modale du formulaire
  showConfirmationModal.value = true
}

</script>

<style scoped>
.fade-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>