<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ step: { type: Number, required: true } })
const emit = defineEmits(['state-change'])
const nome = ref('')
const idade = ref('')
const mensagem = ref('')
const alunos = ref([])
const form = ref(null)
const enviando = ref(false)
const regrasNome = [valor => {
  const texto = String(valor ?? '').trim()
  return (texto.length >= 3 && texto.length <= 80) || 'Use de 3 a 80 caracteres.'
}]
const regrasIdade = [valor => {
  const preenchido = valor !== null && valor !== undefined && String(valor).trim() !== ''
  const numero = Number(valor)
  return (preenchido && Number.isInteger(numero) && numero >= 0 && numero <= 120)
    || 'Informe uma idade inteira entre 0 e 120.'
}]

// O preview ativa somente os recursos que já existem no passo escolhido.
async function enviar() {
  if (props.step < 6) {
    mensagem.value = `Recebido: ${nome.value} — ${idade.value} anos`
    return
  }
  if (enviando.value) return
  enviando.value = true
  try {
    const { valid } = await form.value.validate()
    if (!valid) return
    const texto = nome.value.trim()
    if (props.step >= 7) {
      alunos.value.push({ id: crypto.randomUUID(), nome: texto, idade: Number(idade.value) })
      mensagem.value = `Aluno adicionado: ${texto} — ${idade.value} anos`
    } else {
      mensagem.value = `Formulário válido: ${texto} — ${idade.value} anos`
    }
    nome.value = ''
    idade.value = ''
    form.value.resetValidation()
  } catch {
    mensagem.value = 'Não foi possível enviar. Tente novamente.'
  } finally {
    enviando.value = false
  }
}
function limpar() {
  if (enviando.value) return
  nome.value = ''
  idade.value = ''
  mensagem.value = ''
  if (props.step >= 6) form.value.resetValidation()
}
function remover(id) {
  const item = alunos.value.find(aluno => aluno.id === id)
  if (!item) return
  alunos.value = alunos.value.filter(aluno => aluno.id !== id)
  mensagem.value = 'Removido: ' + item.nome
}

// Instrumentação didática: mostra apenas os dados introduzidos em cada passo.
const state = computed(() => ({
  ...(props.step >= 2 ? { nome: nome.value, idade: idade.value } : {}),
  ...(props.step >= 4 ? { mensagem: mensagem.value } : {}),
  ...(props.step >= 6 ? { enviando: enviando.value } : {}),
  ...(props.step >= 7 ? { alunos: alunos.value.map(item => ({ ...item })) } : {}),
}))
watch(state, value => emit('state-change', value), { immediate: true })
</script>

<template>
  <v-card class="pa-6" rounded="lg" elevation="0" border>
    <h2 class="text-h5 mb-4">Cadastro de alunos</h2>
    <template v-if="step >= 2 && step < 4">
      <v-text-field v-model="nome" label="Nome do aluno" variant="outlined" />
      <v-text-field
        v-model="idade"
        label="Idade"
        type="number"
        min="0"
        max="120"
        step="1"
        variant="outlined"
      />
      <p class="mb-4">
        Prévia: {{ nome || 'Digite o nome' }} —
        {{ idade === '' ? 'Informe a idade' : idade + ' anos' }}
      </p>
      <v-btn v-if="step === 3" type="button" variant="outlined" @click="limpar">Limpar</v-btn>
    </template>
    <template v-if="step >= 4">
      <v-form ref="form" @submit.prevent="enviar">
        <v-text-field
          v-model="nome"
          label="Nome do aluno"
          variant="outlined"
          :rules="step >= 5 ? regrasNome : []"
          :counter="step >= 5 ? 80 : undefined"
          :readonly="enviando"
        />
        <v-text-field
          v-model="idade"
          label="Idade"
          type="number"
          min="0"
          max="120"
          step="1"
          variant="outlined"
          :rules="step >= 5 ? regrasIdade : []"
          :readonly="enviando"
        />
        <div class="d-flex ga-2 flex-wrap">
          <v-btn
            type="submit"
            color="primary"
            :disabled="enviando"
            >{{ step >= 7 ? 'Adicionar' : 'Enviar' }}</v-btn
          >
          <v-btn type="button" variant="outlined" :disabled="enviando" @click="limpar"
            >Limpar</v-btn
          >
        </div>
      </v-form>
      <p class="mt-4" role="status" aria-live="polite">{{ mensagem }}</p>
    </template>
  </v-card>
  <section v-if="step >= 7" class="mt-6" aria-label="Alunos cadastrados">
    <p v-if="alunos.length === 0">Nenhum aluno cadastrado.</p>
    <div v-else>
      <p class="mb-3">Total: {{ alunos.length }}</p>
      <v-card v-for="aluno in alunos" :key="aluno.id" class="pa-4 mb-3" border>
        <h3 class="text-h6 form-objective-title">{{ aluno.nome }}</h3>
        <p>Idade: {{ aluno.idade }} anos</p>
        <v-btn
          v-if="step === 8"
          type="button"
          variant="text"
          @click="remover(aluno.id)"
          :aria-label="'Remover aluno: ' + aluno.nome"
          >Remover</v-btn
        >
      </v-card>
    </div>
  </section>
</template>
