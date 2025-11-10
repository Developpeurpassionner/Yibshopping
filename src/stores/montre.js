import { defineStore } from 'pinia'
import axios from 'axios'

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
        axios.get('http://localhost:8000/api/montreshommes'),
        axios.get('http://localhost:8000/api/montresfemmes')
      ])
      this.hommes = hommes.data
      this.femmes = femmes.data
      this.isLoaded = true
    }
  }
})
