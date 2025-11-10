<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMontreStore } from '@/stores/montre'

const montreStore = useMontreStore()

onMounted(() => {
  montreStore.chargerMontres()
})

</script>