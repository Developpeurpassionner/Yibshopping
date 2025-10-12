<template>
  <div class="mt-20">
    <NavBar />
    <Carrousel />
  </div>
  <div v-for="MontreHomme in MontresHommes">
    <p>{{ MontreHomme.nom }}</p>
    <p>{{ MontreHomme.prix }}</p>
    <img :src="MontreHomme.photo.startsWith('/storage') ?
      'http://localhost:8000' + MontreHomme.photo : MontreHomme.photo"
      class="w-35 h-35 lg:w-20 lg:h-20 md:w-50 md:h-50 object-cover rounded cursor-pointer hover:scale-105 transition"
      @click="imageZoom = MontreHomme.photo.startsWith('/storage') ? 'http://localhost:8000'
        + MontreHomme.photo : MontreHomme.photo" />
  </div>
</template>

<script setup>
import Carrousel from "../components/Carrousel.vue";
import NavBar from "../components/NavBar.vue";
import axios from 'axios'
import { ref, onMounted } from "vue";
const MontresHommes = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/montreshommes');
    MontresHommes.value = response.data;

  } catch (error) {
    console.error("Erreur lors de la récupération des montres pour hommes :", error);
  }
});
</script>