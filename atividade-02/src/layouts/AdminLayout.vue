<template>
  <div class="admin-app">

    <!-- Menu lateral -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <span>⚡</span>
        <span>Zen<span class="logo-accent">tech</span></span>
        <span class="admin-tag">Admin</span>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/admin" class="sidebar-link" exact-active-class="active">
          <span>📦</span> Produtos
        </RouterLink>
        <RouterLink to="/" class="sidebar-link">
          <span>🏠</span> Ver loja
        </RouterLink>
        <button class="sidebar-link logout-btn" @click="logout">
          <span>🚪</span> Sair
        </button>
      </nav>
    </aside>

    <!-- Conteúdo principal -->
    <main class="admin-main">
      <RouterView />
    </main>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
})
</script>

<style scoped>
.admin-app {
  display: flex;
  min-height: 100vh;
  background: #0a0c14;
  font-family: 'Syne', sans-serif;
}

.sidebar {
  width: 220px;
  min-height: 100vh;
  background: #0f1120;
  border-right: 1px solid #1e2340;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 2rem;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.2rem;
  font-weight: 800;
  color: #e8eaf6;
}
.logo-accent { color: #4f8fff; }
.admin-tag {
  background: rgba(162, 89, 255, 0.15);
  border: 1px solid rgba(162, 89, 255, 0.3);
  color: #a259ff;
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  font-size: 0.65rem;
  font-family: 'DM Mono', monospace;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: 'Syne', sans-serif;
}
.sidebar-link:hover { background: #151829; color: #e8eaf6; }
.sidebar-link.active { background: rgba(79,143,255,0.1); color: #4f8fff; }

.logout-btn { margin-top: auto; color: #f87171; }
.logout-btn:hover { background: rgba(248,113,113,0.1); color: #f87171; }

.admin-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>