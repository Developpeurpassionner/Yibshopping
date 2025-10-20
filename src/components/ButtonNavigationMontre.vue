<!-- components/ButtonNavigationMontre.vue -->
<template>
  <div class="relative mt-6">
    <!-- Flèche gauche -->
    <button @click="prev"
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full md:hidden">
      ◀
    </button>

    <!-- Liste des boutons -->
    <div class="flex justify-center overflow-hidden">
      <div class="flex transition-transform duration-300 gap-x-4"
        :style="{ transform: `translateX(-${currentIndex * buttonWidth}px)` }">
        <!-- Bouton "Tous" -->
        <button @click="$emit('filtrer', 'Tous')"
          class="px-4 py-2 m-2 rounded text-white font-semibold text-lg cursor-pointer hover:opacity-60 bg-gray-500 min-w-[120px] text-center shrink-0">
          Tous
        </button>

        <button v-for="(categorie, index) in categories" :key="index" @click="$emit('filtrer', categorie)" :class="[
          'px-4 py-2 m-2 rounded text-white font-semibold text-lg cursor-pointer hover:opacity-60',
          couleurs[index % couleurs.length],
          'min-w-[120px] text-center shrink-0'
        ]">
          {{ categorie }}
        </button>
      </div>
    </div>

    <!-- Flèche droite -->
    <button @click="next"
      class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full md:hidden">
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

const currentIndex = ref(0)
const buttonWidth = 140

function next() {
  if (currentIndex.value < props.categories.length - 1) currentIndex.value++
}

function prev() {
  if (currentIndex.value > 0) currentIndex.value--
}
</script>
