<script setup>
import { ref } from 'vue'

const props = defineProps({
  aluno: { type: Object, required: true },
})
const emit = defineEmits(['remover']);
function remover(id) {
  emit('remover', id);
}
</script>

<template>
  <v-card class="pa-6">
    <v-card-title>Nome: {{ props.aluno.nome }}</v-card-title>
    <v-card-text>Idade: {{ props.aluno.idade }} anos </v-card-text>
    <v-card-actions><v-btn @click="remover(props.aluno.id)">Excluir</v-btn></v-card-actions>
  </v-card>
</template>

<style scoped></style>
