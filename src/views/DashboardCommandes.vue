<template>
    <div>
        <button @click="reinitialiserAutoIncrement"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
            🔄 Réinitialiser AUTO_INCREMENT
        </button>
        <div class="min-h-screen bg-gray-100 p-6">
            <div
                class="relative bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg overflow-hidden animate-fade-in">
                <!-- Icône décorative -->
                <div class="absolute top-4 right-4 text-4xl opacity-30">
                    💰
                </div>

                <!-- Titre -->
                <h2 class="text-xl font-bold mb-2">Chiffre d’affaires total</h2>

                <!-- Montant -->
                <p class="text-3xl font-extrabold tracking-wide">
                    {{ formatMontant(chiffreAffaire) }} FCFA
                </p>

                <!-- Animation décorative -->
                <div class="absolute bottom-0 left-0 w-full h-2 bg-white opacity-20 animate-pulse"></div>
            </div><br>
            <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">📋 Tableau des Commandes</h1><br>

            <div class="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="px-4 py-3 text-left text-[16px] font-semibold">Nom</th>
                            <th class="px-4 py-3 text-left text-[16px] font-semibold">Prénom</th>
                            <th class="px-4 py-3 text-left text-[16px] font-semibold">Quartier</th>
                            <th class="px-4 py-3 text-left text-[16px] font-semibold">Téléphone</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Photo de la montre</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Nom de la montre</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Genre de la montre</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Description de la montre</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Quantité de la montre</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Prix Unitaire</th>
                            <th class="px-4 py-3 text-left text-[15px] font-semibold">Prix Total</th>
                            <th class="px-4 py-3 text-left text-[16px] font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="commande in commandes" :key="commande.id" class="hover:bg-gray-50">
                            <td class="px-4 py-2 text-[15px] text-gray-700">{{ commande.nom_client }}</td>
                            <td class="px-4 py-2 text-[15px] text-gray-700">{{ commande.prenom_client }}</td>
                            <td class="px-4 py-2 text-sm text-gray-700">{{ commande.quartier_client }}</td>
                            <td class="px-4 py-2 text-sm text-gray-700">{{ commande.telephone_client }}</td>
                            <td><img :src="commande.photo_montre.startsWith('/storage') ?
                                'http://localhost:8000' + commande.photo_montre : commande.photo_montre"
                                    class="w-35 h-35 lg:w-25 lg:h-25 md:w-50 md:h-50 object-cover rounded cursor-pointer hover:scale-105 transition"
                                    @click="imageZoom = commande.photo_montre.startsWith('/storage') ? 'http://localhost:8000'
                                        + commande.photo_montre : commande.photo_montre" /></td>
                            <td class="px-4 py-2 text-[15px] text-gray-700">{{ commande.nom_montre }}</td>
                            <td class="px-4 py-2 text-[16px] text-gray-700 capitalize">{{ commande.genre_montre }}</td>
                            <td class="px-4 py-2 text-sm text-gray-700 capitalize">{{ commande.description_montre }}
                            </td>
                            <td class="px-4 py-2 text-sm text-blue-600 font-semibold">{{ commande.quantite_montre }}
                            </td>
                            <td class="px-4 py-2 text-[15px] text-green-600">{{ commande.prix_unitaire_montre }} FCFA
                            </td>
                            <td class="px-4 py-2 text-[15px] text-green-700 font-bold">{{ commande.prix_total_montre }}
                                FCFA
                            </td>
                            <td class="px-4 py-2 text-sm text-gray-500">{{ new
                                Date(commande.created_at).toLocaleDateString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-6">
                <button @click="changerPage(pagination.current_page - 1)" :disabled="pagination.current_page === 1"
                    class="px-4 py-2 mx-2 rounded bg-gray-300 cursor-pointer hover:bg-gray-400 disabled:opacity-50">
                    ← Précédent
                </button>
                <button @click="changerPage(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-4 py-2 mx-2 rounded bg-gray-300 cursor-pointer hover:bg-gray-400 disabled:opacity-50">
                    Suivant →
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue'

const reinitialiserAutoIncrement = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/commandes/reinitialiser-auto-increment')
        alert(response.data.message)
    } catch (error) {
        alert('Erreur lors de la réinitialisation.')
        console.error(error)
    }
}

const commandes = ref([])
const pagination = ref({ current_page: 1, last_page: 1 })
const chargerCommandes = async (page = 1) => {
    const response1 = await axios.get('http://localhost:8000/api/ToutesLesCommandes?page=' + page)
    commandes.value = response1.data.data
    pagination.value = {
        current_page: response1.data.current_page,
        last_page: response1.data.last_page
    }
}

const changerPage = (page) => {
    if (page >= 1 && page <= pagination.value.last_page) {
        chargerCommandes(page)
    }
}

onMounted(() => {
    chargerCommandes()
})
const chiffreAffaire = ref(0)
const fetchChiffreAffaire = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/chiffre-affaire')
        if (response.data.success) {
            chiffreAffaire.value = response.data.chiffre_d_affaire_total
        }
    } catch (error) {
        console.error('Erreur lors du chargement du chiffre d’affaires :', error)
    }
}

const formatMontant = (montant) => {
    return montant.toLocaleString('fr-FR')
}

onMounted(() => fetchChiffreAffaire())
</script>
<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
}
</style>
