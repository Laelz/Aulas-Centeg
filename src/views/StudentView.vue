<script setup>
// ÁREA LIVRE DO ALUNO
// 1. Importe aqui o que precisar do Vue ou de outros componentes.
// Exemplo: import { ref } from 'vue'

// 2. Declare aqui os dados da sua interface.

// 3. Escreva aqui as funções chamadas pelos eventos do template.
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
            <!-- SEU CONTEÚDO COMEÇA AQUI.
              Adicione textos, botões, campos, cartões ou outros componentes.
              Use os dados e as funções declarados no script setup.
              Para criar mais colunas, adicione v-col dentro desta v-row.
              Componentes Vuetify novos precisam de registro em plugins/vuetify.js.
            -->
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
