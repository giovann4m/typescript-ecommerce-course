<template>
  <div class="cart-section px-4 sm:px-8">

    <h2 class="section-title">🛒 Carrinho</h2>

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

    <DataView v-if="cartItems.length > 0" :value="cartItems" class="cart-dataview">
      <template #list="slotProps">
        <div class="cart-item-row" v-for="item in slotProps.items" :key="item.product.id">
          <div class="item-info">
            <span class="item-name">{{ item.product.name }}</span>
            <span class="item-category">{{ item.product.category.title }}</span>
          </div>
          <div class="item-controls">
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
          <Button icon="pi pi-trash" severity="danger" text rounded class="remove-btn" @click="removeItem(item)" />
        </div>
      </template>
    </DataView>

    <Card v-else class="empty-card">
      <template #content>
        <div class="empty-state">
          <span class="empty-icon">🛒</span>
          <p class="empty-title">Seu carrinho está vazio</p>
          <span class="empty-sub">Adicione produtos para começar.</span>
          <RouterLink to="/" class="back-link">← Ver produtos</RouterLink>
        </div>
      </template>
    </Card>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Card from 'primevue/card'
import type { CartItem } from '../models/CartItem'

export default defineComponent({
  components: { DataView, InputNumber, Button, Card },

  data() {
    return {
      cartItems: [] as CartItem[]
    }
  },

  methods: {
    removeItem(item: CartItem) {
      this.cartItems = this.cartItems.filter(i => i.product.id !== item.product.id)
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
.cart-section { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem 4rem; }
.cart-summary { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
.summary-card { flex: 1; min-width: 160px; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem 1.5rem; display: flex; flex-direction: column; gap: 0.3rem; }
.summary-card.highlight { border-color: var(--blue); background: linear-gradient(135deg, var(--bg2), rgba(79,143,255,0.06)); box-shadow: 0 0 20px var(--blue-glow); }
.summary-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; font-family: var(--font-mono); }
.summary-value { font-size: 1.6rem; font-weight: 800; }
.summary-card.highlight .summary-value { color: var(--blue); }
.cart-dataview { background: transparent !important; border: none !important; }
.cart-item-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.2rem; margin-bottom: 0.75rem; transition: border-color 0.2s; }
.cart-item-row:hover { border-color: var(--blue); }
.item-info { flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 0.3rem; }
.item-name { font-weight: 700; color: var(--text); }
.item-category { font-size: 0.75rem; color: var(--purple); font-family: var(--font-mono); }
.item-subtotal { display: flex; flex-direction: column; align-items: flex-end; gap: 0.2rem; min-width: 90px; }
.subtotal-label { font-size: 0.7rem; color: var(--muted); font-family: var(--font-mono); text-transform: uppercase; }
.subtotal-value { font-family: var(--font-mono); font-weight: 600; color: var(--blue); }
.remove-btn { color: #f87171 !important; }
.remove-btn:hover { background: rgba(248,113,113,0.1) !important; }
.empty-card { background: var(--bg2) !important; border: 1px dashed var(--border) !important; border-radius: 14px !important; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; padding: 2rem; }
.empty-icon { font-size: 2.5rem; }
.empty-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
.empty-sub { color: var(--muted); font-size: 0.9rem; }
</style>