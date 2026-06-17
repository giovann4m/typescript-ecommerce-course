<template>
  <div class="login-page">
    <Toast />

    <div class="login-card">
      <div class="login-logo">
        <span>⚡</span>
        <span>Zen<span class="logo-accent">tech</span></span>
      </div>

      <!-- Abas -->
      <div class="tabs">
        <button :class="['tab-btn', { active: tab === 'login' }]" @click="tab = 'login'">Entrar</button>
        <button :class="['tab-btn', { active: tab === 'register' }]" @click="tab = 'register'">Criar conta</button>
      </div>

      <!-- Formulário de Login -->
      <div v-if="tab === 'login'" class="login-form">
        <div class="field">
          <label>E-mail</label>
          <InputText
            v-model="loginForm.email"
            placeholder="seu@email.com"
            :class="['input-field', { 'input-error': v_login.email.$error }]"
            @blur="v_login.email.$touch()"
          />
          <span v-if="v_login.email.$error" class="error-msg">
            {{ v_login.email.email.$invalid ? 'E-mail inválido.' : 'E-mail obrigatório.' }}
          </span>
        </div>

        <div class="field">
          <label>Senha</label>
          <Password
            v-model="loginForm.password"
            placeholder="Sua senha"
            :feedback="false"
            toggleMask
            :class="['input-field', { 'input-error': v_login.password.$error }]"
            @blur="v_login.password.$touch()"
          />
          <span v-if="v_login.password.$error" class="error-msg">Senha obrigatória.</span>
        </div>

        <p class="login-hint">
          Use <strong>admin@zentech.com / admin123</strong> para admin.<br>
          Use <strong>user@zentech.com / user123</strong> para cliente.
        </p>

        <Button
          label="Entrar"
          icon="pi pi-sign-in"
          class="login-btn"
          :loading="authStore.loading"
          @click="handleLogin"
        />
      </div>

      <!-- Formulário de Registro -->
      <div v-if="tab === 'register'" class="login-form">
        <div class="field">
          <label>Nome</label>
          <InputText
            v-model="registerForm.username"
            placeholder="Seu nome"
            :class="['input-field', { 'input-error': v_register.username.$error }]"
            @blur="v_register.username.$touch()"
          />
          <span v-if="v_register.username.$error" class="error-msg">Nome obrigatório.</span>
        </div>

        <div class="field">
          <label>E-mail</label>
          <InputText
            v-model="registerForm.email"
            placeholder="seu@email.com"
            :class="['input-field', { 'input-error': v_register.email.$error }]"
            @blur="v_register.email.$touch()"
          />
          <span v-if="v_register.email.$error" class="error-msg">
            {{ v_register.email.email.$invalid ? 'E-mail inválido.' : 'E-mail obrigatório.' }}
          </span>
        </div>

        <div class="field">
          <label>Senha</label>
          <Password
            v-model="registerForm.password"
            placeholder="Mínimo 6 caracteres"
            :feedback="false"
            toggleMask
            :class="['input-field', { 'input-error': v_register.password.$error }]"
            @blur="v_register.password.$touch()"
          />
          <span v-if="v_register.password.$error" class="error-msg">
            {{ v_register.password.minLength.$invalid ? 'Mínimo de 6 caracteres.' : 'Senha obrigatória.' }}
          </span>
        </div>

        <div class="field">
          <label>Confirmar senha</label>
          <Password
            v-model="registerForm.confirmPassword"
            placeholder="Repita a senha"
            :feedback="false"
            toggleMask
            :class="['input-field', { 'input-error': v_register.confirmPassword.$error }]"
            @blur="v_register.confirmPassword.$touch()"
          />
          <span v-if="v_register.confirmPassword.$error" class="error-msg">As senhas não coincidem.</span>
        </div>

        <Button
          label="Criar conta"
          icon="pi pi-user-plus"
          class="login-btn"
          :loading="authStore.loading"
          @click="handleRegister"
        />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

export default defineComponent({
  components: { InputText, Password, Button, Toast },

  setup() {
    const router   = useRouter()
    const toast    = useToast()
    const authStore = useAuthStore()
    const tab      = ref<'login' | 'register'>('login')

    // --- Login ---
    const loginForm = reactive({ email: '', password: '' })
    const loginRules = {
      email:    { required, email },
      password: { required }
    }
    const v_login = useVuelidate(loginRules, loginForm)

    async function handleLogin() {
      await v_login.value.$validate()
      if (v_login.value.$invalid) return

      const ok = await authStore.login(loginForm.email, loginForm.password)
      if (ok) {
        toast.add({ severity: 'success', summary: 'Login realizado!', detail: `Bem-vindo, ${authStore.user?.username}!`, life: 3000 })
        setTimeout(() => {
          authStore.user?.role === 'ADMIN' ? router.push('/admin') : router.push('/')
        }, 500)
      } else {
        toast.add({ severity: 'error', summary: 'Erro', detail: 'Credenciais inválidas.', life: 3000 })
      }
    }

    // --- Registro ---
    const registerForm = reactive({ username: '', email: '', password: '', confirmPassword: '' })
    const registerRules = {
      username:        { required },
      email:           { required, email },
      password:        { required, minLength: minLength(6) },
      confirmPassword: { required, sameAs: sameAs(() => registerForm.password) }
    }
    const v_register = useVuelidate(registerRules, registerForm)

    async function handleRegister() {
      await v_register.value.$validate()
      if (v_register.value.$invalid) return

      const ok = await authStore.register(registerForm.username, registerForm.email, registerForm.password)
      if (ok) {
        toast.add({ severity: 'success', summary: 'Conta criada!', detail: `Bem-vindo, ${registerForm.username}!`, life: 3000 })
        setTimeout(() => router.push('/'), 500)
      }
    }

    return { tab, loginForm, registerForm, v_login, v_register, handleLogin, handleRegister, authStore }
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
  max-width: 420px;
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
.tabs { display: flex; gap: 0.5rem; }
.tab-btn {
  flex: 1; padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  font-family: var(--font-head);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn.active {
  background: rgba(79,143,255,0.1);
  border-color: var(--blue);
  color: var(--blue);
}
.login-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; }
.field label { font-size: 0.85rem; color: var(--muted); }
.input-field { width: 100% !important; background: var(--bg3) !important; border-color: var(--border) !important; color: var(--text) !important; border-radius: 8px !important; }
.input-error { border-color: #f87171 !important; }
.error-msg { color: #f87171; font-size: 0.78rem; }
.login-hint { font-size: 0.78rem; color: var(--muted); line-height: 1.6; }
.login-hint strong { color: var(--blue); }
.login-btn { width: 100% !important; background: var(--blue) !important; border-color: var(--blue) !important; color: #0a0c14 !important; font-weight: 700 !important; border-radius: 10px !important; }
.login-btn:hover { opacity: 0.85 !important; }
</style>