// A aula guiada reaproveita a solução comentada como referência técnica.
// Nenhum destes trechos altera a Área livre automaticamente.
import { lesson04 as reference } from './lesson04Reference.js'

const solution = reference.screens[6].code
const finalScript = solution.split('<script setup>')[1].split('</script>')[0].trim()
const base = `import { ref } from 'vue'
const titulo = ref('') // Rascunho, ainda não cadastrado.`
const message = `${base}
const mensagem = ref('')`
const rules = `const regras = [valor => {
  const texto = String(valor ?? '').trim()
  return (texto.length >= 3 && texto.length <= 80)
    || 'Use de 3 a 80 caracteres.'
}]`
const preview = `function enviar() {
  mensagem.value = 'Recebido: ' + titulo.value
}`
const clear = `function limpar() {
  titulo.value = ''
  mensagem.value = ''
}`
const finalClear = `function limpar() {
  if (enviando.value) return
  titulo.value = ''
  mensagem.value = ''
  form.value.resetValidation()
}`
const validScript = `${message}
const form = ref(null) // Referência ao componente v-form.
const enviando = ref(false)
${rules}

async function enviar() {
  if (enviando.value) return
  enviando.value = true
  try {
    const { valid } = await form.value.validate()
    if (!valid) return // Não apaga a entrada inválida.
    mensagem.value = 'Formulário válido: ' + titulo.value.trim()
    titulo.value = ''
    form.value.resetValidation()
  } catch {
    mensagem.value = 'Não foi possível enviar. Tente novamente.'
  } finally {
    enviando.value = false
  }
}

function limpar() {
  if (enviando.value) return
  titulo.value = ''
  mensagem.value = ''
  form.value.resetValidation()
}`

function templateFor(step) {
  if (step === 1)
    return `<v-card class="pa-6" rounded="lg" border>
  <h2 class="text-h5 mb-4">Meus objetivos de estudo</h2>
  <!-- Aqui construiremos o formulário juntos. -->
</v-card>`
  if (step >= 7) {
    return (
      templateFor(6).replace('>Enviar</v-btn>', '>Adicionar</v-btn>') +
      `

<section class="mt-6" aria-label="Objetivos cadastrados">
  <p v-if="objetivos.length === 0">Nenhum objetivo cadastrado.</p>
  <div v-else>
    <p class="mb-3">Total: {{ objetivos.length }}</p>
    <v-card v-for="objetivo in objetivos" :key="objetivo.id" class="pa-4 mb-3" border>
      <h3 class="text-h6">{{ objetivo.titulo }}</h3>${
        step === 8
          ? `
      <v-btn type="button" variant="text" @click="remover(objetivo.id)"
        :aria-label="'Remover objetivo: ' + objetivo.titulo">Remover</v-btn>`
          : ''
      }
    </v-card>
  </div>
</section>`
    )
  }
  return `<v-card class="pa-6" rounded="lg" border>
  <h2 class="text-h5 mb-4">Meus objetivos de estudo</h2>
${step >= 4 ? `  <v-form${step >= 6 ? ' ref="form"' : ''} @submit.prevent="enviar">\n` : ''}  <v-text-field
    v-model="titulo"
    label="Objetivo de estudo"
    variant="outlined"${step >= 5 ? '\n    :rules="regras"\n    counter="80"' : ''}${step >= 6 ? '\n    :readonly="enviando"' : ''}
  />
${step < 4 ? '  <p class="mb-4">Prévia: {{ titulo || \'Digite seu objetivo\' }}</p>\n' : ''}${
    step >= 3
      ? `  <div class="d-flex ga-2 flex-wrap">
${step >= 4 ? `    <v-btn type="submit" color="primary"${step >= 6 ? ' :disabled="enviando"' : ''}>Enviar</v-btn>\n` : ''}    <v-btn type="button" variant="outlined"${step >= 6 ? ' :disabled="enviando"' : ''} @click="limpar">Limpar</v-btn>
  </div>\n`
      : ''
  }${step >= 4 ? '  </v-form>\n  <p class="mt-4" role="status" aria-live="polite">{{ mensagem }}</p>\n' : ''}</v-card>`
}

