<template>
  <div class="login-page">
    <div class="login-card">

      <div class="login-logo">
        <span>⚡</span>
        <span>Zen<span class="logo-accent">tech</span></span>
      </div>

      <h2 class="login-title">Entrar na conta</h2>

      <div class="login-form">
        <div class="field">
          <label>Usuário</label>
          <InputText v-model="username" placeholder="Digite seu usuário" class="input-field" />
        </div>
        <div class="field">
          <label>Senha</label>
          <InputText v-model="password" type="password" placeholder="Digite sua senha" class="input-field" />
        </div>
        <p class="login-hint">Use <strong>admin / admin</strong> para acessar o painel admin.<br>Use <strong>user / user</strong> para acessar como cliente.</p>
        <Button label="Entrar" icon="pi pi-sign-in" class="login-btn" @click="login" />
        <p v-if="error" class="login-error">{{ error }}</p>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default defineComponent({
  components: { InputText, Button },

  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },

  methods: {
    login() {
      if (this.username === 'admin' && this.password === 'admin') {
        localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'ADMIN' }))
        this.$router.push('/admin')
      } else if (this.username === 'user' && this.password === 'user') {
        localStorage.setItem('user', JSON.stringify({ username: 'user', role: 'CUSTOMER' }))
        this.$router.push('/carrinho')
      } else {
        this.error = 'Usuário ou senha incorretos.'
      }
    }
  }
})
</script>

<style>
.login-page {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-head);
}
.login-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.login-logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
}
.logo-accent { color: var(--blue); }
.login-title { font-size: 1.2rem; font-weight: 700; color: var(--text); }
.login-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.85rem; color: var(--muted); }
.input-field { width: 100% !important; background: var(--bg3) !important; border-color: var(--border) !important; color: var(--text) !important; border-radius: 8px !important; }
.login-hint { font-size: 0.8rem; color: var(--muted); line-height: 1.6; }
.login-hint strong { color: var(--blue); }
.login-btn { width: 100% !important; background: var(--blue) !important; border-color: var(--blue) !important; color: #0a0c14 !important; font-weight: 700 !important; border-radius: 10px !important; }
.login-btn:hover { opacity: 0.85 !important; }
.login-error { color: #f87171; font-size: 0.85rem; text-align: center; }
</style>