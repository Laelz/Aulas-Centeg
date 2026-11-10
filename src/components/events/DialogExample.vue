<script setup>
import { ref } from 'vue'
import ConfirmActionDialog from './ConfirmActionDialog.vue'

const dialog = ref(false)
const draft = ref('Minha ideia para a próxima aula de Vue.')
const feedback = ref('Cancelar mantém o texto. Confirmar emite um evento do filho para o pai.')

function clearDraft() {
  draft.value = ''
  feedback.value = 'Evento confirm recebido: o pai apagou seu próprio estado.'
}
</script>

<template>
  <label class="lab-label"
    >Rascunho local
    <textarea v-model="draft" class="lab-input" rows="2" maxlength="200" />
  </label>
  <v-btn color="primary" variant="tonal" :disabled="!draft" @click="dialog = true"
    >Limpar com confirmação</v-btn
  >
  <!-- v-model escuta update:modelValue; @confirm é um evento próprio. -->
  <ConfirmActionDialog v-model="dialog" @confirm="clearDraft" />
  <p class="lab-feedback" role="status">{{ feedback }}</p>
</template>
