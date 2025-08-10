<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
    <div
      class="bg-gray-700 px-8 py-16 space-y-6 rounded-xl shadow-2xl transform hover:scale-[1.02] transition duration-500 perspective-1000">
      <h2 class="text-white text-2xl font-bold pb-8 text-center">Formulaire d'inscription</h2>

      <p v-if="message" class="text-white text-center">{{ message }}</p>

      <ul v-if="errors" class="text-red-500 mb-4">
        <li v-for="(fieldErrors, field) in errors" :key="field">
          <strong>{{ field }}:</strong> {{ fieldErrors.join(', ') }}
        </li>
      </ul>

      <form @submit.prevent="inscription">
        <div v-for="(field, index) in fields" :key="index" class="relative">
          <label :for="field.id" class="text-white block mb-2 font-semibold">{{ field.label }}</label>
          <input
            :type="field.type"
            :id="field.id"
            v-model="form[field.model]"
            :placeholder="field.placeholder"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
        </div>

        <button type="submit"
          class="w-full py-1 translate-y-[50%] bg-yellow-400 hover:bg-yellow-600 text-black text-lg font-bold rounded-lg shadow-lg">
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  name: '',
  firstname: '',
  email: '',
  password: ''
})

const errors = ref(null)
const message = ref('')

const fields = [
  { id: 'name', label: 'Nom', type: 'text', model: 'name', placeholder: 'Votre nom' },
  { id: 'firstname', label: 'Prenom', type: 'text', model: 'firstname', placeholder: 'Votre prenom' },
  { id: 'email', label: 'Email', type: 'email', model: 'email', placeholder: 'Votre email' },
  { id: 'password', label: 'Mot de passe', type: 'password', model: 'password', placeholder: '********' },
]

const inscription = async () => {
  errors.value = null
  message.value = ''

  try {
    const response = await axios.post('http://localhost:8000/api/inscription', form.value)
    message.value = response.data.message || 'Inscription réussie. Veuillez vous connecter.'
  } catch (error) {
    if (error.response && error.response.status === 422) {
      message.value = error.response.data.message
      errors.value = error.response.data.error
    } else {
      message.value = 'Une erreur est survenue. Veuillez réessayer plus tard.'
    }
  }
}
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>