const steps = [
  {
    label: '1 · Preparar',
    title: 'Crie o espaço do formulário na Área livre',
    intro:
      'Vamos construir junto com o professor. Primeiro o espaço visual; depois o campo, as ações, o envio e a validação. Ao final de cada etapa, pare e confira a tela antes de avançar.',
    change:
      'Na sua cópia de StudentView.vue, acrescente uma nova v-row dentro do v-container existente, com uma v-col cols="12". Coloque nela o cartão do exemplo. Preserve a barra superior, o botão de voltar e os exercícios que você já criou.',
    explain:
      'A Área livre já tem script setup, template, v-app e v-main. Não vamos criar outro componente raiz dentro dela nem duplicar esses blocos. O cartão é somente uma área visual: ainda não há campo ou envio.',
    script:
      '// Nesta etapa, não acrescente JavaScript.\n// Preserve os imports e as funções dos exercícios anteriores.',
    check:
      'Abra Welcome → Abrir área livre. O cartão Meus objetivos de estudo deve aparecer abaixo dos exercícios existentes. A navegação continua funcionando.',
    exercise:
      'Aponte no arquivo a região da navegação e a nova região do formulário. Mude o título e confira que alterou o lugar certo.',
    test: '// Abrir #area-livre.\n// Conferir o título novo.\n// Conferir que os exercícios anteriores continuam presentes.\n// Voltar ao Welcome e abrir a Área livre novamente.',
    question:
      'Em qual bloco você escreverá dados, em qual colocará campos e onde ficarão seus estilos?',
  },
  {
    label: '2 · Criar o campo',
    title: 'Ligue um campo ao estado com v-model',
    intro:
      'Vamos acrescentar uma única informação e um campo. Antes de clicar em qualquer coisa, a turma precisa enxergar a ligação entre digitação e estado.',
    change:
      'Mantenha uma única importação de ref no script setup e acrescente titulo. No cartão criado no passo 1, acrescente v-text-field e a prévia. Atualize o mesmo cartão, sem criar outro igual.',
    explain:
      'v-model sincroniza o campo com titulo. A interpolação lê esse dado. No script escrevemos titulo.value; no template usamos titulo. label identifica o campo; variant é aparência do Vuetify.',
    script: base,
    check:
      'Digite Estudar Vue e observe a prévia acompanhar as letras. Apague o texto: a prévia deve mostrar Digite seu objetivo.',
    exercise:
      'Troque o valor inicial do ref para Minha primeira meta. Preveja o resultado no campo e na prévia. Depois retorne ao valor vazio.',
    test: '// Digitar Estudar Vue → prévia Estudar Vue.\n// Apagar → prévia Digite seu objetivo.\n// Ainda não há cadastro nem envio.\n// Não use v-model="titulo.value" para este ref de nível superior.',
    question: 'Se a prévia muda ao digitar, o formulário já foi enviado ou só mudou o estado?',
  },
  {
    label: '3 · Limpar',
    title: 'Acrescente uma função e um botão',
    intro:
      'Vamos alterar o mesmo dado por código. A função muda o estado; o Vue cuida de atualizar o campo e a prévia.',
    change:
      'Acrescente limpar() depois de titulo no script. No cartão, acrescente o botão @click="limpar". Não declare novamente o mesmo ref nem procure o input com querySelector.',
    explain:
      'titulo é const, mas titulo.value pode mudar. O botão usa type="button" porque sua função será apenas limpar, mesmo depois de colocarmos tudo dentro de um formulário.',
    script: `${base}\n\nfunction limpar() {\n  titulo.value = ''\n}`,
    check:
      'Digite uma frase e clique em Limpar. O campo deve esvaziar e a prévia voltar ao texto inicial. Repita com o campo vazio e confira que não ocorre erro.',
    exercise:
      "Explique por que titulo = '' tentaria reatribuir uma constante e titulo.value = '' altera o conteúdo. Mostre a linha que corrige o problema.",
    test: '// Digitar → campo e prévia mostram a frase.\n// Limpar → ambos voltam ao início.\n// O handler não altera nenhum elemento HTML manualmente.',
    question: 'Como uma única atribuição consegue alterar o campo e a prévia ao mesmo tempo?',
  },
  {
    label: '4 · Enviar',
    title: 'Use o mesmo envio para Enter e para o botão',
    intro:
      'Primeiro vamos comprovar que a submissão funciona. Ainda não estamos validando nem cadastrando: apenas exibiremos o texto recebido.',
    change:
      'Declare mensagem e enviar(). Atualize limpar() para também apagar a mensagem. Envolva campo e botões em v-form @submit.prevent="enviar" e acrescente o botão type="submit". Mostre a mensagem após o formulário.',
    explain:
      'O handler fica no formulário. Enter e o botão solicitam a mesma submissão. .prevent evita envio convencional e recarga. Não coloque também @click="enviar" no botão submit: isso criaria dois caminhos.',
    script: `${message}\n\n${preview}\n\n${clear}`,
    check:
      'Digite Estudar Vue e envie por Enter. Troque o texto e envie pelo botão. A mensagem deve começar com Recebido: e a página não pode recarregar.',
    exercise:
      'Clique em Limpar e explique por que ele não envia. Depois tente enviar vazio e anote o problema que a validação precisa resolver.',
    test: '// Enter e Enviar → mesmo resultado.\n// Limpar → apaga campo e mensagem, sem submeter.\n// Vazio ainda é recebido neste passo.\n// Corrigiremos isso antes de implementar a lista.',
    question: 'Por que não basta colocar @click no botão para organizar o envio de um formulário?',
  },
  {
    label: '5 · Regras',
    title: 'Mostre o que é um título válido',
    intro:
      'A turma vai escrever a regra de tamanho e vê-la atuar no campo. No próximo passo, o envio passará a respeitar o resultado dessa validação.',
    change:
      'Acrescente regras ao script. No v-text-field, acrescente :rules="regras" e counter="80". Mantenha a função enviar de diagnóstico apenas até o próximo passo.',
    explain:
      'Uma regra retorna true ou uma mensagem de erro. trim() remove espaços externos, preservando espaços entre palavras. counter informa a contagem; não substitui rules nem a verificação no handler.',
    script: `${message}\n${rules}\n\n${preview}\n\n${clear}`,
    check:
      'Digite ab e saia do campo para observar o erro. Troque para Vue e compare. Teste três espaços. A função ainda é um diagnóstico, não um cadastro: nenhuma lista foi criada.',
    exercise:
      'Classifique vazio, espaços, ab, Vue, 80 e 81 caracteres. Explique como a normalização interfere na decisão.',
    test: `const validar = regras[0]\nconsole.log(validar('   ')) // Erro.\nconsole.log(validar('ab')) // Erro.\nconsole.log(validar('  Vue  ')) // true.\nconsole.log(validar('a'.repeat(80))) // true.\nconsole.log(validar('a'.repeat(81))) // Erro.`,
    question: 'Ver o erro no campo garante, sozinho, que a função de envio rejeitou a entrada?',
  },
  {
    label: '6 · Validar envio',
    title: 'Aguarde valid antes de aceitar o formulário',
    intro:
      'Agora o formulário passa a respeitar as regras. Não avance à lista antes de todos conseguirem explicar uma tentativa válida e uma inválida.',
    change:
      'Declare form e enviando. Acrescente ref="form" ao v-form. Substitua enviar pela versão async e atualize limpar. Use readonly no campo e disabled nos botões conforme o exemplo.',
    explain:
      'form.value é o componente montado; validate() retorna uma Promise. await obtém o resultado, e valid informa se passou. Uma Promise não deve ser tratada diretamente como booleano. finally libera o envio mesmo depois de return.',
    script: validScript,
    check:
      'Vazio e ab devem apresentar erro sem limpar o rascunho nem mostrar sucesso. Um título válido mostra Formulário válido, limpa o campo e permite outro envio. Teste botão e Enter.',
    exercise:
      'Aponte a linha que bloqueia duplicação, a que rejeita inválidos e a que restaura enviando. Justifique cada uma.',
    test: '// Enviar vazio → rejeitado.\n// Enviar ab → rejeitado, campo preservado.\n// Enviar Estudar Vue → sucesso, campo limpo.\n// Enviar 81 caracteres → rejeitado.\n// Limpar → apaga campo, mensagem e erros visuais.',
    question: 'Por que if (form.value.validate()) não é uma verificação adequada?',
  },
  {
    label: '7 · Cadastrar',
    title: 'Com o formulário funcionando, guarde os resultados',
    intro:
      'Esta parte é a continuação do formulário. Se a turma precisar de mais tempo na validação, priorize o passo 6 e retome a lista depois.',
    change:
      'Acrescente objetivos = ref([]). Na função enviar, após valid, acrescente push com id, titulo normalizado e concluido false. Abaixo do formulário, renderize a coleção com v-for e a mensagem de lista vazia.',
    explain:
      'O campo é um rascunho; cada registro recebe uma cópia do título. A chave estável nasce no cadastro com crypto.randomUUID(). O Vue acompanha o array e renderiza os cartões. Não gere id na renderização.',
    script:
      finalScript
        .replace(/async function adicionar/g, 'async function enviar')
        .split('\nfunction remover(')[0]
        .trim() +
      '\n\n' +
      finalClear,
    check:
      'Cadastre dois objetivos e confira total 2. Limpar o campo não apaga cadastros. Um envio inválido não deve aumentar o total.',
    exercise:
      'Cadastre dois títulos iguais e observe que são registros com ids diferentes. Impedir duplicados pode ficar como extensão, não é uma regra escondida desta versão.',
    test: '// Vazio → orientação para cadastrar.\n// Dois títulos válidos → dois cartões.\n// Envio inválido → quantidade não muda.\n// Recarregar → lista vazia, pois não há persistência.',
    question: 'Por que limpar titulo não apaga os títulos que já foram guardados nos objetos?',
  },
  {
    label: '8 · Remover e revisar',
    title: 'Finalize o ciclo e explique o que construiu',
    intro:
      'Vamos acrescentar só mais uma ação e revisar o fluxo completo. A separação em componentes fica para 17/11.',
    change:
      'Acrescente remover(id) e o botão correspondente em cada cartão. Use o id do objeto como argumento. O código desta etapa mostra a versão acumulada do exercício, não um segundo formulário a acrescentar.',
    explain:
      'find localiza o registro e filter produz uma coleção sem aquele id. O ref continua constante; seu conteúdo muda. O mesmo v-if mostra o estado vazio ao remover o último item. Não use v-html para o título digitado.',
    script:
      finalScript.replace(/async function adicionar/g, 'async function enviar') +
      '\n\n' +
      finalClear,
    check:
      'Remova um item e confira que o outro permanece. Remova o último e veja o estado vazio voltar. Revise Enter, Limpar, validação, mensagens e navegação.',
    exercise:
      'Cada aluno explica evento → função → estado → template. Só se sobrar tempo, tente impedir títulos repetidos com some antes de push, preservando o texto recusado.',
    test: '// [ ] Enter e botão usam um único envio.\n// [ ] Inválidos não entram na lista.\n// [ ] Limpar não apaga cadastros.\n// [ ] Remover atinge somente o id escolhido.\n// [ ] Estado vazio retorna.\n// [ ] O aluno explica .value, await, valid e :key.',
    question:
      'Qual dado o formulário edita, qual dado a lista apresenta e qual linha liga essas duas fases?',
  },
]

