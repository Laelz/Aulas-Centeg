<script setup>
import { ref } from 'vue'

const draft = ref('')
const tasks = ref([])
const feedback = ref('Use Enter para adicionar e Escape para limpar o campo.')

function addTask() {
  const title = draft.value.trim()
  if (title.length < 3) {
    feedback.value = 'Escreva pelo menos 3 caracteres.'
    return
  }
  if (tasks.value.some(task => task.toLowerCase() === title.toLowerCase())) {
    feedback.value = 'Essa tarefa já está na lista.'
    return
  }
  tasks.value.push(title)
  draft.value = ''
  feedback.value = `Adicionada: ${title}.`
}

function clearDraft() {
  draft.value = ''
  feedback.value = 'Campo limpo. As tarefas continuam na lista.'
}
</script>

<template>
  <label class="lab-label"
    >Uma tarefa para hoje
    <!-- Modificadores de teclado executam handlers em teclas específicas. -->
    <input
      v-model="draft"
      class="lab-input"
      maxlength="60"
      placeholder="Digite e pressione Enter"
      @keydown.enter.prevent="addTask"
      @keydown.esc="clearDraft"
    />
  </label>
  <div class="lab-actions">
    <v-btn size="small" color="primary" @click="addTask">Adicionar</v-btn>
    <v-btn size="small" variant="text" @click="clearDraft">Limpar campo</v-btn>
  </div>
  <ul class="lab-list">
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <p class="lab-feedback" role="status">{{ feedback }}</p>
</template>
