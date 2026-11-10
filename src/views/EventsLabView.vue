<script setup>
import { onMounted, ref } from 'vue'
import CodeBlock from '../components/course/CodeBlock.vue'
import ClickExample from '../components/events/ClickExample.vue'
import InputExample from '../components/events/InputExample.vue'
import KeyboardExample from '../components/events/KeyboardExample.vue'
import SubmitExample from '../components/events/SubmitExample.vue'
import PointerExample from '../components/events/PointerExample.vue'
import ChangeExample from '../components/events/ChangeExample.vue'
import DialogExample from '../components/events/DialogExample.vue'
import AsyncExample from '../components/events/AsyncExample.vue'
// O código exibido é lido dos próprios arquivos: exemplo e explicação não divergem.
import clickSource from '../components/events/ClickExample.vue?raw'
import inputSource from '../components/events/InputExample.vue?raw'
import keyboardSource from '../components/events/KeyboardExample.vue?raw'
import submitSource from '../components/events/SubmitExample.vue?raw'
import pointerSource from '../components/events/PointerExample.vue?raw'
import changeSource from '../components/events/ChangeExample.vue?raw'
import dialogSource from '../components/events/DialogExample.vue?raw'
import confirmSource from '../components/events/ConfirmActionDialog.vue?raw'
import asyncSource from '../components/events/AsyncExample.vue?raw'

const heading = ref(null)
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  heading.value?.focus({ preventScroll: true })
})
const examples = [
  { title: 'Um clique, vários argumentos', event: '@click', level: 'Básico', component: ClickExample, source: clickSource,
    description: 'Incremente ou desconte pontos com uma função que recebe o tamanho da alteração.',
    challenge: 'Por que o botão +5 fica bloqueado quando o total passa de 15? A função também protege o limite?' },
  { title: 'Texto que se transforma', event: '@input', level: 'Básico', component: InputExample, source: inputSource,
    description: 'Digite um nome e veja a função normalizar acentos, espaços e caracteres especiais em tempo real.',
    challenge: 'O que cada replace remove? Como você manteria o nome original e o identificador separados?' },
  { title: 'O teclado também dispara ações', event: '@keydown.enter / .esc', level: 'Básico', component: KeyboardExample, source: keyboardSource,
    description: 'Adicione tarefas com Enter, rejeite duplicadas e limpe o campo com Escape.',
    challenge: 'Tente cadastrar “Estudar” e “estudar”. Qual função impede a duplicação? Escape apaga a lista?' },
  { title: 'Enviar sem recarregar', event: '@submit.prevent', level: 'Intermediário', component: SubmitExample, source: submitSource,
    description: 'Confirme um débito fictício com validação, conversão de números e alteração real do estado do saldo.',
    challenge: 'Teste um débito maior que o saldo. O retorno da função calcula ou altera o estado? Qual linha prova isso?' },
  { title: 'Ponteiro, foco e acessibilidade', event: '@pointerenter / @focus', level: 'Intermediário', component: PointerExample, source: pointerSource,
    description: 'Compare entrada e saída do ponteiro com foco de teclado, sem depender apenas do mouse.',
    challenge: 'Use Tab para chegar à área. Qual evento foi disparado? O que acontece quando você usa Shift + Tab?' },
  { title: 'Ordenar, calcular, preservar', event: '@change', level: 'Intermediário', component: ChangeExample, source: changeSource,
    description: 'Troque a ordenação de um carrinho local e calcule o total com sort, reduce e computed.',
    challenge: 'A quantidade deve participar do total? Por que ordenamos [...products] em vez de modificar products?' },
  { title: 'Um filho pede, o pai decide', event: '@confirm / v-model', level: 'Avançado', component: DialogExample, source: dialogSource,
    description: 'Abra um dialog, cancele ou confirme uma ação e acompanhe um evento personalizado entre componentes.',
    challenge: 'Cancele uma vez antes de confirmar. Onde acontece a alteração do rascunho: no dialog ou no pai?', extraSource: confirmSource },
  { title: 'Esperar, falhar e cancelar', event: 'async / await + @submit', level: 'Avançado', component: AsyncExample, source: asyncSource,
    description: 'Faça uma busca simulada com espera, bloqueio de duplicação, cancelamento e recuperação de falha.',
    challenge: 'Simule uma falha e depois tente de novo. Por que pending precisa voltar a false dentro de finally?' },
]
</script>

<template>
  <v-app>
    <header class="course-header lab-header">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <strong>Laboratório de eventos</strong><span>Olá, Alunos! · Vue 3 + Vuetify</span>
        </div>
      </div>
      <nav class="lab-actions" aria-label="Navegação do laboratório">
        <v-btn href="#original" variant="outlined" size="small">← Welcome</v-btn>
        <v-btn href="#aula-3-tela-1" variant="text" size="small">Aula de eventos</v-btn>
      </nav>
    </header>
    <v-main>
      <v-container class="events-lab">
        <section class="lab-intro">
          <p class="eyebrow">EXPERIMENTE · OBSERVE · EXPLIQUE</p>
          <h1 ref="heading" tabindex="-1">
            O evento acontece.<br /><span>Sua função entra em ação.</span>
          </h1>
          <p>
            Oito exemplos para explorar do clique ao código assíncrono. Interaja com cada card,
            preveja o resultado e abra o código para descobrir como ele funciona.
          </p>
          <div class="lab-tags">
            <v-chip variant="tonal" color="primary" size="small">8 exemplos funcionando</v-chip
            ><v-chip variant="outlined" size="small">Dados locais · sem API</v-chip
            ><v-chip variant="outlined" size="small">Código comentado e colorido</v-chip>
          </div>
        </section>
        <v-row class="lab-grid">
          <v-col v-for="(example, index) in examples" :key="example.title" cols="12" md="6">
            <v-card class="event-card" rounded="xl" elevation="0" border>
              <div class="event-card-heading">
                <span class="event-number">{{ String(index + 1).padStart(2, '0') }}</span
                ><v-chip
                  size="small"
                  variant="tonal"
                  :color="example.level === 'Avançado' ? 'primary' : undefined"
                  >{{ example.level }}</v-chip
                >
              </div>
              <p class="event-signature">{{ example.event }}</p>
              <h2>{{ example.title }}</h2>
              <p class="event-description">{{ example.description }}</p>
              <div class="event-playground"><component :is="example.component" /></div>
              <div class="event-explanation">
                <strong>Investigue</strong>
                <p>{{ example.challenge }}</p>
              </div>
              <details class="event-source">
                <summary>Ver código comentado <span aria-hidden="true">&lt;/&gt;</span></summary>
                <CodeBlock
                  :code="example.source"
                  language="vue"
                  caption="CÓDIGO REAL DESTE EXEMPLO"
                />
                <template v-if="example.extraSource">
                  <h3>O componente filho: ConfirmActionDialog.vue</h3>
                  <CodeBlock
                    :code="example.extraSource"
                    language="vue"
                    caption="EVENTO PERSONALIZADO NO FILHO"
                  />
                </template>
              </details>
            </v-card>
          </v-col>
        </v-row>
        <footer class="lab-footer">
          Cada exemplo tem seu próprio estado. Ao sair desta tela, os dados são reiniciados. Os
          cálculos e a busca são apenas demonstrações locais.
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>
