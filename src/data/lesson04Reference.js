// Aula de 12/11: exemplos para construir na cópia de trabalho do aluno.
// O material não substitui o conteúdo já criado em StudentView.vue.
const example = (title, explanation, code, expected, language = 'javascript') => ({
  title,
  explanation,
  code,
  expected,
  language,
})
const stage = (
  label,
  title,
  intro,
  points,
  code,
  codeExamples,
  question,
  language = 'javascript',
) => ({
  label,
  title,
  intro,
  points: [
    [
      'Roteiro · 15 minutos',
      '5 minutos de explicação, 5 de leitura e previsão e 5 de prática ou discussão. As oito etapas totalizam 120 minutos. Use o código principal na apresentação e os exemplos complementares conforme o ritmo da turma.',
    ],
    ...points,
  ],
  code,
  codeExamples,
  question,
  language,
})

export const lesson04 = {
  date: '12/11',
  weekday: 'Quinta-feira',
  title: 'Formulários e listas',
  summary:
    'Transforme o que o usuário digita em uma lista de objetivos: v-model, validação, cadastro e renderização.',
  files: [
    'src/views/StudentView.vue (cópia de trabalho)',
    'src/plugins/vuetify.js',
    'src/data/lesson04.js',
  ],
  screens: [
    stage(
      'Planejar os dados',
      'Do contador ao primeiro cadastro',
      'Na aula anterior, um evento chamava uma função que alterava estado. Agora vamos acrescentar entrada de texto e uma coleção. O projeto da aula será um painel de objetivos de estudo, com apenas um campo obrigatório.',
      [
        [
          'Retomada aplicada',
          'Relembre ref, .value no script e @click. Pergunte: onde guardar o texto digitado? Onde guardar vários objetivos? Não transforme a aula em uma revisão geral de JavaScript.',
        ],
        [
          'Rascunho não é cadastro',
          'titulo representa o que está sendo digitado. objetivos representa o que já foi aceito. Editar o campo não deve alterar automaticamente o título dos cartões cadastrados.',
        ],
        [
          'Um objeto por objetivo',
          'Cada item terá id, titulo e concluido. id identifica o registro; titulo é o texto exibido; concluido começa como false e será utilizado na evolução do exercício. Hoje o escopo obrigatório é adicionar, listar e remover.',
        ],
        [
          'Identificador estável',
          'Use crypto.randomUUID() no momento do cadastro, no endereço localhost do projeto. Não gere um novo id durante a renderização nem dependa do texto ou da posição do item.',
        ],
        [
          'Onde trabalhar',
          'O acesso à Área livre fica no Welcome. Trabalhe em sua própria cópia de StudentView.vue e preserve seus exercícios anteriores. Os códigos desta aula são propostas, não um painel já implementado na área do aluno.',
        ],
      ],
      `import { ref } from 'vue'

const titulo = ref('')     // Rascunho do campo.
const objetivos = ref([]) // Coleção de cadastros aceitos.

// Exemplo de formato; ainda não estamos cadastrando:
const exemplo = {
  id: 'id-de-exemplo',
  titulo: 'Praticar eventos do Vue',
  concluido: false,
}

// Ao cadastrar de verdade, gere o id uma única vez:
// { id: crypto.randomUUID(), titulo: ..., concluido: false }`,
      [
        example(
          'Como uma coleção guarda objetos',
          'Leia as propriedades de cada item. O id não é um contador da quantidade atual de cartões.',
          `const objetivos = ref([
  { id: 'a', titulo: 'Ler o template', concluido: false },
  { id: 'b', titulo: 'Praticar funções', concluido: false },
])

console.log(objetivos.value.length)    // 2
console.log(objetivos.value[0].titulo) // Ler o template

// Os ids a e b são fixos só para este exemplo de leitura.
// Cadastros novos da prática usarão crypto.randomUUID().`,
          'Pergunta: se removermos o primeiro item, o id do segundo precisa mudar? Não; sua posição muda, sua identidade permanece.',
        ),
        example(
          'Previsão: campo e coleção independentes',
          'A cópia do texto para o objeto é feita no cadastro. Trocar o rascunho depois não reescreve o objeto anterior.',
          `const titulo = ref('Estudar Vue')
const objetivos = ref([])

objetivos.value.push({
  id: 'exemplo-1',
  titulo: titulo.value,
  concluido: false,
})
titulo.value = 'Estudar CSS'

console.log(objetivos.value[0].titulo) // Estudar Vue
console.log(titulo.value)             // Estudar CSS`,
          'Explique por que o título do cartão não deve acompanhar cada nova letra digitada no campo.',
        ),
      ],
      'Quais dados pertencem ao rascunho e quais pertencem a um registro já cadastrado?',
    ),

    stage(
      'Entrada com v-model',
      'O campo conversa com o estado',
      'v-model sincroniza o valor digitado com um dado da aplicação. Ele não valida o conteúdo e não o acrescenta à coleção por conta própria.',
      [
        [
          'Duas direções',
          "Ao digitar, titulo muda. Quando uma função escreve titulo.value = '', o campo também é limpo. Essa ligação é diferente de apenas renderizar uma string com {{ titulo }}.",
        ],
        [
          'Elemento nativo e componente',
          'No input de texto nativo, a ligação envolve value e input. No v-text-field, o contrato do componente utiliza modelValue e update:modelValue. A sintaxe v-model simplifica o uso, mas os eventos subjacentes não são os mesmos.',
        ],
        [
          'Campo Vuetify',
          'VTextField e VForm estão registrados em plugins/vuetify.js para esta aula. O label fornece o nome do campo; a propriedade variant controla a aparência. A regra de cadastro continua no JavaScript.',
        ],
        [
          'Não misture as camadas',
          'No template, use v-model="titulo". No script, use titulo.value. Não escreva v-model="titulo.value" para este ref de nível superior.',
        ],
      ],
      `<script setup>
import { ref } from 'vue'
const titulo = ref('')

function limparCampo() {
  titulo.value = '' // O campo também será limpo.
}
</script>

<template>
  <v-text-field v-model="titulo" label="Objetivo de estudo" variant="outlined" />
  <p>Prévia: {{ titulo || 'Digite seu objetivo' }}</p>
  <v-btn variant="text" @click="limparCampo">Limpar campo</v-btn>
</template>`,
      [
        example(
          'O que v-model simplifica em um input nativo',
          'Compare as duas opções separadamente; não precisa manter dois campos na prática.',
          `<input v-model="titulo" aria-label="Objetivo de estudo">

<!-- Uma ligação explícita equivalente para um input de texto: -->
<input :value="titulo" aria-label="Objetivo de estudo"
  @input="titulo = $event.target.value">

<!-- Aqui a atribuição está no template: o ref é desembrulhado. -->`,
          'Se a função limparCampo mudar o estado, ambos os campos receberiam a string vazia.',
          'vue',
        ),
        example(
          'O contrato do v-text-field',
          'Evento de componente: o payload já é o novo valor, não necessariamente um evento DOM com target.',
          `<v-text-field v-model="titulo" label="Objetivo" />

<!-- Forma explícita para compreender o componente: -->
<v-text-field :model-value="titulo" label="Objetivo"
  @update:model-value="titulo = $event" />

<!-- Não use $event.target.value supondo que o payload seja DOM. -->`,
          'Pergunta: por que @input do elemento nativo e @update:model-value do Vuetify não devem ser tratados como eventos idênticos?',
          'vue',
        ),
      ],
      'Se o usuário digitou um objetivo, ele já está cadastrado? Que parte ainda precisa acontecer?',
      'vue',
    ),

    stage(
      'Envio do formulário',
      'Enter e botão devem seguir o mesmo caminho',
      'Um formulário organiza o envio. Vamos usar uma função de submissão para garantir o mesmo comportamento ao pressionar Enter ou clicar no botão principal.',
      [
        [
          'submit.prevent',
          'O evento de envio chama nossa função. O modificador prevent evita o envio convencional do formulário e a recarga da página. Esse evento pertence ao formulário, não apenas ao botão.',
        ],
        [
          'Tipo dos botões',
          'O botão principal recebe type="submit". Ações auxiliares, como limpar o campo, recebem type="button". Não adicione também @click="adicionar" no botão de envio: isso criaria dois caminhos para o mesmo cadastro.',
        ],
        [
          'Uma primeira observação',
          'Antes de cadastrar, exiba uma mensagem de diagnóstico com o texto recebido. Esse passo ajuda a confirmar que o fluxo de evento funciona antes de acrescentar validação e lista.',
        ],
        [
          'Função nomeada',
          'adicionar será a ação responsável por validar e cadastrar. Hoje mantemos tudo no mesmo componente; a separação em componentes próprios será a aula de 17/11.',
        ],
      ],
      `<script setup>
import { ref } from 'vue'
const titulo = ref('')
const mensagem = ref('')

function observarEnvio() {
  mensagem.value = 'Recebido: ' + titulo.value
}
</script>

<template>
  <v-form @submit.prevent="observarEnvio">
    <v-text-field v-model="titulo" label="Objetivo" />
    <v-btn type="submit" color="primary">Enviar</v-btn>
    <v-btn type="button" variant="text" @click="titulo = ''">Limpar</v-btn>
  </v-form>
  <p role="status" aria-live="polite">{{ mensagem }}</p>
</template>`,
      [
        example(
          'Roteiro de teste do envio',
          'Preveja e depois execute se houver ambiente disponível. Quem estiver no caderno descreve qual handler será chamado.',
          `// 1. Digite "Estudar Vue" e pressione Enter no campo.
//    Resultado: Recebido: Estudar Vue.
// 2. Troque o texto e clique em Enviar.
//    Resultado: a mesma função processa o novo texto.
// 3. Clique em Limpar.
//    O campo esvazia; não ocorre um novo envio.
// 4. A página não deve recarregar em nenhum envio.`,
          'Critério: o aluno consegue apontar o único evento responsável pelo envio e justificar o tipo de cada botão.',
        ),
        example(
          'Erro comum: cadastrar duas vezes',
          'Compare o trecho problemático e o correto. O handler deve ficar no formulário.',
          `<!-- EVITE: dois eventos solicitam o mesmo cadastro. -->
<v-form @submit.prevent="adicionar">
  <v-btn type="submit" @click="adicionar">Adicionar</v-btn>
</v-form>

<!-- PREFIRA: o botão apenas solicita a submissão. -->
<v-form @submit.prevent="adicionar">
  <v-btn type="submit">Adicionar</v-btn>
</v-form>`,
          'Ao clicar no botão do primeiro trecho, a função pode ser chamada pelo clique e pelo submit. Remova o @click desse botão.',
          'vue',
        ),
      ],
      'Por que um botão Limpar dentro de um formulário deve declarar type="button"?',
      'vue',
    ),

    stage(
      'Validação',
      'Nem todo texto deve virar um objetivo',
      'A regra será curta e verificável: aceitar de 3 a 80 caracteres depois de remover espaços nas pontas. Validar e cadastrar são etapas diferentes.',
      [
        [
          'Normalização',
          'trim() remove espaços no começo e no fim. Ele não apaga espaços entre as palavras. Uma entrada só de espaços vira string vazia e deve ser rejeitada.',
        ],
        [
          'Rules do Vuetify',
          'Uma regra retorna true quando aceita o valor ou uma mensagem de erro quando o rejeita. Passe um array de funções em :rules; não escreva a regra como uma string literal.',
        ],
        [
          'Referência ao formulário',
          'const form = ref(null) e ref="form" no v-form permitem chamar form.value.validate() depois de o componente ser montado. Não confunda a referência ao componente com o texto do campo.',
        ],
        [
          'Validação assíncrona',
          'validate() retorna uma Promise. Aguarde com await e leia valid do resultado. if (form.value.validate()) não testa o resultado: o objeto Promise é verdadeiro nessa condição.',
        ],
        [
          'Entrada inválida não muda a lista',
          'Se valid for false, retorne antes de criar o registro. O campo mantém o texto para o aluno corrigir. Só limpe o campo depois do sucesso.',
        ],
      ],
      `const form = ref(null)
const regras = [valor => {
  const texto = String(valor ?? '').trim()
  return (texto.length >= 3 && texto.length <= 80)
    || 'Use de 3 a 80 caracteres.'
}]

async function adicionar() {
  const { valid } = await form.value.validate()
  if (!valid) return // Não cadastra nem limpa o texto inválido.

  const texto = titulo.value.trim()
  // O cadastro será acrescentado no próximo passo.
}

// Template correspondente:
// <v-form ref="form" @submit.prevent="adicionar">
//   <v-text-field v-model="titulo" :rules="regras" label="Objetivo" />
// </v-form>`,
      [
        example(
          'Teste a regra em casos de borda',
          'Para cada entrada, escreva true ou a mensagem de erro antes de conferir.',
          `const validar = regras[0]
console.log(validar(''))           // Mensagem de erro.
console.log(validar('   '))        // Mensagem de erro.
console.log(validar('ab'))         // Mensagem de erro.
console.log(validar('Vue'))        // true
console.log(validar('  Vue  '))    // true: 3 após trim().
console.log(validar('a'.repeat(80))) // true
console.log(validar('a'.repeat(81))) // Mensagem de erro.

// A entrada "Vue 3" mantém o espaço entre as palavras.`,
          'Critério: quantidade de caracteres é medida após a normalização. O aluno deve testar o limite inferior e o superior.',
        ),
        example(
          'Ligação visual da validação',
          'Recorte de template a integrar ao componente. O atributo counter ajuda na leitura, mas não substitui rules.',
          `<v-form ref="form" @submit.prevent="adicionar">
  <v-text-field
    v-model="titulo"
    label="Objetivo de estudo"
    hint="Entre 3 e 80 caracteres, sem contar espaços nas pontas"
    persistent-hint
    :rules="regras"
    counter="80"
    variant="outlined"
  />
  <v-btn type="submit" color="primary">Adicionar</v-btn>
</v-form>`,
          'O contador não impede um cadastro inválido sozinho. A função de envio precisa respeitar o resultado de validate().',
          'vue',
        ),
      ],
      'Por que precisamos de await e de valid, em vez de usar validate() diretamente como condição?',
    ),

    stage(
      'Cadastro e v-for',
      'Transforme objetos em cartões',
      'Depois de validar, vamos criar um objeto, colocá-lo no array e renderizar um cartão por registro. O template acompanha a coleção, sem criar elementos manualmente no DOM.',
      [
        [
          'Adicionar ao array reativo',
          'objetivos.value.push(novoObjetivo) altera a coleção. O Vue acompanha a mudança; não precisamos de document.createElement ou innerHTML para inserir cartões.',
        ],
        [
          'Cada objeto guarda seu texto',
          'Copie titulo.value.trim() para o campo titulo do novo objeto. Limpar o rascunho depois não apaga o conteúdo do registro.',
        ],
        [
          'v-for e chave',
          'v-for="objetivo in objetivos" cria um bloco para cada item. :key="objetivo.id" dá identidade estável ao bloco. Não use o índice como identidade de itens que podem ser removidos.',
        ],
        [
          'Comportamento repetido',
          'O mesmo template apresenta todos os registros. Duplicar manualmente v-card para cada item impediria a coleção de crescer de forma previsível.',
        ],
      ],
      `// Trecho executado DEPOIS de a validação retornar valid === true:
const novoObjetivo = {
  id: crypto.randomUUID(), // Criado uma vez no cadastro.
  titulo: titulo.value.trim(),
  concluido: false,
}
objetivos.value.push(novoObjetivo)
titulo.value = '' // Limpa apenas o rascunho.

// Limpa as mensagens de validação depois do sucesso:
form.value.resetValidation()

// O template observa objetivos, não novoObjetivo.`,
      [
        example(
          'Renderização de uma coleção',
          'O grid reaproveita os componentes já registrados. O id permanece associado ao item mesmo quando a ordem muda.',
          `<v-row>
  <v-col v-for="objetivo in objetivos" :key="objetivo.id" cols="12" md="6">
    <v-card class="pa-4" rounded="lg" border>
      <h2 class="text-h6">{{ objetivo.titulo }}</h2>
      <p class="text-body-2">Pendente</p>
    </v-card>
  </v-col>
</v-row>`,
          'Com zero itens: nenhum cartão. Com três itens: três cartões. Em largura pequena, cada coluna ocupa uma linha.',
          'vue',
        ),
        example(
          'A chave não é uma decoração',
          'Um item não vira outro só porque passou a ocupar a primeira posição.',
          `// Antes de remover:
// posição 0 → { id: 'a', titulo: 'HTML' }
// posição 1 → { id: 'b', titulo: 'Vue' }

// Depois de remover o id a:
// posição 0 → { id: 'b', titulo: 'Vue' }

// A posição mudou; o id continua b.
// Evite :key="index" para esta lista removível.
// Evite :key="crypto.randomUUID()": mudaria a cada renderização.`,
          'Pergunta: por que gerar a chave dentro do template atrapalha a identidade dos cartões?',
        ),
      ],
      'Se cadastrarmos um título e depois limparmos o campo, por que o cartão continua com o texto?',
    ),

    stage(
      'Condições e remoção',
      'A lista também precisa explicar quando está vazia',
      'Um painel completo precisa orientar antes do primeiro cadastro e continuar coerente após uma remoção. Vamos usar a coleção como fonte dessas decisões.',
      [
        [
          'v-if e v-else',
          'Mostre uma orientação se objetivos.length for zero; caso contrário, mostre os cartões. v-else deve estar imediatamente associado ao v-if anterior, sem outro elemento entre eles.',
        ],
        [
          'Estrutura e visibilidade',
          'v-if cria ou remove a ramificação da interface. v-show mantém o elemento e alterna sua exibição por CSS. Nesta aula, use v-if para escolher entre estado vazio e lista.',
        ],
        [
          'Remover por id',
          'A função recebe o identificador e mantém os itens cujo id é diferente. filter devolve um novo array, atribuído a objetivos.value. Isso é permitido mesmo com const, porque estamos alterando .value.',
        ],
        [
          'Um total sem estado duplicado',
          '{{ objetivos.length }} no template já fornece a quantidade. Não precisamos manter outro ref e lembrar de atualizá-lo em cada inclusão ou remoção.',
        ],
        [
          'Mensagens sem HTML injetado',
          'Use interpolação para exibir o título digitado. Não use v-html para renderizar entrada do aluno. O objetivo é mostrar texto, mesmo se alguém digitar algo parecido com uma tag.',
        ],
      ],
      `<p v-if="objetivos.length === 0" role="status">
  Nenhum objetivo cadastrado. Comece pelo formulário acima.
</p>
<div v-else>
  <p>Total: {{ objetivos.length }}</p>
  <v-card v-for="objetivo in objetivos" :key="objetivo.id" class="pa-4 mb-3">
    <h2>{{ objetivo.titulo }}</h2>
    <v-btn type="button" variant="text" @click="remover(objetivo.id)">
      Remover
    </v-btn>
  </v-card>
</div>`,
      [
        example(
          'Função de remoção com mensagem',
          'Não use o título nem a posição para decidir qual item remover.',
          `function remover(id) {
  const item = objetivos.value.find(objetivo => objetivo.id === id)
  if (!item) return

  objetivos.value = objetivos.value.filter(objetivo => objetivo.id !== id)
  mensagem.value = 'Removido: ' + item.titulo
}

// Se a coleção ficar vazia, v-if exibirá a orientação novamente.
// A função não precisa procurar o cartão no DOM.`,
          'Cadastre dois itens com o mesmo título e remova somente um. O outro deve permanecer, pois os ids são diferentes.',
        ),
        example(
          'Teste de texto, não HTML',
          'Este é um teste de apresentação, não uma instrução para criar tags dinamicamente.',
          `// Entrada possível no campo: <strong>Estudar Vue</strong>
// Com {{ objetivo.titulo }}, o texto é apresentado como texto.
// As tags digitadas não se tornam elementos strong da interface.

// EVITE para esta atividade:
// <div v-html="objetivo.titulo"></div>

// Fluxo esperado:
// vazio → cadastrar dois → remover um → remover o último → vazio`,
          'Critério: o aluno explica o estado vazio, o total e a remoção a partir da mesma coleção, sem atualizar elementos manualmente.',
        ),
      ],
      'Por que remover por id funciona mesmo com títulos repetidos e posições diferentes?',
      'vue',
    ),

    stage(
      'Prática completa',
      'Junte entrada, regra e coleção em um fluxo',
      'Abaixo está uma solução de referência para leitura e demonstração. Primeiro tente montar as partes com a turma. A solução não deve substituir a explicação sobre cada decisão.',
      [
        [
          'Organização da prática',
          'Use uma cópia da Área livre, integrando script e conteúdo ao arquivo existente, ou crie um componente próprio de exercício. Não acrescente dois blocos template ou dois script setup ao mesmo arquivo.',
        ],
        [
          'Ordem do fluxo',
          'O envio bloqueia tentativas simultâneas, valida, cria o registro, limpa o rascunho e anuncia sucesso. Entrada inválida retorna antes do cadastro. finally libera o estado de envio em qualquer caminho.',
        ],
        [
          'Por que async?',
          'O await é necessário porque a API do formulário é assíncrona, mesmo quando as regras utilizadas aqui são simples. Isso não significa que exista uma chamada de API externa.',
        ],
        [
          'Escolhas de escopo',
          'Não vamos implementar edição, login, filtro ou armazenamento permanente nesta aula. Ao recarregar a página, os objetivos em memória desaparecem. Essa limitação deve ser compreendida e comunicada.',
        ],
      ],
      `<script setup>
import { ref } from 'vue'

const titulo = ref('')
const objetivos = ref([])
const form = ref(null)
const enviando = ref(false)
const mensagem = ref('')
const regras = [valor => {
  const texto = String(valor ?? '').trim()
  return (texto.length >= 3 && texto.length <= 80) || 'Use de 3 a 80 caracteres.'
}]

async function adicionar() {
  if (enviando.value) return
  enviando.value = true
  try {
    const { valid } = await form.value.validate()
    if (!valid) return
    objetivos.value.push({
      id: crypto.randomUUID(),
      titulo: titulo.value.trim(),
      concluido: false,
    })
    titulo.value = ''
    form.value.resetValidation()
    mensagem.value = 'Objetivo adicionado.'
  } catch {
    mensagem.value = 'Não foi possível cadastrar. Tente novamente.'
  } finally {
    enviando.value = false
  }
}

function remover(id) {
  const item = objetivos.value.find(objetivo => objetivo.id === id)
  if (!item) return
  objetivos.value = objetivos.value.filter(objetivo => objetivo.id !== id)
  mensagem.value = 'Removido: ' + item.titulo
}
</script>

<template>
  <section aria-labelledby="objetivos-titulo">
    <h1 id="objetivos-titulo" class="mb-4">Meus objetivos de estudo</h1>
    <v-form ref="form" @submit.prevent="adicionar">
      <v-text-field v-model="titulo" label="Objetivo" :rules="regras"
        :readonly="enviando" variant="outlined" counter="80" />
      <v-btn type="submit" color="primary" :disabled="enviando">Adicionar</v-btn>
    </v-form>
    <p class="my-4" role="status" aria-live="polite">{{ mensagem }}</p>
    <p v-if="objetivos.length === 0">Nenhum objetivo cadastrado.</p>
    <div v-else>
      <p class="mb-3">Total: {{ objetivos.length }}</p>
      <v-card v-for="objetivo in objetivos" :key="objetivo.id" class="pa-4 mb-3" border>
        <h2 class="text-h6">{{ objetivo.titulo }}</h2>
        <v-btn type="button" variant="text" @click="remover(objetivo.id)"
          :aria-label="'Remover objetivo: ' + objetivo.titulo">Remover</v-btn>
      </v-card>
    </div>
  </section>
</template>`,
      [
        example(
          'Matriz de verificação da prática',
          'Um cenário por vez; anote o estado antes e depois. Não use apenas a aparência como evidência.',
          `// 1. Abrir: lista vazia, orientação visível.
// 2. Enviar "  ": erro, zero registros, campo preservado.
// 3. Enviar "ab": erro, zero registros.
// 4. Enviar "  Estudar Vue  ": um registro com "Estudar Vue".
// 5. Enviar outro título por Enter: dois registros.
// 6. Remover um id: sobra exatamente o outro item.
// 7. Remover o último: volta a orientação de lista vazia.
// 8. Recarregar: a coleção volta a vazia (não há persistência).`,
          'A aprendizagem aparece na explicação de qual função e qual dado mudam em cada cenário.',
        ),
        example(
          'Registro dos novos componentes Vuetify',
          'O plugin do projeto já foi preparado com estes componentes. Em uma cópia antiga, acrescente-os à importação e ao objeto components existentes.',
          `// Recorte ilustrativo de src/plugins/vuetify.js:
import { VForm, VTextField } from 'vuetify/components'

// Dentro de createVuetify({ components: { ... } }):
// components: {
//   ...componentesJaExistentes,
//   VForm,
//   VTextField,
// }

// Não substitua o plugin inteiro por este recorte.
// O tema e os demais componentes precisam ser preservados.`,
          'Se aparecer “Failed to resolve component: v-text-field”, confira tanto o import quanto o registro.',
        ),
      ],
      'Mostre a sequência exata do envio até o novo cartão e explique por que limpar titulo não apaga o registro.',
      'vue',
    ),

    stage(
      'Desafio e correção',
      'Impeça títulos repetidos e explique a regra',
      'A funcionalidade principal está completa. O desafio acrescenta uma única regra: não aceitar títulos iguais depois de normalizar espaços externos e letras maiúsculas/minúsculas.',
      [
        [
          'Desafio individual',
          'Antes de push, use some para descobrir se já existe um título equivalente. “Estudar Vue” e “  estudar vue  ” devem ser considerados repetidos. Não altere os ids dos registros existentes.',
        ],
        [
          'Sem crescimento de escopo',
          'Nesta regra, diferenças de acento continuam sendo diferenças de texto. Não implemente busca aproximada nem remova espaços entre palavras sem necessidade. Explique exatamente a comparação escolhida.',
        ],
        [
          'Em caso de duplicação',
          'Mostre uma mensagem, preserve o campo para correção e não acrescente item. O finally da função de envio ainda deve liberar enviando.',
        ],
        [
          'Critérios de aprendizagem',
          'O aluno liga o campo com v-model, respeita valid, cadastra somente dados válidos, usa chave estável, explica estado vazio e remove pelo id correto. Deve justificar o uso de .value no script e sua ausência no template.',
        ],
        [
          'Próximo encontro · 17/11',
          'Vamos extrair formulário e cartão em componentes e estudar props e eventos. Não antecipe essa refatoração antes de a turma entender o fluxo completo em um componente.',
        ],
      ],
      `// ERROS INTENCIONAIS: corrija antes de executar.
// 1. A referência titulo é const; queremos alterar seu conteúdo.
// titulo = ''

// 2. validate retorna Promise, não booleano imediato.
// if (form.value.validate()) { cadastrar() }

// 3. Key gerada na renderização não é estável.
// <v-card v-for="item in objetivos" :key="crypto.randomUUID()">

// 4. Objetivos tem títulos; remover pela posição pode confundir.
// @click="remover(index)"

// Anote a correção mínima e uma justificativa para cada caso.`,
      [
        example(
          'Correção dos quatro casos',
          'Confira somente depois da tentativa individual.',
          `// 1. Alteração do conteúdo do ref:
titulo.value = ''

// 2. Dentro de uma função async:
const { valid } = await form.value.validate()
if (!valid) return

// 3. Chave do objeto criado no cadastro:
// <v-card v-for="item in objetivos" :key="item.id">

// 4. Argumento do evento corresponde ao identificador:
// @click="remover(item.id)"`,
          'Pergunte qual desses erros é sobre JavaScript, qual é sobre uma API assíncrona e quais envolvem a identidade dos itens.',
        ),
        example(
          'Uma solução para títulos duplicados',
          'Integre este bloco dentro do try de adicionar(), depois de valid e antes de push. Ele não é uma segunda função de cadastro.',
          `const texto = titulo.value.trim()
const chave = texto.toLocaleLowerCase('pt-BR')
const existe = objetivos.value.some(objetivo =>
  objetivo.titulo.toLocaleLowerCase('pt-BR') === chave
)

if (existe) {
  mensagem.value = 'Esse objetivo já está na lista.'
  return // finally continua sendo executado.
}

// Continue o push já existente, usando titulo: texto.
// Não acrescente um segundo push depois do primeiro.`,
          'Teste: cadastrar Estudar Vue; tentar estudar vue; remover o original; cadastrar novamente. O último envio deve ser permitido.',
        ),
      ],
      'Consegue explicar o cadastro e remover um item sem procurar seus elementos no DOM? Qual é a fonte de verdade da lista?',
    ),
  ],
}
