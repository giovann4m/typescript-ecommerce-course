<template>
  <div class="app">

    <!-- Header -->
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">Zen<span class="logo-accent">tech</span></span>
        </div>
        <div class="cart-badge" @click="scrollToCart">
          <span class="cart-icon">🛒</span>
          <span class="badge" v-if="totalItems > 0">{{ totalItems }}</span>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <p class="hero-tag">Tecnologia de ponta</p>
      <h1 class="hero-title">Os melhores produtos<br><span class="hero-accent">para o seu setup</span></h1>
      <p class="hero-sub">Qualidade, desempenho e estilo em cada detalhe.</p>
    </section>

    <!-- Produtos -->
    <main class="products-section">
      <h2 class="section-title">Produtos</h2>

      <!-- Grid responsivo com Tailwind -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-product="addToCart"
        />
      </div>
    </main>

    <!-- Carrinho -->
    <section class="cart-section" ref="cartRef">
      <h2 class="section-title">🛒 Carrinho</h2>

      <!-- Totalizadores -->
      <div class="cart-summary">
        <div class="summary-card">
          <span class="summary-label">Total de itens</span>
          <span class="summary-value">{{ totalItems }}</span>
        </div>
        <div class="summary-card highlight">
          <span class="summary-label">Preço final</span>
          <span class="summary-value">R$ {{ finalPrice.toFixed(2) }}</span>
        </div>
      </div>

      <!-- DataView do PrimeVue para listar os itens -->
      <DataView
        v-if="cartItems.length > 0"
        :value="cartItems"
        class="cart-dataview"
      >
        <template #list="slotProps">
          <div class="cart-item-row" v-for="item in slotProps.items" :key="item.product.id">

            <div class="item-info">
              <span class="item-name">{{ item.product.name }}</span>
              <span class="item-category">{{ item.product.category.title }}</span>
            </div>

            <div class="item-controls">
              <!-- InputNumber do PrimeVue para alterar quantidade -->
              <InputNumber
                v-model="item.quantity"
                :min="1"
                showButtons
                buttonLayout="horizontal"
                :step="1"
                class="qty-input"
                decrementButtonClass="qty-btn"
                incrementButtonClass="qty-btn"
                decrementButtonIcon="pi pi-minus"
                incrementButtonIcon="pi pi-plus"
              />
            </div>

            <div class="item-subtotal">
              <span class="subtotal-label">Subtotal</span>
              <span class="subtotal-value">R$ {{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>

            <!-- Botão remover item com ConfirmDialog -->
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              class="remove-btn"
              @click="confirmRemove(item)"
            />

          </div>
        </template>
      </DataView>

      <!-- Empty state com Card do PrimeVue -->
      <Card v-else class="empty-card">
        <template #content>
          <div class="empty-state">
            <span class="empty-icon">🛒</span>
            <p class="empty-title">Seu carrinho está vazio</p>
            <span class="empty-sub">Adicione produtos para começar.</span>
          </div>
        </template>
      </Card>

    </section>

    <!-- ConfirmDialog do PrimeVue (desafio) -->
    <ConfirmDialog />

    <!-- Footer -->
    <footer class="footer">
      <span>⚡ Zentech © 2026 — Tecnologia para quem vai além.</span>
    </footer>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/ProductCard.vue'

import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

import type { Product } from './models/Product'
import type { CartItem } from './models/CartItem'

export default defineComponent({
  components: { ProductCard, DataView, InputNumber, Button, Card, ConfirmDialog },

  setup() {
    const confirm = useConfirm()
    return { confirm }
  },

  data() {
    return {
      products: [
        { id: 1, name: 'Mouse Gamer Pro',       price: 120,  category: { id: 1, title: 'Periféricos' } },
        { id: 2, name: 'Teclado Mecânico RGB',   price: 350,  category: { id: 1, title: 'Periféricos' } },
        { id: 3, name: 'Monitor 144Hz',          price: 1200, category: { id: 2, title: 'Monitores'  } },
        { id: 4, name: 'Headset Surround 7.1',   price: 280,  category: { id: 3, title: 'Áudio'      } },
      ] as Product[],

      cartItems: [] as CartItem[]
    }
  },

  methods: {
    addToCart(product: Product) {
      const existing = this.cartItems.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.cartItems.push({ product, quantity: 1 })
      }
    },

    confirmRemove(item: CartItem) {
      this.confirm.require({
        message: `Remover "${item.product.name}" do carrinho?`,
        header: 'Confirmar remoção',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Remover',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.cartItems = this.cartItems.filter(
            i => i.product.id !== item.product.id
          )
        }
      })
    },

    scrollToCart() {
      (this.$refs.cartRef as HTMLElement)?.scrollIntoView({ behavior: 'smooth' })
    }
  },

  computed: {
    totalItems(): number {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    finalPrice(): number {
      return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
@import 'primeicons/primeicons.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:           #0a0c14;
  --bg2:          #0f1120;
  --bg3:          #151829;
  --border:       #1e2340;
  --blue:         #4f8fff;
  --blue-glow:    rgba(79, 143, 255, 0.18);
  --purple:       #a259ff;
  --purple-glow:  rgba(162, 89, 255, 0.15);
  --text:         #e8eaf6;
  --muted:        #6b7280;
  --font-head:    'Syne', sans-serif;
  --font-mono:    'DM Mono', monospace;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-head);
  min-height: 100vh;
}

.app { display: flex; flex-direction: column; min-height: 100vh; }

/* ── Header ── */
.header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,12,20,0.85);
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
.cart-badge { position: relative; cursor: pointer; font-size: 1.4rem; padding: 0.4rem; transition: transform 0.2s; }
.cart-badge:hover { transform: scale(1.1); }
.badge {
  position: absolute; top: -4px; right: -4px;
  background: var(--purple); color: #fff;
  font-size: 0.65rem; font-weight: 700;
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono);
}

