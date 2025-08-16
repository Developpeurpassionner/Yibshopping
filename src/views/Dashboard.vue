<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col gap-y-8 lg:gap-y-8 md:gap-y-16">

    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 lg:text-3xl md:text-5xl">Tableau de bord</h1>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="flex flex-col gap-y-4 lg:gap-y-4 md:gap-y-8">
        <div class="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h2 class="text-xl font-semibold text-blue-800 lg:text-xl md:text-4xl">Montres Hommes</h2>
          <p class="text-4xl font-bold text-blue-900 lg:text-4xl md:text-6xl">{{ stats.hommes }}</p>
        </div>
        <div class="flex justify-center">
          <button class="cursor-pointer bg-blue-600 text-white text-xl lg:text-xl md:text-4xl px-4 py-1 rounded hover:bg-blue-500 transition">
            Ajouter
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-y-4 lg:gap-y-4 md:gap-y-8">
        <div class="bg-pink-100 p-6 rounded-lg shadow text-center">
          <h2 class="text-xl font-semibold text-pink-800 lg:text-xl md:text-4xl">Montres Femmes</h2>
          <p class="text-4xl font-bold text-pink-900 lg:text-4xl md:text-6xl">{{ stats.femmes }}</p>
        </div>
        <div class="flex justify-center">
          <button class="cursor-pointer bg-red-600 text-white text-xl lg:text-xl md:text-4xl px-4 py-1 rounded hover:bg-red-400 transition">
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Historique -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 class="font-bold text-center text-2xl lg:text-2xl md:text-4xl mb-4 text-gray-950">Historique des actions</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="p-2 text-lg lg:text-base md:text-3xl">Nom</th>
            <th class="p-2 text-lg lg:text-base md:text-3xl">Catégorie</th>
            <th type="text" class="p-2 text-lg lg:text-base md:text-3xl">Description</th>
            <th type="date" class="p-2 text-lg lg:text-base md:text-3xl">Date</th>
            <th class="p-2 text-lg lg:text-base md:text-3xl">Heure</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in historique" :key="log.id" class="border-b">
            <td class="p-2">{{ log.action }}</td>
            <td class="p-2">{{ log.categorie }}</td>
            <td class="p-2">{{ log.nom }}</td>
            <td class="p-2">{{ formatDate(log.timestamp) }}</td>
            <td class="p-2">{{ formatTime(log.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stats = ref({ hommes: 0, femmes: 0 })
const historique = ref([])

const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString()
const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString()

onMounted(async () => {
  const resStats = await axios.get('http://localhost:8000/api/montres/stats')
  stats.value = resStats.data

  const resHistorique = await axios.get('http://localhost:8000/api/montres/historique')
  historique.value = resHistorique.data
})
</script>