export const lesson04 = {
  ...reference,
  summary:
    'Construção em conjunto: um campo, uma ação e uma verificação por vez até chegar ao cadastro validado.',
  screens: steps.map((step, index) => ({
    label: step.label,
    title: step.title,
    intro: step.intro,
    points: [
      [
        'Ritmo · 15 minutos',
        '3 min para explicar, 7 para construir junto, 3 para testar e 2 para o aluno justificar. Não avance antes de conferir o resultado. Oito etapas somam 120 minutos.',
      ],
      ['O que alterar agora', step.change],
      ['O que o professor explica', step.explain],
      ['Pare e confira', step.check],
      ['Exercício do aluno', step.exercise],
      [
        'Como usar os códigos',
        'As versões são acumuladas: atualize as partes do exercício no script setup e no template existentes. Não cole novamente as declarações das etapas anteriores. Preserve seus outros exercícios na Área livre.',
      ],
    ],
    code: `// PASSO ${index + 1}: no script setup existente.\n// Estado acumulado do exercício até aqui.\n\n${step.script}`,
    language: 'javascript',
    codeExamples: [
      {
        title: `Passo ${index + 1} · área do formulário no template`,
        explanation:
          'Use uma v-row nova, com v-col cols="12", dentro do v-container da Área livre. Atualize somente a região deste exercício. Não crie um segundo template ou uma nova v-app.',
        code: templateFor(index + 1),
        language: 'vue',
        expected: step.check,
      },
      {
        title: 'Antes de avançar · confira com a turma',
        explanation:
          'Preveja, execute e compare. Se algo falhar, revise a última alteração antes de mudar outro trecho.',
        code: step.test,
        language: 'javascript',
        expected: step.exercise,
      },
    ],
    question: step.question,
  })),
}