/* ── Hero ── */
.hero { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem 3rem; }
.hero-tag { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.2em; color: var(--blue); text-transform: uppercase; margin-bottom: 1rem; }
.hero-title { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.1; margin-bottom: 1rem; }
.hero-accent { color: var(--blue); }
.hero-sub { font-size: 1.05rem; color: var(--muted); }

/* ── Section title ── */
.section-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
.section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

/* ── Products ── */
.products-section { max-width: 1100px; margin: 0 auto; padding: 2rem 2rem 4rem; }

/* ── Cart ── */
.cart-section { max-width: 1100px; margin: 0 auto; padding: 2rem 2rem 4rem; }

.cart-summary { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.summary-card { flex: 1; min-width: 160px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem 1.5rem; display: flex; flex-direction: column; gap: 0.3rem; }
.summary-card.highlight { border-color: var(--blue); background: linear-gradient(135deg, var(--bg2), rgba(79,143,255,0.06)); box-shadow: 0 0 20px var(--blue-glow); }
.summary-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-family: var(--font-mono); }
.summary-value { font-size: 1.6rem; font-weight: 800; }
.summary-card.highlight .summary-value { color: var(--blue); }

/* ── DataView ── */
.cart-dataview { background: transparent !important; border: none !important; }

.cart-item-row {
  display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  margin-bottom: 0.75rem;
  transition: border-color 0.2s;
}
.cart-item-row:hover { border-color: var(--blue); }

.item-info { flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 0.3rem; }
.item-name { font-weight: 700; color: var(--text); font-family: var(--font-head); }
.item-category { font-size: 0.75rem; color: var(--purple); font-family: var(--font-mono); }

.item-controls { display: flex; align-items: center; }

/* InputNumber Zentech */
.qty-input .p-inputnumber-input {
  width: 3rem !important;
  background: var(--bg3) !important;
  border-color: var(--border) !important;
  color: var(--text) !important;
  text-align: center;
  font-family: var(--font-mono) !important;
}
.qty-btn {
  background: var(--bg3) !important;
  border-color: var(--border) !important;
  color: var(--blue) !important;
}
.qty-btn:hover {
  background: var(--blue) !important;
  color: var(--bg) !important;
}

.item-subtotal { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; min-width: 90px; }
.subtotal-label { font-size: 0.7rem; color: var(--muted); font-family: var(--font-mono); text-transform: uppercase; }
.subtotal-value { font-family: var(--font-mono); font-weight: 600; color: var(--blue); font-size: 1rem; }

.remove-btn { color: #f87171 !important; }
.remove-btn:hover { background: rgba(248,113,113,0.1) !important; }

/* ── Empty state ── */
.empty-card {
  background: var(--bg2) !important;
  border: 1px dashed var(--border) !important;
  border-radius: 14px !important;
}
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; padding: 2rem; }
.empty-icon { font-size: 2.5rem; }
.empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
.empty-sub { color: var(--muted); font-size: 0.9rem; }

/* ── Footer ── */
.footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding: 1.5rem 2rem;
  text-align: center;
  color: var(--muted);
  font-size: 0.8rem;
  font-family: var(--font-mono);
}
</style>
