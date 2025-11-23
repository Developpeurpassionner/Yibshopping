<template>
    <Transition name="fade-slide" appear enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4">
        <div class="flex flex-col md:flex-row gap-6 p-8 bg-black shadow-lg rounded-lg 
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <!-- Bouton croix -->
            <button @click="onClose"
                class="absolute top-4 right-2 text-white text-2xl cursor-pointer font-bold hover:text-red-500">
                ✕
            </button>
            <!-- Bloc gauche : image + description de la montre -->
            <div class="md:w-1/2 flex flex-col items-center">
                <img :src="montre.photo.startsWith('/storage')
                    ? BACKEND_URL + montre.photo
                    : montre.photo" :alt="montre.nom" class="w-64 h-64 object-cover rounded-lg shadow-md" />
                <h2 class="mt-4 text-2xl font-bold text-gray-200">{{ montre.nom }}</h2>
                <p class="text-xl text-blue-600 font-semibold">Prix : {{ montre.prix }} Fcfa</p>
                <p class="text-lg mt-2 text-gray-300 text-center">{{ montre.description }}</p>
            </div>

            <!-- Bloc droit : formulaire du client -->
            <div class="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Formulaire de commande</h2>
                <form @submit.prevent="submitForm" class="gap-4 flex flex-col">
                    <input v-model="form.nom_client" type="text" placeholder="Nom" class="w-full border rounded p-2" />
                    <p v-if="errors.nom_client" class="text-red-500 text-sm">{{ errors.nom_client[0] }}</p>
                    <input v-model="form.prenom_client" type="text" placeholder="Prénom"
                        class="w-full border rounded p-2" />
                    <p v-if="errors.prenom_client" class="text-red-500 text-sm">{{ errors.prenom_client[0] }}</p>
                    <input v-model="form.quartier_client" type="text" placeholder="Quartier"
                        class="w-full border rounded p-2" />
                    <p v-if="errors.quartier_client" class="text-red-500 text-sm">{{ errors.quartier_client[0] }}</p>
                    <input v-model="form.telephone_client" type="tel" placeholder="Numéro de téléphone"
                        class="w-full border rounded p-2" />
                    <p v-if="errors.telephone_client" class="text-red-500 text-sm">{{ errors.telephone_client[0] }}</p>
                    <div>
                        <label
                            class="left-2 top-2 text-gray-500 text-[16px] peer-placeholder-shown:top-0 peer-focus:top-0 transition-all">
                            Quantité
                        </label>
                        <input v-model.number="form.quantite_montre" type="number" min="1" required
                            class="w-full border rounded p-2" />
                    </div>
                    <p v-if="errors.quantite_montre" class="text-red-500 text-sm">{{ errors.quantite_montre[0] }}</p>
                    <button type="submit"
                        class="text-lg font-extrabold w-full bg-orange-300 text-black py-2 rounded cursor-pointer hover:bg-yellow-700 transition">
                        Passer la commande
                    </button>
                </form>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL; // ✅ variable d'environnement
const BACKEND_URL = API_URL.replace("/api", ""); // enlève /api pour obtenir l'URL de base du backend
const errors = ref({})
const confirmationMessage = ref(null)
const emit = defineEmits(['confirm'])
const props = defineProps({
    montre: {
        type: Object,
        required: true
    },
    onClose: Function,
    genre: String
})

const form = ref({
    nom_client: '',
    prenom_client: '',
    quartier_client: '',
    telephone_client: '',
    quantite_montre: 1,
})

const submitForm = async () => {
    errors.value = {} // Réinitialise les erreurs
    try {
        const prixTotal = props.montre.prix * form.value.quantite_montre
        const commander = {
            nom_client: form.value.nom_client,
            prenom_client: form.value.prenom_client,
            quartier_client: form.value.quartier_client,
            telephone_client: form.value.telephone_client,
            quantite_montre: form.value.quantite_montre,
            prix_unitaire_montre: props.montre.prix,
            prix_total_montre: prixTotal,
            montre_id: props.montre.id,
            genre_montre: props.genre
        }

        const response = await axios.post(`${API_URL}/commandes`, commander)
        const data = response.data.commande
        confirmationMessage.value = `
      🎉 Bonjour ${data.prenom_client} ! Votre commande de ${data.quantite_montre} montre(s) a bien été enregistrée. 📦
      🕰️ Montre : ${data.nom_montre} pour ${data.genre_montre}
      💰 Prix unitaire : ${data.prix_unitaire_montre} FCFA
      💰 Prix total : ${data.prix_total_montre} FCFA
      📍 Livraison à : ${data.quartier_client}
      📞 Nous vous contacterons au ${data.telephone_client} pour la livraison.
      Merci pour votre confiance 🙏. Un livreur vous apportera votre commande très bientôt !
    `
        emit('confirm', confirmationMessage.value)

        // Réinitialiser le formulaire après soumission réussie
        form.value.nom_client = ''
        form.value.prenom_client = ''
        form.value.quartier_client = ''
        form.value.telephone_client = ''
        form.value.quantite_montre = 1
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors || {}
            alert(error.response.data.message || 'Veuillez corriger les erreurs.')
        } else {
            alert('Une erreur est survenue.')
        }
        console.log('Erreur complète :', error.response.data)
    }
}
</script>
