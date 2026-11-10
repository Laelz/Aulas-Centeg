<script setup>
import { ref } from 'vue'

const hovered = ref(false)
const focused = ref(false)
const entries = ref(0)
const feedback = ref('Passe o ponteiro, use Tab ou toque no botão.')

function enter() {
  hovered.value = true
  entries.value += 1
  feedback.value = 'pointerenter: o ponteiro entrou no botão.'
}
function leave() {
  hovered.value = false
  feedback.value = 'pointerleave: o ponteiro saiu do botão.'
}
function focus() {
  focused.value = true
  feedback.value = 'focus: o botão recebeu foco. Experimente Tab e Shift + Tab.'
}
function blur() {
  focused.value = false
  feedback.value = 'blur: o botão perdeu o foco.'
}
</script>

<template>
  <!-- Botão nativo: acessível por teclado e por toque, além do mouse. -->
  <button
    class="lab-pointer"
    :class="{ 'is-active': hovered || focused }"
    @pointerenter="enter"
    @pointerleave="leave"
    @focus="focus"
    @blur="blur"
    @click="feedback = 'click: botão ativado com mouse, teclado ou toque.'"
  >
    {{ hovered || focused ? 'Estou ativo!' : 'Explore esta área' }}
  </button>
  <p class="lab-helper">
    Entradas do ponteiro: {{ entries }} · Com foco: {{ focused ? 'sim' : 'não' }}
  </p>
  <p class="lab-feedback" role="status">{{ feedback }}</p>
</template>
