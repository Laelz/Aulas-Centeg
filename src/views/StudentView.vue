<script setup>
// import { ref } from 'vue'
import { ref } from 'vue'
import AlunoCard from '../components/aluno/AlunoCard.vue';

const nome = ref('');
const idade = ref();
const id = ref(1);

const alunos = ref([]);

function adicionar() {
  alunos.value.push(
    {
      id: id.value++,
      nome: nome.value,
      idade: idade.value,
    }
  )

  nome.value = ''
  idade.value = null
}

function deletarItem(id) {

  const alunoRemovido = alunos.value.findIndex(item => item.id === id);

  alunos.value.splice(alunoRemovido, 1);

  alert("Aluno removido com sucesso");
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
              <v-card-actions class="">
                <v-btn @click="adicionar()"> Adicionar</v-btn>
                <v-btn> Limpar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-for="aluno in alunos" cols="4">
            <AlunoCard :aluno="aluno" @remover="deletarItem($event)" />
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
