<template>
  <Card class="product-card">

    <template #header>
      <div class="px-4 pt-4">
        <span class="category-tag">{{ product.category.title }}</span>
      </div>
    </template>

    <template #title>
      <span class="product-name">{{ product.name }}</span>
    </template>

    <template #subtitle>
      <span class="product-price">R$ {{ product.price.toFixed(2) }}</span>
    </template>

    <template #footer>
      <Button
        label="Adicionar"
        icon="pi pi-plus"
        class="add-btn w-full"
        @click="$emit('add-product', product)"
      />
    </template>

  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { Product } from '../models/Product'

export default defineComponent({
  components: { Card, Button },

  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },

  emits: ['add-product']
})
</script>

<style scoped>
/* Encapsula o Card do PrimeVue no visual Zentech */
.product-card {
  background: #0f1120 !important;
  border: 1px solid #1e2340 !important;
  border-radius: 16px !important;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.product-card:hover {
  transform: translateY(-4px);
  border-color: #4f8fff !important;
  box-shadow: 0 8px 32px rgba(79, 143, 255, 0.15) !important;
}

.category-tag {
  background: rgba(162, 89, 255, 0.12);
  border: 1px solid rgba(162, 89, 255, 0.28);
  color: #a259ff;
  border-radius: 999px;
  padding: 0.2rem 0.8rem;
  font-size: 0.72rem;
  font-family: 'DM Mono', monospace;
}

.product-name {
  font-family: 'Syne', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #e8eaf6;
}

.product-price {
  font-family: 'DM Mono', monospace;
  font-size: 1.2rem;
  font-weight: 500;
  color: #4f8fff;
}

/* Sobrescreve o Button do PrimeVue com estilo Zentech */
.add-btn {
  background: transparent !important;
  border: 1px solid #4f8fff !important;
  color: #4f8fff !important;
  border-radius: 10px !important;
  font-family: 'Syne', sans-serif !important;
  font-weight: 600 !important;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s !important;
}
.add-btn:hover {
  background: #4f8fff !important;
  color: #0a0c14 !important;
  box-shadow: 0 0 16px rgba(79, 143, 255, 0.35) !important;
}
</style>
