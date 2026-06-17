<template>
  <div class="product-detail px-4 sm:px-8">

    <RouterLink to="/" class="back-link">← Voltar para produtos</RouterLink>

    <div class="detail-card">
      <span class="category-tag">{{ product.category.title }}</span>
      <h1 class="detail-name">{{ product.name }}</h1>
      <p class="detail-price">R$ {{ product.price.toFixed(2) }}</p>
      <p class="detail-desc">Produto de alta qualidade, ideal para quem busca desempenho e durabilidade no dia a dia.</p>

      <Button
        label="Adicionar ao carrinho"
        icon="pi pi-shopping-cart"
        class="add-btn"
        @click="addToCart"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from 'primevue/button'
import type { Product } from '../models/Product'

export default defineComponent({
  components: { Button },

  data() {
    return {
      products: [
        { id: 1, name: 'Mouse Gamer Pro',     price: 120,  category: { id: 1, title: 'Periféricos' } },
        { id: 2, name: 'Teclado Mecânico RGB', price: 350,  category: { id: 1, title: 'Periféricos' } },
        { id: 3, name: 'Monitor 144Hz',        price: 1200, category: { id: 2, title: 'Monitores'  } },
        { id: 4, name: 'Headset Surround 7.1', price: 280,  category: { id: 3, title: 'Áudio'      } },
      ] as Product[]
    }
  },

  computed: {
    product(): Product {
      const id = Number(this.$route.params.id)
      return this.products.find(p => p.id === id) || this.products[0]
    }
  },

  methods: {
    addToCart() {
      this.$emit('update-cart', this.product)
    }
  }
})
</script>

<style>
.product-detail { max-width: 700px; margin: 0 auto; padding: 3rem 2rem; }
.back-link { color: var(--muted); text-decoration: none; font-size: 0.9rem; display: inline-block; margin-bottom: 2rem; transition: color 0.2s; }
.back-link:hover { color: var(--text); }
.detail-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem; }
.category-tag { background: rgba(162,89,255,0.12); border: 1px solid rgba(162,89,255,0.28); color: var(--purple); border-radius: 999px; padding: 0.2rem 0.8rem; font-size: 0.72rem; font-family: var(--font-mono); width: fit-content; }
.detail-name { font-size: 2rem; font-weight: 800; color: var(--text); }
.detail-price { font-family: var(--font-mono); font-size: 1.8rem; color: var(--blue); font-weight: 600; }
.detail-desc { color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
.add-btn { background: var(--blue) !important; border-color: var(--blue) !important; color: #0a0c14 !important; font-weight: 700 !important; border-radius: 10px !important; padding: 0.8rem 1.5rem !important; }
.add-btn:hover { opacity: 0.85 !important; }
</style>