<template>
  <transition name="fade-slide">
    <div v-if="showSuccess" class="fixed top-4 left-1/2 transform -translate-x-1/2
           bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg
           w-[90%] sm:w-auto text-center z-50">
      {{ successMessage }}
    </div>
  </transition>

  <div class="min-h-screen bg-gray-100 p-6 flex flex-col gap-y-8 lg:gap-y-8 md:gap-y-16">

    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 lg:text-3xl md:text-5xl">Tableau de bord des montres</h1>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="flex flex-col gap-y-4 lg:gap-y-4 md:gap-y-8">
        <div class="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h2 class="text-xl font-semibold text-blue-800 lg:text-xl md:text-4xl">Montres Hommes</h2>
          <p class="text-4xl font-bold text-blue-900 lg:text-4xl md:text-6xl">{{ stats.hommes }}</p>
        </div>
        <div class="flex justify-center">
          <button @click="showModal = true"
            class="cursor-pointer bg-blue-600 text-white text-xl lg:text-xl md:text-4xl px-4 py-1 rounded hover:bg-blue-500 transition">
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
          <button @click="showModal = true"
            class="cursor-pointer bg-red-600 text-white text-xl lg:text-xl md:text-4xl px-4 py-1 rounded hover:bg-red-400 transition">
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <!-- Bouton de fermeture -->
          <button @click="showModal = false"
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl lg:text-xl md:text-4xl font-bold cursor-pointer">&times;</button>
          <!-- Formulaire -->
          <h2 class="text-2xl lg:text-2xl md:text-4xl font-bold mb-4 text-center text-gray-700">Ajouter une montre</h2>
          <form @submit.prevent="AjouterMontre" class="space-y-4" enctype="multipart/form-data">
            <input v-model="information_montre.nom" type="string" name="nom" for="nom" id="nom"
              placeholder="Nom de la montre"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl lg:text-lg md:text-3xl" />
            <input @change="UploadPhoto" type="file" for="photo" name="photo" id="photo" placeholder="photo"
              accept="image/*"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl lg:text-lg md:text-3xl" />
            <input v-model="information_montre.prix" type="number" for="prix" name="prix" id="prix"
              placeholder="Le prix"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl lg:text-lg md:text-3xl" />
            <select v-model="information_montre.genre"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl lg:text-lg md:text-3xl">
              <option value="">genre</option>
              <option value="homme">homme</option>
              <option value="femme">femme</option>
            </select>
            <textarea v-model="information_montre.description" type="string" name="description" id="description"
              placeholder="description" class="w-full px-4 py-2 border rounded 
            focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl lg:text-lg md:text-3xl"></textarea>
            <input v-model="information_montre.quantité" type="number" for="quantité" name="quantité" id="quantité"
              placeholder="La quantité"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl lg:text-lg md:text-3xl" />
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full cursor-pointer
               text-xl lg:text-lg md:text-3xl">
              Ajouter la montre
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Historique -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 class="font-bold text-center text-xl lg:text-2xl md:text-4xl mb-4 text-gray-950">Informations sur toutes les
        montres</h2>
      <table class="w-full text-left border bg-gray-50 mx-auto">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="p-2 text-xl lg:text-base md:text-3xl">Nom</th>
            <th class="p-2 text-xl lg:text-base md:text-3xl">Photo</th>
            <th class="p-2 text-xl lg:text-base md:text-3xl">Prix</th>
            <th class="p-2 text-xl lg:text-base md:text-3xl">Genre</th>
            <th type="text" class="p-2 text-xl lg:text-base md:text-3xl">Description</th>
            <th class="p-2 text-xl lg:text-base md:text-3xl">Quantité</th>
            <th type="date" class="p-2 text-xl lg:text-base md:text-3xl">Date et heure</th>
            <th type="date" class="p-2 text-xl lg:text-base md:text-3xl"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="NouvelleMontre in ToutesLesMontres" :key="NouvelleMontre.id" class="border text-xl lg:text-base md:text-3xl">
            <td class="p-2">{{ NouvelleMontre.nom }}</td>
            <td><img :src="NouvelleMontre.photo.startsWith('/storage') ?
              'http://localhost:8000' + NouvelleMontre.photo : NouvelleMontre.photo"
                class="w-35 h-35 lg:w-20 lg:h-20 md:w-50 md:h-50 object-cover rounded cursor-pointer hover:scale-105 transition" @click="imageZoom = NouvelleMontre.photo.startsWith('/storage') ? 'http://localhost:8000'
                  + NouvelleMontre.photo : NouvelleMontre.photo" /></td>
            <td class="p-2">{{ NouvelleMontre.prix }}</td>
            <td class="p-2">{{ NouvelleMontre.genre }}</td>
            <td class="p-2">{{ NouvelleMontre.description }}</td>
            <td class="p-2">{{ NouvelleMontre.quantité }}</td>
            <td class="px-4 py-2  text-gray-700">
              {{ formatDateTime(NouvelleMontre.created_at) }}
            </td>
            <td class="flex gap-x-8 p-6">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="fade">
      <div v-if="imageZoom" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <img :src="imageZoom" alt="Zoom montre" class="max-w-full max-h-full rounded-lg shadow-lg" />
        <button @click="imageZoom = null"
          class="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition cursor-pointer">&times;
        </button>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const showModal = ref(false)
