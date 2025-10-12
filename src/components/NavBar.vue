<template>
    <nav class="fixed top-0 left-0 w-full bg-black shadow-md px-4 py-2 flex justify-around items-center text-lg z-50">
        <!-- Menu normal sur desktop -->
        <ul class="hidden lg:flex gap-x-12">
            <li><router-link to="/" class="text-white hover:text-yellow-300"
                    :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/' }">Montres
                    Hommes</router-link>
            </li>
            <li><router-link to="/Montres_femmes" class="text-white hover:text-yellow-300"
                    :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/Montres_femmes' }">Montres
                    Femmes</router-link>
            </li>
            <template v-if="!isConnected">
                <button class="bg-yellow-600 px-4 rounded-sm text-black font-bold hover:bg-yellow-300">
                    <li><router-link to="/inscription">S'inscrire</router-link></li>
                </button>
                <button class="bg-green-800 px-4 rounded-sm font-bold text-white hover:bg-green-600">
                    <li><router-link to="/connexion">Se connecter</router-link></li>
                </button>
            </template>
            <p v-if="isConnected" class="text-xl text-red-400 font-semibold flex">Bienvenue {{ firstname }} !
                <img src="../../public/images/sticker.png" alt="smiley" class="w-8 h-8" />
            </p>
            <transition name="fade">
                <p v-if="byeMessage" class="text-white text-xl font-extrabold mt-4">
                    {{ byeMessage }}
                </p>
            </transition>
            <transition name="fade">
                <button v-if="isConnected" @click="deconnexion"
                    class=" bg-red-700 px-4 rounded text-white font-bold cursor-pointer hover:bg-red-500 transition-all duration-300 active:scale-95 active:opacity-80">
                    Déconnexion
                </button>
            </transition>
        </ul>
        <!-- Menu burger sur mobile -->
        <div class="mx-auto flex justify-between items-center gap-6 lg:hidden">
            <button @click="menuOuvert = !menuOuvert" class="text-4xl text-yellow-400 md:text-6xl">&#9776;</button>
            <div>
                <p v-if="firstname" class="text-[22px] text-red-400 font-semibold flex lg:text-[20px] md:text-[37px]">Bienvenue {{ firstname }} !
                    <img src="../../public/images/sticker.png" alt="smiley" class="w-8 h-8 lg:w-8 lg:h-8 md:w-14 md:h-14" />
                </p>
            </div>
        </div>
    </nav>
    <!-- Menu mobile -->
    <div v-if="menuOuvert"
        class="lg:hidden absolute right-0 top-12 bg-white shadow-xl p-4 w-45 text-2xl z-50 md:text-4xl md:w-74 md:right-18 md:top-18">
        <ul class="flex flex-col gap-y-4 md:text-center">
            <li><router-link to="/" class="block py-3 md:py-5"
                    :class="{ 'text-yellow-600 font-bold': $route.path === '/' }" @click="menuOuvert = false">Montres
                    <span class=" underline underline-offset-8 decoration-yellow-700"
                        :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/' }"
                        @click="menuOuvert = false">Hommes
                    </span>
                </router-link>
            </li>
            <li><router-link to="/Montres_femmes" class="block py-3 md:py-5"
                    :class="{ 'text-yellow-600 font-bold': $route.path === '/Montres_femmes' }"
                    @click="menuOuvert = false">Montres
                     <span class=" underline underline-offset-8 decoration-yellow-700"
                        :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/Montres_femmes' }"
                        @click="menuOuvert = false">Femmes
                    </span></router-link>
                </li>
            <template v-if="!isConnected">
                <li><router-link to="/inscription"
                        class="block py-3 underline underline-offset-8 decoration-yellow-700 md:py-5"
                        @click="menuOuvert = false">S'inscrire</router-link>
                </li>
                <li><router-link to="/connexion"
                        class="block py-3 underline underline-offset-8 decoration-yellow-700 md:py-5"
                        @click="menuOuvert = false">Se
                        connecter</router-link></li>
            </template>
            <p v-if="showMessage && messageType === 'error'"
                class="text-white text-center text-lg bg-red-500 rounded-b-lg rounded-t-txl p-4 font-extrabold mx-auto">
                {{ message }}</p>
            <transition name="fade">
                <button v-if="isConnected" @click="deconnexion"
                    class="bg-red-700 px-2 rounded text-white font-bold cursor-pointer hover:bg-red-500 transition-all duration-300 active:scale-95 active:opacity-80">
                    Déconnexion
                </button>
            </transition>
            <p class="text-gray-900" @click="menuOuvert = false">Fermer</p>
        </ul>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
const menuOuvert = ref(false);
import { ref, onMounted } from 'vue'
const firstname = ref('')
const isConnected = ref(false)
onMounted(() => {
    firstname.value = localStorage.getItem('firstname') || ''
    isConnected.value = !!firstname.value
})
const byeMessage = ref('')
const deconnexion = () => {
    isConnected.value = false
    byeMessage.value = 'À bientôt ! 😊'
    setTimeout(() => {
        localStorage.removeItem('firstname')
        localStorage.removeItem('token')
        firstname.value = ''
    }, 300) // attendre que l’animation se termine

    // Masquer le message après quelques secondes
    setTimeout(() => {
        byeMessage.value = ''
    }, 6000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>