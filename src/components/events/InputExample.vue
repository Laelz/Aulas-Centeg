<script setup>
import { ref } from 'vue'

const name = ref('')
const slug = ref('')
const remaining = ref(40)

// O evento nativo oferece o elemento digitado em event.target.
function updateName(event) {
  name.value = event.target.value.slice(0, 40)
  remaining.value = 40 - name.value.length
  // Encadeamento de funções: normalizar, remover acentos e gerar uma URL.
  slug.value = name.value.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
</script>

<template>
  <label class="lab-label"
    >Nome do seu projeto
    <input
      class="lab-input"
      :value="name"
      maxlength="40"
      placeholder="Ex.: Minha aplicação Vue"
      @input="updateName"
    />
  </label>
  <p class="lab-helper">{{ remaining }} caracteres disponíveis</p>
  <p class="lab-result" role="status">
    /projetos/<strong>{{ slug || 'seu-projeto' }}</strong>
  </p>
  <p class="lab-helper">Acentos e espaços viram um identificador: “Olá, Turma!” → ola-turma.</p>
</template>
