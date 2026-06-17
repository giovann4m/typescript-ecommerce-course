import { defineStore } from 'pinia'

interface User {
  username: string
  email: string
  role: 'ADMIN' | 'CUSTOMER'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  }),

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Usuários simulados
      const users = [
        { username: 'Admin',    email: 'admin@zentech.com', password: 'admin123', role: 'ADMIN'    as const },
        { username: 'Cliente',  email: 'user@zentech.com',  password: 'user123',  role: 'CUSTOMER' as const },
      ]

      const found = users.find(u => u.email === email && u.password === password)

      if (found) {
        this.user = { username: found.username, email: found.email, role: found.role }
        this.token = 'fake-jwt-token-' + Date.now()
        this.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(this.user))
        this.loading = false
        return true
      }

      this.loading = false
      return false
    },

    async register(username: string, email: string, password: string): Promise<boolean> {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simula registro bem-sucedido
      this.user = { username, email, role: 'CUSTOMER' }
      this.token = 'fake-jwt-token-' + Date.now()
      this.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(this.user))

      this.loading = false
      return true
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
    },

    // Restaura sessão ao recarregar a página
    restoreSession() {
      const raw = localStorage.getItem('user')
      if (raw) {
        this.user = JSON.parse(raw)
        this.isAuthenticated = true
        this.token = 'restored-token'
      }
    }
  }
})