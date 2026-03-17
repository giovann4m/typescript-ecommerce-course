<template>

  <div>

    <h1>E-commerce</h1>

    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-product="addToCart"
    />

    <hr>

    <h2>Carrinho</h2>

    <p>Total de itens: {{ totalItems }}</p>
    <p>Preço final: R$ {{ finalPrice }}</p>

    <h3>Itens no carrinho</h3>

    <table v-if="cartItems.length > 0">

      <tr>
        <th>Produto</th>
        <th>Quantidade</th>
      </tr>

      <tr v-for="item in cartItems" :key="item.product.id">
        <td>{{ item.product.name }}</td>
        <td>{{ item.quantity }}</td>
      </tr>

    </table>

    <p v-else>Seu carrinho está vazio.</p>

  </div>

</template>

<script lang="ts">

import { defineComponent } from "vue"
import ProductCard from "./components/ProductCard.vue"

import type { Product } from "./models/Product"
import type { CartItem } from "./models/CartItem"

export default defineComponent({

  components: {
    ProductCard
  },

  data() {
    return {

      products: [
        {
          id: 1,
          name: "Mouse Gamer",
          price: 120,
          category: { id: 1, title: "Periféricos" }
        },
        {
          id: 2,
          name: "Teclado Mecânico",
          price: 350,
          category: { id: 1, title: "Periféricos" }
        }
      ] as Product[],

      cartItems: [] as CartItem[]

    }
  },

  methods: {

    addToCart(product: Product) {

      const existing = this.cartItems.find(
        item => item.product.id === product.id
      )

      if (existing) {
        existing.quantity++
      } else {
        this.cartItems.push({
          product,
          quantity: 1
        })
      }

    }

  },

  computed: {

    totalItems(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )
    },

    finalPrice(): number {
      return this.cartItems.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0
      )
    }

  }

})

</script>