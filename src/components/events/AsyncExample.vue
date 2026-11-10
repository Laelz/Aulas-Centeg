<script setup>
import { onUnmounted, ref } from 'vue'

const query = ref('vue')
const pending = ref(false)
const simulateError = ref(false)
const results = ref([])
const feedback = ref('Busca simulada, com 1 segundo de espera. Não há API.')
const topics = ['Vue e reatividade', 'Eventos do Vue', 'Funções JavaScript', 'Grid do Vuetify']
let controller

function wait(signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, 1000)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new Error('cancelled'))
    }, { once: true })
  })
}

async function search() {
  if (pending.value) return // Impede pesquisas simultâneas.
  const text = query.value.trim().toLocaleLowerCase('pt-BR')
  if (text.length < 2) { feedback.value = 'Digite ao menos 2 caracteres.'; return }
  const shouldFail = simulateError.value // Captura a escolha desta tentativa.
  pending.value = true
  results.value = []
  feedback.value = 'Buscando nos dados locais…'
  controller = new AbortController()
  try {
    await wait(controller.signal)
    if (shouldFail) throw new Error('simulated')
    results.value = topics.filter(topic => topic.toLocaleLowerCase('pt-BR').includes(text))
    feedback.value = results.value.length ? `${results.value.length} resultado(s).` : 'Nenhum resultado.'
  } catch (error) {
    feedback.value = error.message === 'cancelled' ? 'Busca cancelada.' : 'Falha simulada. Desmarque a opção e tente novamente.'
  } finally {
    pending.value = false // Libera o botão tanto no sucesso quanto na falha.
  }
}
function cancel() { controller?.abort() }
onUnmounted(cancel) // Evita deixar o temporizador ativo ao sair da tela.
</script>

<template>
  <form class="lab-form" :aria-busy="pending" @submit.prevent="search">
    <label class="lab-label"
      >Pesquisar assunto
      <input
        v-model="query"
        class="lab-input"
        minlength="2"
        maxlength="50"
        required
        :disabled="pending"
      />
    </label>
    <label class="lab-checkbox"
      ><input v-model="simulateError" type="checkbox" :disabled="pending" /> Simular falha</label
    >
    <div class="lab-actions">
      <v-btn color="primary" type="submit" :loading="pending" :disabled="pending">Pesquisar</v-btn>
      <v-btn variant="text" :disabled="!pending" @click="cancel">Cancelar</v-btn>
    </div>
  </form>
  <ul class="lab-list">
    <li v-for="topic in results" :key="topic">{{ topic }}</li>
  </ul>
  <p class="lab-feedback" role="status">{{ feedback }}</p>
</template>
