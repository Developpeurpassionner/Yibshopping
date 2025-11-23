import { defineStore } from 'pinia'
import api from "@/services/apiVercel.js"; // ✅ ton client axios configuré avec VITE_API_URL

export const useMontreStore = defineStore('montre', {
  state: () => ({
    hommes: [],
    femmes: [],
    isLoaded: false
  }),
  actions: {
    async chargerMontres() {
      if (this.isLoaded) return

      // ✅ utilise ton client api au lieu de axios.get('api/...')
      const [hommes, femmes] = await Promise.all([
        api.get('/montreshommes'),
        api.get('/montresfemmes')
      ])

      this.hommes = hommes.data
      this.femmes = femmes.data
      this.isLoaded = true
    }
  }
})
