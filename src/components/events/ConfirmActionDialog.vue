<script setup>
defineProps({ modelValue: { type: Boolean, required: true } })
const emit = defineEmits(['update:modelValue', 'confirm'])

function confirm() {
  // O filho comunica a intenção. O pai decide o que fazer com seus dados.
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="420"
    aria-labelledby="lab-confirm-title"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title id="lab-confirm-title">Limpar rascunho?</v-card-title>
      <v-card-text
        >Esta ação apaga apenas o texto deste exemplo. Cancelar preserva o conteúdo.</v-card-text
      >
      <v-card-actions class="flex-wrap">
        <v-btn variant="text" @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="primary" @click="confirm">Sim, limpar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
