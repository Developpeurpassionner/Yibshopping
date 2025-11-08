// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    firstname: ''
  }),
  actions: {
    login(name) {
      this.isAuthenticated = true
      this.firstname = name
      localStorage.setItem('token', 'fake-token')
      localStorage.setItem('firstname', name)
    },
    logout() {
      this.isAuthenticated = false
      this.firstname = ''
      localStorage.removeItem('token')
      localStorage.removeItem('firstname')
    },
    checkAuth() {
      const token = localStorage.getItem('token')
      const name = localStorage.getItem('firstname')
      this.isAuthenticated = !!token
      this.firstname = name || ''
    }
  }
})
