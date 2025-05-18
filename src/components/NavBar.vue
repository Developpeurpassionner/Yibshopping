<template>
    <nav class="fixed top-0 left-0 w-full bg-black shadow-md px-4 py-2 flex justify-around items-center text-lg z-50">
        <!-- Menu normal sur desktop -->
        <ul class="hidden lg:flex gap-x-12">
            <li><router-link to="/" class="text-white hover:text-yellow-300"
                  :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/' }">Montres Hommes</router-link>
            </li>
            <li><router-link to="/Montres_femmes" class="text-white hover:text-yellow-300"
                :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/Montres_femmes' }">Montres Femmes</router-link>
            </li>
            <button class="bg-yellow-600 px-4 rounded-sm text-black font-bold hover:bg-yellow-300">
                <li><router-link to="/inscription">S'inscrire</router-link></li>
            </button>
            <button class="bg-green-800 px-4 rounded-sm font-bold text-white hover:bg-green-600">
                <li><router-link to="/connexion">Se connecter</router-link></li>
            </button>
        </ul>
        <!-- Menu burger sur mobile -->
        <div class="lg:hidden">
            <button @click="menuOuvert = !menuOuvert" class="text-4xl text-yellow-400 md:text-6xl">&#9776;</button>
        </div>
    </nav>
    <!-- Menu mobile -->
    <div v-if="menuOuvert"
        class="lg:hidden absolute right-0 top-12 bg-white shadow-xl p-4 w-45 text-2xl z-50 md:text-4xl md:w-60 md:right-18">
        <ul>
            <li><router-link to="/" class="block py-3 md:py-5" :class="{ 'text-yellow-600 font-bold': $route.path === '/' }" @click="menuOuvert = false">Montres 
                     <span class=" underline underline-offset-8 decoration-yellow-700" 
                      :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/' }" @click="menuOuvert = false">Hommes
                     </span>
                </router-link> 
            </li>
            <li><router-link to="/Montres_femmes" class="block py-3 md:py-5" :class="{ 'text-yellow-600 font-bold': $route.path === '/Montres_femmes' }" @click="menuOuvert = false">Montres
                <span class=" underline underline-offset-8 decoration-yellow-700"
                      :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/Montres_femmes' }" @click="menuOuvert = false">Femmes
                </span></router-link></li>
            <li><router-link to="/inscription"
                    class="block py-3 underline underline-offset-8 decoration-yellow-700 md:py-5" @click="menuOuvert = false">S'inscrire</router-link>
            </li>
            <li><router-link to="/connexion"
                    class="block py-3 underline underline-offset-8 decoration-yellow-700 md:py-5" @click="menuOuvert = false">Se
                    connecter</router-link></li>
            <button class="bg-red-600 p-2 text-white rounded-sm" @click="menuOuvert = false">Fermer</button>
        </ul>
    </div>
</template>

<script setup>
   import { RouterLink } from 'vue-router';
   import { ref } from "vue";
   const menuOuvert = ref(false);
</script>