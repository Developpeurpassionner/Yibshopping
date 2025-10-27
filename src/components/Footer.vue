<template>
  <footer class="bg-gray-950 text-gray-300 pt-12 pb-6 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- 🕰️ Navigation -->
      <div>
        <h3 class="text-xl font-semibold text-white mb-4 underline underline-offset-8">Navigation</h3><br>
        <ul class="space-y-2 text-sm">
          <li><router-link to="/" class="hover:text-yellow-400 transition text-lg" 
            :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/' }">Montres Hommes</router-link></li>
          <li><router-link to="/Montres_femmes" class="hover:text-yellow-400 transition text-lg" 
            :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/Montres_femmes' }">Montres Femmes</router-link></li>
          <li><router-link to="/inscription" class="hover:text-yellow-400 transition text-lg" 
            :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/inscription' }">S’inscrire</router-link></li>
          <li><router-link to="/connexion" class="hover:text-yellow-400 transition text-lg" 
            :class="{ 'text-yellow-600 font-bold underline underline-offset-4': $route.path === '/connexion' }">Se connecter</router-link></li>
        </ul>
      </div>

      <!-- 📱 Réseaux sociaux -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4 underline underline-offset-8">Réseaux sociaux</h3><br>
        <div class="flex gap-x-8 text-xl">
          <a href="https://www.facebook.com/ibrahim.yekini.37266" target="_blank" class="hover:text-blue-500 transition">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/in/ibrahim-yekini-60160820a" target="_blank" class="hover:text-pink-500 transition">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://wa.me/066631297" target="_blank" class="hover:text-green-400 transition">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <!-- 📞 Contact -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4 underline underline-offset-8">Contact</h3><br>
        <p class="text-sm mb-1">📞 066631297</p>
        <p class="text-sm mb-4">📞 077232754</p>
        <p class="text-lg text-white italic mt-6">© Tout droit réservé – Ibrahim</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Aucun script nécessaire ici
</script>

<style scoped>
/* Tu peux ajouter des animations ou effets ici si tu veux */
</style>