const stats = ref({ hommes: 0, femmes: 0 })
const showSuccess = ref(false)
const successMessage = ref('')
const Api_Creation_Montre = ref({
  homme: 'http://localhost:8000/api/montres_pour_hommes',
  femme: 'http://localhost:8000/api/montres_pour_femmes'
})

// Information de la montre à ajouter homme ou femme
const information_montre = ref({
  nom: '',
  photo: null,
  prix: null,
  genre: '',
  description: '',
  quantité: null
})
const photoFile = ref(null) // pour stocker le fichier sélectionné
const UploadPhoto = (event) => {
  photoFile.value = event.target.files[0] // le premier fichier choisi
}
//la variable pour stocker toutes les montres
const ToutesLesMontres = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/Dashboard')
    ToutesLesMontres.value = response.data
     // Calcule le nombre de montres hommes et femmes
    const hommes = ToutesLesMontres.value.filter(m => m.genre === 'homme').length
    const femmes = ToutesLesMontres.value.filter(m => m.genre === 'femme').length
    stats.value = { hommes, femmes }
  } catch (error) {
    console.error('Erreur lors du chargement des montres', error)
  }
})

const AjouterMontre = async () => {
  //construire les données en FormData pour inclure le fichier photo
  const formData = new FormData()
  formData.append('nom', information_montre.value.nom)
  formData.append('prix', information_montre.value.prix)
  formData.append('genre', information_montre.value.genre)
  formData.append('description', information_montre.value.description)
  formData.append('quantité', information_montre.value.quantité)
  if (photoFile.value) {
    formData.append('photo', photoFile.value)
  }

  //Valeur de l'URL en fonction du genre
  let url = null
  if (information_montre.value.genre === 'homme') {
    url = Api_Creation_Montre.value.homme
  }
  else if (information_montre.value.genre === 'femme') {
    url = Api_Creation_Montre.value.femme
  }
  else {
    alert('Veuillez sélectionner un genre')
    return
  }
  //Envoyer la requête POST pour ajouter la montre
  try {
    const response = await axios.post(url, formData)
    const NouvelleMontre = response.data.MontreAdd
    if (NouvelleMontre) {
      ToutesLesMontres.value.push(NouvelleMontre)
    }
    successMessage.value = '✅ Montre ajoutée avec succès !'
    showSuccess.value = true

    // Masquer l’alerte après 6 secondes
    setTimeout(() => {
      showSuccess.value = false
    }, 6000)
    // Fermer le modal et réinitialiser le formulaire
    showModal.value = false
    information_montre.value = { nom: '', photo: null, prix: null, genre: '', description: '', quantité: null }
    photoFile.value = null

  } catch (error) {
    console.error('Erreur ajout montre', error.response?.data || error.message)
    successMessage.value = error.response?.data?.message || 'Erreur lors de l’ajout de la montre'
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 6000)
  }

}

const imageZoom = ref(null) // stocke l’URL de l’image à agrandir

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>