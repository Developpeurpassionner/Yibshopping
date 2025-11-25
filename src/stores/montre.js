import { defineStore } from 'pinia'
import { getMontresHommes, getMontresFemmes } from "@/service/apiProxy.js"

export const useMontreStore = defineStore('montre', {
  state: () => ({
    hommes: [],
    femmes: [],
    isLoaded: false
  }),
  actions: {
    async chargerMontres() {
      if (this.isLoaded) return

      const [hommes, femmes] = await Promise.all([
        getMontresHommes(),
        getMontresFemmes()
      ])

      this.hommes = hommes
      this.femmes = femmes
      this.isLoaded = true
    }
  }
})
