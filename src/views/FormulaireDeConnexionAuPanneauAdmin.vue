<template>
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <p class="text-xl text-red-600 font-extrabold pb-6 lg:text-lg md:text-[35px]">{{ message }}</p>
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 
                sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                <div class="max-w-md mx-auto">
                    <div>
                        <h1 class="text-3xl font-semibold lg:text-2xl md:text-5xl">Login</h1>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="relative">
                                <input autocomplete="off" id="Username" name="Username" type="text" class="peer placeholder-transparent h-10 w-full border-b-2
                                 border-gray-300 text-gray-900
         text-xl sm:text-lg md:text-4xl lg:text-2xl
         focus:outline-none" placeholder="Username" v-model="AuthAdmin.username" />
                                <label for="Username" class="absolute left-0 -top-3.5 text-black
         text-xl sm:text-base md:text-3xl lg:text-xl
         transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
         peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                            </div>
                            <div class="relative">
                                <input autocomplete="off" id="password" name="password" type="password" class="text-2xl 
                                peer placeholder-transparent h-10 w-full border-b-2 border-gray-300
                                     text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password"
                                    v-model="AuthAdmin.password" />
                                <label for="password" class="absolute left-0 -top-3.5 text-black
         text-xl sm:text-base md:text-3xl lg:text-xl
         transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400
         peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                            </div>
                            <div class="relative">
                                <button
                                    class="bg-cyan-500 text-white rounded-md px-4 py-2
         text-xl sm:text-base md:text-3xl lg:text-lg
         hover:bg-cyan-600 transition duration-300 cursor-pointer transform translate-y-6 lg:translate-y-4 md:translate-y-8"
                                    @click="connexionDashboard">
                                    connexion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const message = ref('');
const router = useRouter();

const AuthAdmin = ref({
    username: '',
    password: ''
});

const connexionDashboard = async () => {
    try {
        const response = await axios.post("http://localhost:8000/api/Admin", AuthAdmin.value);

        // Vérifie si les identifiants sont corrects
        if (response.data.success) {
            message.value = response.data.message;
            // Redirige vers le tableau de bord
            router.push('/Dashboard');
        } else {
            message.value = response.data.message;
        }

    } catch (error) {
        message.value = error.response?.data?.message || 'Erreur lors de la connexion.';
    }
};
</script>
