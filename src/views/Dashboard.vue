<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Tableau de bord</h1>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-blue-100 p-6 rounded-lg shadow text-center">
        <h2 class="text-xl font-semibold text-blue-800">Montres Hommes</h2>
        <p class="text-4xl font-bold text-blue-900">{{ stats.hommes }}</p>
      </div>
      <div class="bg-pink-100 p-6 rounded-lg shadow text-center">
        <h2 class="text-xl font-semibold text-pink-800">Montres Femmes</h2>
        <p class="text-4xl font-bold text-pink-900">{{ stats.femmes }}</p>
      </div>
    </div>

    <!-- Historique -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-700">Historique des actions</h2>
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="p-2">Action</th>
            <th class="p-2">Catégorie</th>
            <th class="p-2">Nom</th>
            <th class="p-2">Date</th>
            <th class="p-2">Heure</th>
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
