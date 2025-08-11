<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
    <div>
      <transition name="fade"><p v-if="message"
        class="text-white text-center text-lg bg-red-500 rounded-b-lg rounded-t-txl p-4 font-extrabold mx-auto">{{
          message }}</p></transition>
      <div
        class="bg-gray-700 px-8 py-16 space-y-6 rounded-xl shadow-2xl transform transition duration-500 perspective-1000">
        <h2 class="text-white text-2xl font-bold pb-8 text-center">Formulaire d'inscription</h2>
        <form @submit.prevent="inscription">
          <div v-for="(field, index) in fields" :key="index" class="w-full relative">
            <label :for="field.id" class="text-white block mb-2 font-semibold text-lg">{{ field.label }}</label>
            <span v-if="!form[field.model]"
              class="absolute left-2 top-8 bottom-8 text-lg text-gray-400 pointer-events-none">
              {{ field.placeholder }}
            </span>
            <input :type="field.type" :id="field.id" v-model="form[field.model]" placeholder=" "
              class="w-full px-2 py-2 rounded-lg bg-gray-800 text-white text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300" />
          </div>
          <p class="text-white text-lg">Le mot de passe doit contenir au moins 8 caractères <br> avec au moins une
            majuscule , une minuscule et un chiffre</p>
          <button type="submit"
            class="w-full py-1 translate-y-[50%] bg-yellow-400 hover:bg-yellow-600 text-black text-lg font-bold rounded-lg shadow-lg cursor-pointer">
            S'inscrire
          </button>
        </form>
      </div>
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
const message = ref('')
const fields = [
  { id: 'name', label: 'Nom', type: 'text', model: 'name', placeholder: 'Votre nom' },
  { id: 'firstname', label: 'Prenom', type: 'text', model: 'firstname', placeholder: 'Votre prenom' },
  { id: 'email', label: 'Email', type: 'email', model: 'email', placeholder: 'Votre email' },
  { id: 'password', label: 'Mot de passe', type: 'password', model: 'password', placeholder: '********' },
]
const showMessage = ref(false)

const triggerMessage = (text, duration = 10000) => {
  message.value = text
  showMessage.value = true

  setTimeout(() => {
    showMessage.value = false
    message.value = ''
  }, duration)
}

const inscription = async () => {
  message.value = ''
  try {
    const response = await axios.post('http://localhost:8000/api/inscription', form.value)
    triggerMessage(response.data.message || 'Inscription réussie. Veuillez vous connecter.')
  } catch (error) {
    if (error.response && error.response.status === 422) {
      triggerMessage(error.response.data.message)
    } else {
      triggerMessage('Une erreur est survenue. Veuillez réessayer plus tard.')
    }
  }
}
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
