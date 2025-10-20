<template>
  <div class="mt-20 overflow-x-hidden">
    <NavBar />
    <Carrousel />
  </div><br><br>
  <ButtonNavigationMontre
  :categories="categories"
  :couleurs="couleurs"
  @filtrer="filtrerMontresParcategorie"
/>
<br>
  <div class="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div v-for="MontreHomme in montresFiltrees" :key="MontreHomme.id"
      class="bg-gray-300 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition duration-300">

      <img :src="MontreHomme.photo.startsWith('/storage')
        ? 'http://localhost:8000' + MontreHomme.photo
        : MontreHomme.photo" alt="Image de la montre"
        class="w-40 h-40 object-cover rounded-md mb-4 cursor-pointer hover:scale-105 transition duration-300" @click="imageZoom = MontreHomme.photo.startsWith('/storage')
          ? 'http://localhost:8000' + MontreHomme.photo
          : MontreHomme.photo" />

      <p class="text-lg font-semibold text-gray-800 mb-1">{{ MontreHomme.nom }}</p>
      <p class="text-lg text-gray-600 mb-2">Prix : <span class="font-bold text-blue-600">{{ MontreHomme.prix }} Fcfa</span>
      </p>

      <button class="mt-auto bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 transition">
        Voir détails
      </button>
    </div>
  </div>
</template>

<script setup>
import Carrousel from "../components/Carrousel.vue";
import NavBar from "../components/NavBar.vue";
import ButtonNavigationMontre from "@/components/ButtonNavigationMontre.vue";
import axios from 'axios'
import { ref, onMounted} from "vue";
const MontresHommes = ref([]);
const montresFiltrees = ref([]);
const couleurs = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']
const categories = ['Rolex', 'Hugo', 'Carter', 'Digital', 'Sport', 'Autres']
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
</script>