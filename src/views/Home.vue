<template>
  <div class="mt-20 overflow-x-hidden">
    <NavBar />
    <Carrousel />
  </div><br><br>
  <ButtonNavigationMontre :categories="categories" :couleurs="couleurs" @filtrer="filtrerMontresParcategorie" />
  <br>
  <div class="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div v-for="MontreHomme in montresFiltrees" :key="MontreHomme.id"
      class="bg-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition duration-300">
      <!-- Image cliquable -->
      <img :src="MontreHomme.photo.startsWith('/storage')
        ? 'http://localhost:8000' + MontreHomme.photo
        : MontreHomme.photo" alt="Image de la montre"
        class="w-40 h-40 object-cover rounded-md mb-4 cursor-pointer hover:scale-105 transition duration-300"
        @click="openModal(MontreHomme)" />
      <p class="text-lg font-semibold text-gray-800 mb-1">{{ MontreHomme.nom }}</p>
      <p class="text-lg text-gray-600 mb-2">Prix : <span class="font-bold text-blue-600">{{ MontreHomme.prix }}
          Fcfa</span>
      </p>

      <button class="mt-auto bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 transition"
        @click="openModal2(MontreHomme)">
        Commander
      </button>
      <!-- Modal -->
      <div v-if="imageZoom" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
           bg-gray-100 p-4 rounded-xl  z-50">
        <div class="relative">
          <!-- Bouton fermer -->
          <button @click="closeModal" class="absolute top-2 right-2 text-black text-xl font-bold cursor-pointer">
            ✕
          </button>
          <!-- Image agrandie -->
          <div class="w-[400px] h-[400px] flex items-center justify-center">
            <img :src="imageZoom" alt="Montre agrandie" class="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  </div><br><br>
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
import axios from 'axios'
import DetailMontrePlusFormulaire from "@/components/DetailMontrePlusFormulaire.vue";
import { ref, onMounted } from "vue";
const MontresHommes = ref([]);
const montresFiltrees = ref([]);
const imageZoom = ref(null); // <- état pour l’image agrandie
const couleurs = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']
const categories = ['Rolex', 'Hugo', 'Carter', 'Digital', 'Sport', 'Autres']
const selectmontre = ref(null);
const confirmationMessage = ref(null)
const showConfirmationModal = ref(false)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/montreshommes');
    MontresHommes.value = response.data;
    montresFiltrees.value = response.data;

  } catch (error) {
    console.error("Erreur lors de la récupération des montres pour hommes :", error);
  }
});

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
    ? "http://localhost:8000" + MontreHomme.photo
    : MontreHomme.photo;
}

// Fermer le modal
function closeModal() {
  imageZoom.value = null;
}
// Ouvrir le modal detail montre plus formulaire
function openModal2(MontreHomme) {
  selectmontre.value = MontreHomme
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