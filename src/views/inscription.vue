<template>
  <!--la div de toute la page -->
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
    <div>
      <!-- ❌ Message d’erreur -->
      <transition name="fade">
        <p v-if="showMessage && messageType === 'error'"
          class="text-white text-center text-lg bg-red-500 rounded-b-lg rounded-t-txl p-4 font-extrabold mx-auto">{{
            message }}</p>
      </transition>
      <!-- ✅ Message de succès -->
      <transition name="fade">
        <p v-if="showMessage && messageType === 'success'"
          class="text-white text-center text-lg bg-green-500 rounded-lg p-4 font-extrabold mx-auto w-fit shadow-lg">
          {{ message }}
        </p>
      </transition>
      <!-- ⏳ Animation de chargement -->
      <transition name="fade">
        <div v-if="isRedirecting" class="flex justify-center items-center mt-4">
          <div class="loader mr-2"></div>
          <p class="text-white text-2xl font-semibold lg:text-lg md:text-4xl">Redirection en cours...</p>
        </div>
      </transition>
      <!--la div du formulaire -->
      <div
        class="bg-gray-700 px-8 py-16 space-y-6 rounded-xl shadow-2xl transform transition duration-500 perspective-1000">
        <h2 class="text-white text-2xl font-bold pb-8 text-center md:text-5xl lg:text-2xl">Formulaire d'inscription</h2>
        <form @submit.prevent="inscription">
          <div v-for="(field, index) in fields" :key="index" class="w-full relative">
            <label :for="field.id" class="text-white block mb-2 font-semibold text-2xl lg:text-lg md:text-4xl">{{
              field.label }}</label>
            <span v-if="!form[field.model]"
              class="absolute left-2 top-8 bottom-8 text-xl text-gray-400 pointer-events-none lg:text-lg md:text-4xl">
              {{ field.placeholder }}
            </span>
            <input :type="typeof field.type === 'function' ? field.type() : field.type" :id="field.id"
              v-model="form[field.model]" placeholder=" " class="w-full px-2 py-2 rounded-lg bg-gray-800 text-white text-2xl shadow-inner
           focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 lg:text-lg md:text-4xl" />
            <!-- 👁️ Bouton pour afficher/masquer le mot de passe -->
            <button v-if="field.id === 'password'" type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-10 text-white text-xl hover:text-yellow-400 transition">
              {{ showPassword ?  '👁️':'🙈'}}
            </button>
          </div>
          <p class="text-white text-xl lg:text-lg md:text-4xl">Le mot de passe doit contenir au moins 8 caractères <br>
            avec au moins une
            majuscule , une minuscule et un chiffre</p>
          <button type="submit"
            class="w-full py-1 translate-y-[50%] bg-yellow-400
             hover:bg-yellow-600 text-black text-xl font-bold rounded-lg shadow-lg cursor-pointer lg:text-lg md:text-4xl">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const form = ref({
  name: '',
  firstname: '',
  email: '',
  password: ''
})
const message = ref('')
const showPassword = ref(false)
const fields = [
  { id: 'name', label: 'Nom *', type: 'text', model: 'name', placeholder: 'Votre nom' },
  { id: 'firstname', label: 'Prénom *', type: 'text', model: 'firstname', placeholder: 'Votre prénom' },
  { id: 'email', label: 'Email *', type: 'email', model: 'email', placeholder: 'Votre email' },
  { id: 'password', label: 'Mot de passe *', type: () => showPassword.value ? 'text' : 'password', model: 'password', placeholder: '********' },
]
const showMessage = ref(false)

const triggerMessage = (text, type = 'error', duration = 10000) => {
  message.value = text
  messageType.value = type
  showMessage.value = true

  setTimeout(() => {
    showMessage.value = false
    message.value = ''
    messageType.value = ''
  }, duration)
}
const messageType = ref('') // 'success' ou 'error'
const inscription = async () => {
  message.value = ''
  try {
    const response = await axios.post('http://localhost:8000/api/inscription', form.value)
    triggerMessage(response.data.message, 'success')
    isRedirecting.value = true
    // Redirection après 6 secondes
    setTimeout(() => {
      router.push('/connexion')
    }, 6000)
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // Utilisateur déjà inscrit
      triggerMessage(error.response.data.message, 'error')
      setTimeout(() => {
        router.push('/connexion')
      }, 6000) // redirection après 6 secondes
    } else if (error.response && error.response.status === 422) {
      triggerMessage(error.response.data.message, 'error')
    } else {
      triggerMessage('Une erreur est survenue. Veuillez réessayer plus tard.', 'error')
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

.loader {
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
