<script setup>
import { ref } from 'vue'

const balance = ref(100)
const amount = ref(25)
const feedback = ref('Saldo inicial de R$ 100,00. Operação apenas demonstrativa.')
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Trabalhar em centavos evita erros simples de arredondamento do exercício.
function pay() {
  const cents = Math.round(Number(amount.value) * 100)
  const balanceCents = Math.round(balance.value * 100)
  if (!Number.isFinite(cents) || cents <= 0 || cents > balanceCents) {
    feedback.value = 'Informe um valor positivo que caiba no saldo.'
    return
  }
  balance.value = (balanceCents - cents) / 100
  feedback.value = `Débito de ${money(cents / 100)} confirmado. O estado do saldo foi alterado.`
}
</script>

<template>
  <p class="lab-number">{{ money(balance) }}</p>
  <!-- .prevent impede o envio convencional e a recarga da página. -->
  <form class="lab-form" @submit.prevent="pay">
    <label class="lab-label"
      >Valor do débito (R$)
      <input
        v-model.number="amount"
        class="lab-input"
        type="number"
        min="0.01"
        step="0.01"
        required
      />
    </label>
    <v-btn color="primary" type="submit">Confirmar débito</v-btn>
  </form>
  <p class="lab-feedback" role="status">{{ feedback }}</p>
</template>
