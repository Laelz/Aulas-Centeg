<script setup>
import { ref } from 'vue'

const total = ref(0)
const history = ref('Nenhuma operação ainda.')

// O mesmo handler recebe argumentos diferentes de cada botão.
function changeTotal(step) {
  const next = total.value + step
  if (next < 0 || next > 20) return
  total.value = next
  history.value = `Operação ${step > 0 ? '+' : ''}${step}. Total: ${next}.`
}
</script>

<template>
  <p class="lab-number">{{ total }} <small>/ 20 pontos</small></p>
  <div class="lab-actions">
    <v-btn :disabled="total === 0" variant="outlined" @click="changeTotal(-1)">−1</v-btn>
    <v-btn :disabled="total >= 20" color="primary" @click="changeTotal(1)">+1</v-btn>
    <v-btn :disabled="total > 15" variant="tonal" @click="changeTotal(5)">+5</v-btn>
  </div>
  <p class="lab-feedback" role="status">{{ history }}</p>
</template>
