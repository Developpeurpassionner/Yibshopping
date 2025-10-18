<template>
  <div class="mt-10 px-4">
    <!-- Boutons filtrants -->
    <div class="relative">
      <!-- Flèche gauche -->
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full md:hidden">
        ◀
      </button>

      <!-- Liste des boutons -->
      <div class="flex justify-center overflow-hidden">
        <div class="flex transition-transform duration-300 gap-x-4"
             :style="{ transform: `translateX(-${currentIndex * buttonWidth}px)` }">
          <button
            v-for="(categorie, index) in categories"
            :key="index"
            @click="filtrerMontres(categorie)"
            :class="[
              'px-4 py-2 m-2 rounded text-white font-semibold text-lg cursor-pointer hover:opacity-60',
              couleurs[index % couleurs.length],
              'min-w-[120px] text-center shrink-0'
            ]"
          >
            {{ categorie }}
          </button>
        </div>
      </div>

      <!-- Flèche droite -->
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full md:hidden">
        ▶
      </button>
    </div>

    <!-- Montres filtrées -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      <div v-for="montre in montresFiltrees" :key="montre.id"
           class="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <img :src="montre.photo.startsWith('/storage') ? 'http://localhost:8000' + montre.photo : montre.photo"
             class="w-32 h-32 object-cover rounded mb-2" />
        <p class="font-bold">{{ montre.nom }}</p>
        <p class="text-blue-600">{{ montre.prix }} €</p>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ['Rolex', 'Hugo Boss', 'Carter', 'Digital', 'Sport', 'Autres']
const couleurs = ['bg-red-400', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500']

const MontresHommes = ref([])
const montresFiltrees = ref([])
const currentIndex = ref(0)
const buttonWidth = 140 // largeur approximative d’un bouton


</script>
