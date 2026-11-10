<script setup>
import { ref } from 'vue'

const greetings = ref(0)
const perfil = ref('Gustavo')
const telefone = ref('81 9999-9999')
const condicao = ref(false)

const saldo = ref(1000);
const debito = ref(0);

function aula(num1, num2) {
  const soma = greetings.value + num2 + num1;

  return "A soma é :  " + soma
}

function pagar() {
  let valor =  saldo.value - debito.value;

  return valor;
}
</script>

<template>
  <v-app>
    <v-app-bar flat border="b" color="background">
      <v-container class="d-flex align-center ga-3 py-0">
        <v-avatar color="primary" rounded="lg" size="36">A</v-avatar>
        <span class="font-weight-bold">Sala de aula</span>
        <v-spacer />
        <v-chip variant="tonal" color="primary" size="small">Aprender é o começo</v-chip>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="welcome-container">
        <v-row align="center" class="hero" no-gutters>
          <v-col cols="12" md="7" class="pr-md-12">
            <p class="eyebrow mb-5">UM NOVO COMEÇO</p>
            <h1 class="hero-title mb-6">Olá, <span>Alunos!</span></h1>
            <p class="intro mb-8">
              Grandes ideias começam com um primeiro passo. Vamos aprender, experimentar e construir
              juntos?
            </p>
            <v-btn color="primary" size="x-large" rounded="lg" elevation="0" @click="debito++">
              {{ greetings ? 'Dizer olá de novo' : 'Dizer olá' }}
            </v-btn>
            <p class="greeting mt-4" role="status" aria-live="polite">
              {{ greetings ? `Olá! Que bom ter você aqui. Saudações enviadas: ${greetings}.` : 'Seu próximo aprendizado começa aqui.' }}
            </p>
            <p class="greeting mt-4" role="status" aria-live="polite">
              {{ pagar() }}
            </p>
            <v-btn color="blue" variant="tonal"> Carrinho </v-btn>
            <div class="mt-5">
              <v-btn href="#eventos" color="primary" variant="outlined" rounded="lg">
                Explorar laboratório de eventos →
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="5" class="mt-10 mt-md-0">
            <v-card class="lesson-card pa-8 pa-sm-10" rounded="xl" elevation="0" border>
              <div class="d-flex align-center justify-space-between mb-12">
                <v-chip color="primary" variant="tonal" size="small">PRIMEIRA AULA</v-chip>
                <span class="lesson-number">01 / 01</span>
              </div>
              <div class="code-symbol mb-6" aria-hidden="true">&lt; / &gt;</div>
              <h2 class="text-h5 font-weight-bold mb-3">Todo mundo começa com um olá.</h2>
              <p class="text-medium-emphasis mb-8">
                Um espaço para transformar curiosidade em conhecimento.
              </p>
              <v-divider class="mb-5" />
              <div class="d-flex ga-2 flex-wrap">
                <v-chip size="small" variant="outlined">Vue</v-chip>
                <v-chip size="small" variant="outlined">Vuetify</v-chip>
                <v-chip size="small" variant="outlined">Vite</v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <footer class="page-footer">Feito para aprender. Criado para compartilhar.</footer>
      </v-container>
    </v-main>
  </v-app>
</template>
