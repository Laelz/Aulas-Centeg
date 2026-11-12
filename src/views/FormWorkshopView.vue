<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import FormStepPreview from '../components/forms/FormStepPreview.vue'
import CodeBlock from '../components/course/CodeBlock.vue'
import { studentFormWorkshop as lesson04 } from '../data/studentFormWorkshop.js'

const step = ref(1)
const state = ref({})
const codeTab = ref('script')
const heading = ref(null)
const screen = computed(() => lesson04.screens[step.value - 1])
const currentCode = computed(() => codeTab.value === 'script' ? screen.value.code : screen.value.codeExamples[0].code)
const stateCode = computed(() => JSON.stringify(state.value, null, 2))

function readStep() {
  const match = window.location.hash.match(/^#formulario-passo-([1-8])$/)
  step.value = match ? Number(match[1]) : 1
}
async function goStep(value) {
  if (value < 1 || value > 8) return
  window.location.hash = `#formulario-passo-${value}`
  step.value = value
  await nextTick()
  heading.value?.focus({ preventScroll: true })
}
onMounted(() => {
  readStep()
  window.addEventListener('hashchange', readStep)
  window.scrollTo({ top: 0, behavior: 'instant' })
})
onUnmounted(() => window.removeEventListener('hashchange', readStep))
</script>

<template>
  <v-app>
    <header class="course-header workshop-header">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <strong>Cadastro de alunos passo a passo</strong
          ><span>Aula de 12/11 · construção em conjunto</span>
        </div>
      </div>
      <nav class="d-flex ga-2 flex-wrap" aria-label="Navegação do formulário">
        <v-btn href="#original" variant="outlined" size="small">← Welcome</v-btn>
        <v-btn :href="`#aula-4-tela-${step}`" variant="text" size="small"
          >Abrir explicação da etapa</v-btn
        >
      </nav>
    </header>
    <v-main>
      <v-container class="form-workshop">
        <div class="workshop-intro">
          <p class="eyebrow mb-3">DA PRIMEIRA TAG AO CADASTRO VALIDADO</p>
          <h1>Veja o formulário ganhar vida.</h1>
          <p>
            Construa um cadastro com nome e idade. Avance pelas etapas e experimente o resultado de
            cada alteração. A demonstração é independente da Área livre dos alunos.
          </p>
          <v-btn class="mt-4" variant="outlined" color="primary" @click="goStep(8)"
            >Ver formulário completo →</v-btn
          >
        </div>
        <nav class="workshop-steps" aria-label="Passos da construção">
          <button
            v-for="(item, index) in lesson04.screens"
            :key="item.label"
            :class="{ selected: step === index + 1 }"
            :aria-current="step === index + 1 ? 'step' : undefined"
            @click="goStep(index + 1)"
          >
            <span>{{ index + 1 }}</span
            >{{ item.label.split(' · ')[1] }}
          </button>
        </nav>
        <div class="workshop-step-heading">
          <p class="eyebrow mb-2">PASSO {{ step }} DE 8</p>
          <h2 ref="heading" tabindex="-1">{{ screen.title }}</h2>
          <p>{{ screen.intro }}</p>
        </div>
        <v-row>
          <v-col cols="12" md="7">
            <section class="workshop-preview" aria-label="Demonstração interativa do passo">
              <div class="workshop-panel-label">
                <span>RESULTADO NA TELA</span><span class="workshop-live">Interativo</span>
              </div>
              <FormStepPreview :key="step" :step="step" @state-change="state = $event" />
              <p class="workshop-reset-note">
                Ao trocar de passo, o exemplo começa vazio para você testar essa versão do zero.
              </p>
            </section>
          </v-col>
          <v-col cols="12" md="5">
            <aside class="workshop-guide">
              <p class="eyebrow mb-3">EXPERIMENTE AGORA</p>
              <p>{{ screen.points.find(point => point[0] === 'Pare e confira')[1] }}</p>
              <details class="workshop-state" open>
                <summary>Estado em tempo real</summary>
                <CodeBlock :code="stateCode" language="json" caption="DADOS DESTE PASSO" />
              </details>
              <p class="workshop-state-note">
                Aqui você acompanha os valores guardados pelo Vue. Não é uma API nem um banco de
                dados.
              </p>
            </aside>
          </v-col>
        </v-row>
        <section class="workshop-code" aria-label="Código correspondente ao exercício">
          <div class="workshop-code-heading">
            <h2>Como construir este passo</h2>
            <div class="d-flex ga-2" role="group" aria-label="Escolher trecho de código">
              <v-btn
                size="small"
                :variant="codeTab === 'script' ? 'flat' : 'outlined'"
                color="primary"
                :aria-pressed="codeTab === 'script'"
                @click="codeTab = 'script'"
                >Script</v-btn
              >
              <v-btn
                size="small"
                :variant="codeTab === 'template' ? 'flat' : 'outlined'"
                color="primary"
                :aria-pressed="codeTab === 'template'"
                @click="codeTab = 'template'"
                >Template</v-btn
              >
            </div>
          </div>
          <p class="workshop-change">
            {{ screen.points.find(point => point[0] === 'O que alterar agora')[1] }}
          </p>
          <CodeBlock
            :code="currentCode"
            :language="codeTab === 'script' ? 'javascript' : 'vue'"
            :caption="`CÓDIGO ACUMULADO · PASSO ${step}`"
          />
          <p class="workshop-reset-note">
            O código é o exercício da aula. O preview usa um componente próprio para comparar as
            versões sem alterar StudentView.vue.
          </p>
        </section>
        <footer class="workshop-navigation">
          <v-btn variant="outlined" :disabled="step === 1" @click="goStep(step - 1)"
            >← Anterior</v-btn
          >
          <span>{{ step }} / 8</span>
          <v-btn color="primary" elevation="0" :disabled="step === 8" @click="goStep(step + 1)"
            >Próximo passo →</v-btn
          >
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>
