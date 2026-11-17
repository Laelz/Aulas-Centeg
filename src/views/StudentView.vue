<script setup>
// import { ref } from 'vue'
import { ref } from 'vue'

const nome = ref('');
const idade = ref();

const alunos = ref([]);

function adicionar() {
  alunos.value.push(
    {
      nome: nome.value,
      idade: idade.value,
    }
  )

  nome.value = ''
  idade.value = null
}
</script>

<template>
  <v-app>
    <!-- Navegação pronta. Construa seu projeto na área de conteúdo abaixo. -->
    <v-app-bar color="surface" flat border="b">
      <v-container class="d-flex align-center ga-3 py-0">
        <h1 class="student-title">Área livre</h1>
        <v-spacer />
        <v-btn href="#original" variant="outlined" rounded="lg" size="small">
          ← Voltar ao Welcome
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="student-main" aria-label="Área de criação do aluno">
      <v-container class="py-8">
        <v-row>
          <v-col cols="12">
            <v-card class="pa-6" title="Formulário de Alunos">
              <v-text-field v-model="nome" label="Nome"></v-text-field>
              <v-text-field v-model="idade" label="Idade"></v-text-field>
              <v-bottom-sheet class="">
                <v-btn @click="adicionar()"> Adcionar</v-btn>
                <v-btn> Limpar</v-btn>
              </v-bottom-sheet>
            </v-card>
          </v-col>
          <v-col v-for="aluno in alunos" cols="4">
            <v-card class="pa-6">
              <v-card-title>Nome: {{ aluno.nome }}</v-card-title>
              <v-card-text>Idade: {{ aluno.idade }} anos </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Estilos da sua criação: adicione classes aqui. */
.student-title {
  font-size: 1rem;
  font-weight: 700;
}

.student-main {
  background: #fff;
}
</style>
