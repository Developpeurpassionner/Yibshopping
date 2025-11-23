<template>
    <div class="p-6">
        <h2 class="text-2xl font-bold mb-4 lg:text-2xl md:text-4xl">Utilisateurs inscrits</h2>

        <input v-model="search" @input="debouncedSearch" placeholder="Rechercher par nom ou prénom"
            class="mb-4 p-2 border rounded w-full text-lg lg:text-lg md:text-3xl" />

        <table class="min-w-full border bg-white rounded shadow">
            <thead>
                <tr class="bg-blue-600 text-white text-left">
                    <th class="py-2 px-4 text-lg lg:text-lg md:text-2xl">Nom</th>
                    <th class="py-2 px-4 text-lg lg:text-lg md:text-2xl">Prénom</th>
                    <th class="py-2 px-4 text-lg lg:text-lg md:text-2xl">Email</th>
                    <th class="py-2 px-4 text-lg lg:text-lg md:text-2xl">Inscrit le</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in utilisateurs.data" :key="user.id" class="border-b text-black hover:bg-gray-100">
                    <td class="py-2 px-4 text-xl lg:text-lg md:text-3xl">{{ user.name }}</td>
                    <td class="py-2 px-4 text-xl lg:text-lg md:text-3xl">{{ user.firstname }}</td>
                    <td class="py-2 px-4 text-xl lg:text-lg md:text-3xl">{{ user.email }}</td>
                    <td class="py-2 px-4 text-xl lg:text-lg md:text-3xl">{{ formatDate(user.created_at) }}</td>
                </tr>
            </tbody>
        </table>

        <div class="mt-4 flex justify-center gap-2">
            <button @click="changePage(utilisateurs.prev_page_url)" :disabled="!utilisateurs.prev_page_url"
                class="px-4 py-2 bg-gray-300 rounded text-lg lg:text-lg md:text-3xl hover:bg-gray-400 cursor-pointer">Précédent</button>
            <button @click="changePage(utilisateurs.next_page_url)" :disabled="!utilisateurs.next_page_url"
                class="px-4 py-2 bg-gray-300 rounded text-lg lg:text-lg md:text-3xl hover:bg-gray-400 cursor-pointer">Suivant</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL; // ✅ variable d'environnement
const utilisateurs = ref({})
const search = ref('')
const currentUrl = ref(`${API_URL}/utilisateurs`)

let debounceTimer = null

const debouncedSearch = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        fetchUtilisateurs()
    }, 300) // délai de 300ms pour éviter trop de requêtes
}

const fetchUtilisateurs = async (url = currentUrl.value) => {
    try {
        const response = await axios.get(url, {
            params: { search: search.value }
        })
        utilisateurs.value = response.data.users
        currentUrl.value = url
    } catch (error) {
        console.error('Erreur :', error)
    }
}

const changePage = (url) => {
    if (typeof url === 'string' && url.length > 0) {
        fetchUtilisateurs(url)
    }
}

const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
onMounted(() => fetchUtilisateurs())
</script>
