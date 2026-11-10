<script setup>
import { computed, ref } from 'vue'

const order = ref('name')
const products = [
  { id: 1, name: 'Caderno', price: 24, quantity: 2 },
  { id: 2, name: 'Caneta', price: 5, quantity: 3 },
  { id: 3, name: 'Mochila', price: 120, quantity: 1 },
]
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function changeOrder(event) {
  order.value = event.target.value
}
const sorted = computed(() => [...products].sort((a, b) => {
  // Ordenamos uma cópia para preservar o array original.
  if (order.value === 'price') return a.price - b.price
  return a.name.localeCompare(b.name, 'pt-BR')
}))
const total = computed(() => products.reduce((sum, item) => sum + item.price * item.quantity, 0))
</script>

<template>
  <label class="lab-label"
    >Ordenar os produtos
    <select class="lab-input" :value="order" @change="changeOrder">
      <option value="name">Nome (A–Z)</option>
      <option value="price">Preço unitário (menor primeiro)</option>
    </select>
  </label>
  <ul class="lab-products">
    <li v-for="product in sorted" :key="product.id">
      <span>{{ product.quantity }} × {{ product.name }}</span
      ><strong>{{ money(product.price) }} / un.</strong>
    </li>
  </ul>
  <p class="lab-result" role="status">
    Total: <strong>{{ money(total) }}</strong>
  </p>
  <p class="lab-helper">
    sort, localeCompare, reduce e computed. O total não muda com a ordenação.
  </p>
</template>
