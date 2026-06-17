<template>
  <div>

    <!-- Hero -->
    <section class="hero px-4 sm:px-8">
      <p class="hero-tag">Tecnologia de ponta</p>
      <h1 class="hero-title">Os melhores produtos<br>
        <span class="hero-accent">para o seu setup</span>
      </h1>
      <p class="hero-sub">Qualidade, desempenho e estilo em cada detalhe.</p>
    </section>

    <!-- Produtos -->
    <main class="products-section px-4 sm:px-8">
      <h2 class="section-title">Produtos</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-product="addToCart"
        />
      </div>
    </main>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../models/Product'
import type { CartItem } from '../models/CartItem'

export default defineComponent({
  components: { ProductCard },

  data() {
    return {
      products: [
        { id: 1, name: 'Mouse Gamer Pro',      price: 120,  category: { id: 1, title: 'Periféricos' } },
        { id: 2, name: 'Teclado Mecânico RGB',  price: 350,  category: { id: 1, title: 'Periféricos' } },
        { id: 3, name: 'Monitor 144Hz',         price: 1200, category: { id: 2, title: 'Monitores'  } },
        { id: 4, name: 'Headset Surround 7.1',  price: 280,  category: { id: 3, title: 'Áudio'      } },
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
      this.$emit('update-cart', this.totalItems)
    }
  },

  computed: {
    totalItems(): number {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0)
    }
  }
})
</script>

<style>
.hero { max-width: 1100px; margin: 0 auto; padding: 5rem 2rem 3rem; }
.hero-tag { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.2em; color: var(--blue); text-transform: uppercase; margin-bottom: 1rem; }
.hero-title { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.1; margin-bottom: 1rem; }
.hero-accent { color: var(--blue); }
.hero-sub { font-size: 1.05rem; color: var(--muted); }
.products-section { max-width: 1100px; margin: 0 auto; padding: 2rem 2rem 4rem; }
</style>