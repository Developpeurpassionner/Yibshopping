<template>
  <div class="relative mt-6">
    <!-- Flèche gauche (visible sur mobile et tablette) -->
    <button @click="scrollLeft"
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full lg:hidden">
      ◀
    </button>

    <!-- Liste des boutons -->
    <div ref="scrollContainer" class="flex overflow-x-auto gap-x-4 px-8 lg:justify-center scrollbar-hide">
      <!-- Bouton "Tous" -->
      <button @click="$emit('filtrer', 'Tous')"
        class="px-4 py-2 rounded text-white font-semibold text-2xl lg:text-lg md:text-3xl cursor-pointer hover:opacity-60 bg-gray-500 min-w-[120px] text-center shrink-0">
        Tous
      </button>

      <button v-for="(categorie, index) in categories" :key="index" @click="$emit('filtrer', categorie)" :class="[
        'px-4 py-2 rounded text-white font-semibold text-2xl lg:text-lg md:text-3xl cursor-pointer hover:opacity-60',
        couleurs[index % couleurs.length],
        'min-w-[120px] text-center shrink-0'
      ]">
        {{ categorie }}
      </button>
    </div>

    <!-- Flèche droite (visible sur mobile et tablette) -->
    <button @click="scrollRight"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full lg:hidden">
      ▶
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  categories: Array,
  couleurs: Array
})

const scrollContainer = ref(null)
const scrollAmount = 160 // largeur approximative d’un bouton

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
</script>
<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
