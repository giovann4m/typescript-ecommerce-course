<template>
  <div>
    <h1 class="admin-title">Dashboard</h1>
    <p class="admin-sub">Gerencie os produtos da Zentech</p>

    <DataTable :value="products" class="admin-table" stripedRows>
      <Column field="id" header="ID" style="width: 60px" />
      <Column field="name" header="Produto" />
      <Column field="category.title" header="Categoria" />
      <Column field="price" header="Preço">
        <template #body="{ data }">
          <span class="price-cell">R$ {{ data.price.toFixed(2) }}</span>
        </template>
      </Column>
      <Column header="Ações">
        <template #body="{ data }">
          <RouterLink :to="`/produto/${data.id}`">
            <Button label="Ver" icon="pi pi-eye" size="small" text />
          </RouterLink>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import type { Product } from '../models/Product'

export default defineComponent({
  components: { DataTable, Column, Button },

  data() {
    return {
      products: [
        { id: 1, name: 'Mouse Gamer Pro',     price: 120,  category: { id: 1, title: 'Periféricos' } },
        { id: 2, name: 'Teclado Mecânico RGB', price: 350,  category: { id: 1, title: 'Periféricos' } },
        { id: 3, name: 'Monitor 144Hz',        price: 1200, category: { id: 2, title: 'Monitores'  } },
        { id: 4, name: 'Headset Surround 7.1', price: 280,  category: { id: 3, title: 'Áudio'      } },
      ] as Product[]
    }
  }
})
</script>

<style>
.admin-title { font-size: 1.8rem; font-weight: 800; color: #e8eaf6; margin-bottom: 0.4rem; }
.admin-sub { color: #6b7280; font-size: 0.95rem; margin-bottom: 2rem; }
.admin-table { background: #0f1120 !important; border: 1px solid #1e2340 !important; border-radius: 12px !important; overflow: hidden; }
.price-cell { font-family: 'DM Mono', monospace; color: #4f8fff; font-weight: 600; }
</style>