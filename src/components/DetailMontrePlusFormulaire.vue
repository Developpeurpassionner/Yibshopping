<template>
    <Transition name="fade-slide" appear enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4">
        <div class="flex flex-col md:flex-row gap-6 p-8 bg-black shadow-lg rounded-lg">
            <!-- Bouton croix -->
            <button @click="onClose" class="absolute top-4 right-2 text-white text-2xl cursor-pointer font-bold hover:text-red-500">
                ✕
            </button>
            <!-- Bloc gauche : image + description de la montre -->
            <div class="md:w-1/2 flex flex-col items-center">
                <img :src="montre.photo.startsWith('/storage')
                    ? 'http://localhost:8000' + montre.photo
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
                    <input v-model="form.prenom_client" type="text" placeholder="Prénom"
                        class="w-full border rounded p-2" />
                    <input v-model="form.quantité_montre" type="number" min="1" placeholder="Quantité"
                        class="w-full border rounded p-2" />
                    <input v-model="form.quartier_client" type="text" placeholder="Quartier"
                        class="w-full border rounded p-2" />
                    <input v-model="form.telephone_client" type="tel" placeholder="Numéro de téléphone"
                        class="w-full border rounded p-2" />

                    <button type="submit"
                        class="text-lg font-extrabold w-full bg-orange-300 text-black py-2 rounded hover:bg-yellow-700 transition">
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

const props = defineProps({
    montre: {
        type: Object,
        required: true
    },
     onClose: Function
})

const form = ref({
    nom_client: '',
    prenom_client: '',
    quantité_montre: 1,
    quartier_client: '',
    telephone_client: ''
})

const submitForm = async () => {
    try {
        const commande = {
            ...form,
            photo: props.montre.photo,
            description: props.montre.description,
            nom: props.montre.nom,
            prix: props.montre.prix
        }

        await axios.post('http://localhost:8000/api/commandes', commande)
        alert('Commande envoyée avec succès !')
        form.nom_client = ''
        form.prenom_client = ''
        form.quantité_montre = 1
        form.quartier_client = ''
        form.telephone_client = ''
         props.onClose()
    } catch (error) {
        console.error(error)
        alert('Erreur lors de l’envoi de la commande.')
    }
}
</script>
