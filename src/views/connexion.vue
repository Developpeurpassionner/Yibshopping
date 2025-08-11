<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div>
            <div
                class="bg-gray-700 px-8 py-16 space-y-6 rounded-xl shadow-2xl transform transition duration-500 perspective-1000">
                <h2 class="text-white text-2xl font-bold pb-8 text-center">Formulaire de connexion</h2>
                <form @submit.prevent="inscription">
                    <div v-for="(field, index) in fields" :key="index" class="w-full relative">
                        <label :for="field.id" class="text-white block mb-2 font-semibold text-lg">{{ field.label
                            }}</label>
                        <span v-if="!form[field.model]"
                            class="absolute left-2 top-8 bottom-8 text-lg text-gray-400 pointer-events-none">
                            {{ field.placeholder }}
                        </span>
                        <input :type="field.type" :id="field.id" v-model="form[field.model]" placeholder=" "
                            class="w-full px-2 py-2 rounded-lg bg-gray-800 text-white text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300" />
                    </div>
                    <button type="submit"
                        class="w-full py-1 translate-y-[50%] bg-yellow-400 hover:bg-yellow-600 text-black text-lg font-bold rounded-lg shadow-lg cursor-pointer">
                        Connexion
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
    email: '',
    password: ''
})
const fields = [
    { id: 'email', label: 'Email *', type: 'email', model: 'email', placeholder: 'Votre email' },
    { id: 'password', label: 'Mot de passe *', type: 'password', model: 'password', placeholder: '********' },
]
</script>