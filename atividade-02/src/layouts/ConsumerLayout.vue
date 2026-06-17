<template>
  <div class="app">

    <!-- Header fixo -->
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">Zen<span class="logo-accent">tech</span></span>
        </div>

        <!-- Navegação com RouterLink -->
        <nav class="nav">
          <RouterLink to="/" class="nav-link">Produtos</RouterLink>
          <RouterLink to="/login" class="nav-link">Entrar</RouterLink>
          <RouterLink to="/carrinho" class="nav-link cart-link">
            🛒
            <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Conteúdo da página atual -->
    <RouterView @update-cart="updateCart" />

    <!-- Footer -->
    <footer class="footer">
      <span>⚡ Zentech © 2026 — Tecnologia para quem vai além.</span>
    </footer>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      cartCount: 0
    }
  },
  methods: {
    updateCart(count: number) {
      this.cartCount = count
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #0a0c14;
  --bg2:       #0f1120;
  --bg3:       #151829;
  --border:    #1e2340;
  --blue:      #4f8fff;
  --blue-glow: rgba(79, 143, 255, 0.18);
  --purple:    #a259ff;
  --purple-glow: rgba(162, 89, 255, 0.15);
  --text:      #e8eaf6;
  --muted:     #6b7280;
  --font-head: 'Syne', sans-serif;
  --font-mono: 'DM Mono', monospace;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-head);
  min-height: 100vh;
}

.app { display: flex; flex-direction: column; min-height: 100vh; }

.header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10, 12, 20, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  max-width: 1100px; margin: 0 auto;
  padding: 1rem 2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.logo { display: flex; align-items: center; gap: 0.5rem; }
.logo-icon { font-size: 1.4rem; }
.logo-text { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.5px; }
.logo-accent { color: var(--blue); }

.nav { display: flex; align-items: center; gap: 1.5rem; }
.nav-link {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition: color 0.2s;
}
.nav-link:hover, .nav-link.router-link-active { color: var(--text); }
.cart-link { position: relative; font-size: 1.4rem; }
.badge {
  position: absolute; top: -6px; right: -8px;
  background: var(--purple); color: #fff;
  font-size: 0.65rem; font-weight: 700;
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
}

.footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding: 1.5rem 2rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  font-family: var(--font-mono);
}

.section-title {
  font-size: 1.3rem; font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: 0.5rem;
}
.section-title::after {
  content: ''; flex: 1;
  height: 1px; background: var(--border);
}
</style>