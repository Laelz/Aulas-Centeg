// Aula de 17/11: refatoração proposta do cadastro real feito pela turma.
// Os arquivos AlunoForm/AlunoCard/AlunosPanel abaixo são exercícios, não alterações automáticas.
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
  change,
  explanation,
  check,
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
      'Ritmo · 15 minutos',
      '3 min para explicar, 7 para construir junto, 3 para verificar e 2 para o aluno justificar. Oito etapas totalizam 120 minutos. Use os trechos complementares como apoio, sem exigir que todos copiem cada exemplo.',
    ],
    ['O que alterar agora', change],
    ['O que o professor explica', explanation],
    ['Pare e confira', check],
    [
      'Cuidado com a integração',
      'Trabalhe na cópia do aluno. Não crie um segundo script setup ou template no mesmo arquivo. Preserve a v-app e a navegação de StudentView.vue; os novos componentes entrarão dentro do conteúdo existente.',
    ],
  ],
  code,
  codeExamples,
  question,
  language,
})

const cardSource = `<script setup>
// Entradas: o objeto que o pai escolheu apresentar.
const props = defineProps({
  aluno: { type: Object, required: true },
})
// Saída: intenção de remover, com o identificador do registro.
const emit = defineEmits(['remover'])

function solicitarRemocao() {
  emit('remover', props.aluno.id)
}
</script>

<template>
  <v-card class="pa-4" rounded="lg" border>
    <h3 class="text-h6 aluno-nome">{{ props.aluno.nome }}</h3>
    <p class="mb-3">{{ props.aluno.idade }} anos</p>
    <v-btn type="button" variant="text" @click="solicitarRemocao"
      :aria-label="'Remover aluno: ' + props.aluno.nome">Remover</v-btn>
  </v-card>
</template>

<style scoped>
.aluno-nome { overflow-wrap: anywhere; }
</style>`

const formSource = `<script setup>
import { ref } from 'vue'

// Configuração reutilizável, não uma cópia dos dados do pai.
const props = defineProps({
  titulo: { type: String, default: 'Cadastrar aluno' },
})
const emit = defineEmits(['adicionar'])
const nome = ref('')
const idade = ref('')
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
    || 'Informe uma idade inteira de 0 a 120.'
}]

async function enviar() {
  if (enviando.value) return
  enviando.value = true
  try {
    const { valid } = await form.value.validate()
    if (!valid) return
    // O filho envia dados normalizados; não altera a coleção do pai.
    emit('adicionar', { nome: nome.value.trim(), idade: Number(idade.value) })
    nome.value = ''
    idade.value = ''
    form.value.resetValidation()
  } finally {
    enviando.value = false
  }
}
function limpar() {
  if (enviando.value) return
  nome.value = ''
  idade.value = ''
  form.value.resetValidation()
}
</script>

<template>
  <v-card class="pa-6" border>
    <h2 class="text-h5 mb-4">{{ props.titulo }}</h2>
    <v-form ref="form" @submit.prevent="enviar">
      <v-text-field v-model="nome" label="Nome" :rules="regrasNome"
        :readonly="enviando" variant="outlined" />
      <v-text-field v-model="idade" label="Idade" type="number" min="0" max="120" step="1"
        :rules="regrasIdade" :readonly="enviando" variant="outlined" />
      <div class="d-flex ga-2 flex-wrap">
        <v-btn type="submit" color="primary" :disabled="enviando">Adicionar</v-btn>
        <v-btn type="button" variant="outlined" :disabled="enviando" @click="limpar">Limpar</v-btn>
      </div>
    </v-form>
  </v-card>
</template>`

const panelSource = `<script setup>
import { ref } from 'vue'
import AlunoForm from './AlunoForm.vue'
import AlunoCard from './AlunoCard.vue'

const alunos = ref([]) // Única fonte de verdade da coleção.
const mensagem = ref('')

function adicionar(dados) {
  // O pai continua responsável pela integridade da coleção.
  const nome = String(dados?.nome ?? '').trim()
  const preenchida = dados?.idade !== null && dados?.idade !== undefined
    && String(dados.idade).trim() !== ''
  const idade = Number(dados?.idade)
  if (nome.length < 3 || nome.length > 80 || !preenchida
    || !Number.isInteger(idade) || idade < 0 || idade > 120) {
    mensagem.value = 'Dados inválidos. Nenhum registro foi adicionado.'
    return
  }
  alunos.value.push({ id: crypto.randomUUID(), nome, idade })
  mensagem.value = 'Adicionado: ' + nome
}
function remover(id) {
  const aluno = alunos.value.find(item => item.id === id)
  if (!aluno) return
  alunos.value = alunos.value.filter(item => item.id !== id)
  mensagem.value = 'Removido: ' + aluno.nome
}
</script>

<template>
  <section aria-label="Cadastro da turma">
    <!-- O payload do evento vira o primeiro argumento de adicionar. -->
    <AlunoForm @adicionar="adicionar" />
    <p class="my-4" role="status" aria-live="polite">{{ mensagem }}</p>
    <p v-if="alunos.length === 0">Nenhum aluno cadastrado.</p>
    <template v-else>
      <p class="mb-3">Total: {{ alunos.length }}</p>
      <v-row>
        <v-col v-for="aluno in alunos" :key="aluno.id" cols="12" md="6">
          <AlunoCard :aluno="aluno" @remover="remover" />
        </v-col>
      </v-row>
    </template>
  </section>
</template>`

export const lesson05 = {
  date: '17/11',
  weekday: 'Terça-feira',
  title: 'Componentização',
  summary:
    'Do cadastro de nome e idade a componentes reutilizáveis: responsabilidades, props e eventos, passo a passo.',
  files: [
    'src/views/StudentView.vue (existente)',
    'src/components/alunos/AlunoCard.vue (proposto)',
    'src/components/alunos/AlunoForm.vue (proposto)',
    'src/components/alunos/AlunosPanel.vue (proposto)',
    'src/plugins/vuetify.js (existente)',
  ],
  screens: [
    stage(
      '1 · Planejar',
      'Separe responsabilidades antes de separar arquivos',
      'O cadastro real da turma já tem nome, idade, alunos e adicionar() em StudentView.vue. Vamos manter o comportamento e organizar o código em pequenos passos. Componentização não é copiar o mesmo script para várias pastas.',
      'Na cópia do aluno, marque três regiões: coleção e cadastro; campos e limpeza; apresentação repetida de cada aluno. Desenhe a árvore proposta antes de criar arquivos.',
      'O painel será dono de alunos. O formulário será dono do rascunho nome/idade e da validação. O cartão apenas apresenta um aluno e comunica uma intenção. O rascunho é estado local; a coleção é estado do pai. Não há necessidade de Pinia, rotas ou API para isso.',
      'Cadastre dois alunos na versão atual e anote o resultado esperado. Esses mesmos cenários precisam funcionar depois da refatoração. Não altere tudo de uma vez.',
      `// Trecho encontrado no script de StudentView.vue:
const nome = ref('')
const idade = ref()
const alunos = ref([])

function adicionar() {
  alunos.value.push({ nome: nome.value, idade: idade.value })
  nome.value = ''
  idade.value = null
}

// Hoje vamos separar as responsabilidades desse fluxo.
// Também acrescentaremos id estável e normalização da idade.`,
      [
        example(
          'Árvore que vamos construir',
          'Os três componentes são propostos para a prática. Eles ainda não são arquivos criados automaticamente pelo material.',
          `StudentView.vue (navegação preservada)
└── AlunosPanel.vue (alunos e alterações da coleção)
    ├── AlunoForm.vue (rascunho, regras e evento adicionar)
    └── AlunoCard.vue (um registro e evento remover)

// Um AlunoCard por registro, criado pelo v-for do pai.
// Nenhum filho recebe acesso para manter outra coleção paralela.`,
          'Pergunta oral: se houver 10 alunos, teremos 10 arquivos de cartão? Não: um componente gera 10 instâncias.',
          'plaintext',
        ),
        example(
          'O que fica e o que sai da Área livre',
          'Não sobrescreva os exercícios anteriores. Trabalhe numa cópia e remova o código antigo do cadastro somente quando a substituição estiver funcionando.',
          `// Permanece: v-app, v-app-bar, botão Voltar e v-main.
// Será substituído: somente a região do cadastro.
// Campos → AlunoForm.vue.
// Cartão repetido → AlunoCard.vue.
// Array e handlers da coleção → AlunosPanel.vue.

// O v-bottom-sheet presente no exercício não é um espaçador.
// Para os botões comuns, use div class="d-flex ga-2 flex-wrap".`,
          'Critério: cada aluno consegue atribuir uma responsabilidade a cada arquivo e explicar por que a coleção não ficará no cartão.',
        ),
      ],
      'Se o cartão guardar uma cópia independente do array alunos, qual passa a ser a fonte de verdade?',
    ),

    stage(
      '2 · Primeiro componente',
      'Extraia um cartão simples e faça-o aparecer',
      'Comece pela parte menor. O primeiro componente será propositalmente estático, para confirmar pasta, importação e uso no template antes de discutir props.',
      'Crie src/components/alunos/AlunoCard.vue com o código principal. Em StudentView.vue, importe-o no script setup existente e coloque uma instância dentro de uma v-col.',
      'Um componente próprio precisa ser importado onde será usado. Dentro de script setup, a importação já o disponibiliza ao template. A importação não coloca o componente na tela sozinha. Os componentes Vuetify continuam no plugin global.',
      'O cartão deve mostrar Aluno de exemplo e 30 anos. Se não aparecer, confira o caminho e a tag antes de mexer nos dados.',
      `<template>
  <!-- Primeira versão de AlunoCard.vue: apenas apresentação. -->
  <v-card class="pa-4" rounded="lg" border>
    <h3 class="text-h6">Aluno de exemplo</h3>
    <p>30 anos</p>
  </v-card>
</template>`,
      [
        example(
          'Importar no script da Área livre',
          'Acrescente esta importação ao bloco existente. Não crie outro script setup nem substitua os imports dos exercícios anteriores.',
          `// Dentro de src/views/StudentView.vue:
import AlunoCard from '../components/alunos/AlunoCard.vue'

// ../ sai de views e volta para src.
// components/alunos entra na pasta do novo componente.
// Atenção a maiúsculas: AlunoCard.vue deve ter o mesmo nome no disco.`,
          'Erro de importação: conferir pasta, arquivo e caminho relativo. Não é um problema que npm install resolva.',
        ),
        example(
          'Renderizar dentro do layout atual',
          'A tag pode ser reutilizada, mas esta versão ainda mostra texto fixo.',
          `<!-- Dentro de uma v-row da Área livre: -->
<v-col cols="12" md="6">
  <AlunoCard />
</v-col>
<v-col cols="12" md="6">
  <AlunoCard />
</v-col>

<!-- Duas instâncias, um único arquivo de implementação. -->`,
          'As duas instâncias devem ser iguais nesta etapa. Pergunta: como mostrar alunos diferentes sem duplicar o arquivo?',
          'vue',
        ),
      ],
      'Qual é a diferença entre importar AlunoCard e escrever <AlunoCard /> no template?',
      'vue',
    ),

    stage(
      '3 · Props',
      'Passe os dados do pai para o cartão',
      'Agora o mesmo cartão vai apresentar qualquer aluno recebido. Não copie os campos para novos refs no filho: apresente a prop diretamente.',
      'Substitua o texto fixo de AlunoCard por props.aluno.nome e props.aluno.idade. Declare defineProps no script setup. No pai, passe :aluno="aluno" dentro do v-for.',
      'defineProps é uma macro do compilador e não precisa de import. type: Object verifica o tipo geral em desenvolvimento; não valida sozinho nome, idade ou id. A prop deve ser lida, sem atribuição direta nem mutação das propriedades internas pelo filho.',
      'Dois objetos diferentes devem gerar dois cartões diferentes. Nome é texto e idade deve ser número no cadastro. A chave fica no v-col que contém v-for.',
      `<script setup>
const props = defineProps({
  aluno: { type: Object, required: true },
})
</script>

<template>
  <v-card class="pa-4" border>
    <h3>{{ props.aluno.nome }}</h3>
    <p>{{ props.aluno.idade }} anos</p>
  </v-card>
</template>`,
      [
        example(
          'Prepare identidades no cadastro do pai',
          'Evolução proposta da função atual. Depois que o formulário for extraído, ela receberá dados por evento.',
          `// Enquanto campos e coleção ainda estão no mesmo componente:
function adicionar() {
  alunos.value.push({
    id: crypto.randomUUID(),
    nome: nome.value.trim(),
    idade: Number(idade.value),
  })
  nome.value = ''
  idade.value = ''
}
// As regras completas serão preservadas no formulário extraído.`,
          'Os registros existentes sem id devem ser recriados para o teste. Não use nome como chave: pessoas podem ter nomes iguais.',
        ),
        example(
          'Passe um objeto, não a palavra aluno',
          'O prefixo : avalia a expressão e entrega o objeto do loop.',
          `<v-row>
  <v-col v-for="aluno in alunos" :key="aluno.id" cols="12" md="6">
    <AlunoCard :aluno="aluno" />
  </v-col>
</v-row>

<!-- aluno="aluno" passaria texto, não o objeto esperado. -->
<!-- Não coloque props.aluno = ... no filho. -->
<!-- Não copie const nome = ref(props.aluno.nome) sem uma necessidade: -->
<!-- essa cópia pode se afastar dos dados recebidos depois. -->`,
          'Altere um objeto no pai e confira a atualização do cartão. O filho não precisa observar e copiar o nome.',
          'vue',
        ),
      ],
      'Qual dado chega em :aluno="aluno" e por que isso difere de aluno="aluno"?',
      'vue',
    ),

    stage(
      '4 · Emits',
      'O cartão solicita; o pai altera a coleção',
      'Vamos acrescentar Remover sem dar ao cartão o controle do array. Um evento personalizado comunica a intenção e seu payload.',
      'No cartão, declare defineEmits e crie solicitarRemocao. No pai, escute @remover e implemente remover(id). O filho envia apenas o identificador.',
      'emit não remove nada por conta própria e não é uma chamada de API. O listener do pai decide a ação. Eventos de componentes não sobem automaticamente por todos os ancestrais: o pai direto precisa escutar ou encaminhar.',
      'Cadastre duas pessoas com o mesmo nome e remova só uma. O id permite atingir o registro correto, independentemente do texto e da posição.',
      cardSource,
      [
        example(
          'Handler da coleção no pai',
          'O pai tem o array e recebe o id emitido pelo cartão.',
          `function remover(id) {
  const aluno = alunos.value.find(item => item.id === id)
  if (!aluno) return
  alunos.value = alunos.value.filter(item => item.id !== id)
}

// O const de alunos não é reatribuído: muda alunos.value.
// O filho não recebe a função filter nem o array inteiro.`,
          'Remover o último item deve devolver o estado vazio. Um id inexistente não altera a coleção.',
        ),
        example(
          'Conecte emissão e escuta',
          'A referência ao handler recebe o payload como primeiro argumento.',
          `<AlunoCard :aluno="aluno" @remover="remover" />

<!-- Forma explícita equivalente: -->
<AlunoCard :aluno="aluno" @remover="remover($event)" />

<!-- Aqui $event é o id emitido, não um MouseEvent. -->
<!-- @remover="remover()" descartaria o id nesse exemplo. -->`,
          'Desenhe: clique → solicitarRemocao → emit(id) → handler do pai → novo array → cartão desaparece.',
          'vue',
        ),
      ],
      'Onde o array é realmente alterado? O emit sozinho removeria um cartão sem listener no pai?',
      'vue',
    ),

    stage(
      '5 · Extrair o formulário',
      'Deixe o rascunho e as regras perto dos campos',
      'Vamos separar a segunda região. O formulário guarda os campos, valida e envia um objeto simples; ele não conhece o array alunos.',
      "Crie AlunoForm.vue. Mova nome, idade, form, regras e limpar para esse arquivo. No envio válido, substitua o push por emit('adicionar', dados). Teste antes de apagar as partes antigas.",
      'Cada instância de um componente tem seus próprios refs. nome e idade são rascunhos locais; o objeto emitido contém nome normalizado e idade numérica. O id nascerá no pai, no momento em que o registro entrar na coleção.',
      'Nome inválido e idade vazia não emitem adicionar. Idade zero é válida; idade fracionária, negativa ou maior que 120 não é. Enter e o botão seguem o mesmo submit.',
      formSource,
      [
        example(
          'Antes e depois do envio',
          'Compare somente o trecho que muda de responsabilidade. A validação permanece antes dele.',
          `// ANTES: formulário e array no mesmo arquivo.
alunos.value.push({ id: crypto.randomUUID(), nome: nome.value, idade: idade.value })

// DEPOIS: dentro do AlunoForm, após valid === true.
emit('adicionar', {
  nome: nome.value.trim(),
  idade: Number(idade.value),
})

// O rascunho é limpo só depois da emissão de dados válidos.
// Não existe alunos.value dentro do novo AlunoForm.`,
          'Pergunta: como outro painel poderia usar esse formulário sem entregar sua coleção para ele?',
        ),
        example(
          'Não remova a validação na refatoração',
          'O problema da aula é organização, não reduzir o cuidado com os dados.',
          `// Dentro de enviar(), que é async:
const { valid } = await form.value.validate()
if (!valid) return

// Só então emitir o objeto de cadastro.
// A regra de idade verifica preenchimento ANTES de Number(valor).
// Number('') é 0: converter sem verificar vazio aceitaria dado ausente.
// A proteção enviando evita duas submissões simultâneas.`,
          'Verifique vazio, ab, nome válido, idade zero, idade 2.5 e idade 121. As decisões precisam ser as mesmas de antes.',
        ),
      ],
      'Qual é o formato do payload de adicionar? Ele deve carregar o array ou só os dados do novo aluno?',
      'vue',
    ),

    stage(
      '6 · Integrar o painel',
      'Monte pai e filhos sem duplicar o estado',
      'Vamos reunir o fluxo no AlunosPanel. A navegação continua na Área livre; o painel coordena a coleção e usa os filhos por importação local.',
      'Crie AlunosPanel.vue com o código principal. Importe-o em StudentView.vue e coloque <AlunosPanel /> dentro de uma v-col. Quando funcionar, retire apenas o cadastro antigo da cópia de trabalho para não manter dois formulários e duas listas.',
      'adicionar(dados) recebe um objeto do evento. remover(id) recebe uma identificação. O pai normaliza e protege a coleção antes de push. As props levam registros para baixo e os eventos levam intenções para cima. Não há this nem methods neste padrão.',
      'Um cadastro válido aparece na lista. Limpar o formulário não apaga cadastros. Remover um cartão não muda os campos do formulário. O botão de voltar ao Welcome continua funcionando.',
      panelSource,
      [
        example(
          'Integração na Área livre existente',
          'Acrescente a importação ao script existente e use a tag no conteúdo. Não substitua o arquivo inteiro por este recorte.',
          `// Em src/views/StudentView.vue:
import AlunosPanel from '../components/alunos/AlunosPanel.vue'

// Dentro de uma v-row no v-container já existente:
// <v-col cols="12">
//   <AlunosPanel />
// </v-col>

// Após conferir, retire da cópia o cadastro antigo substituído.
// Preserve navegação e outros exercícios que não fazem parte da mudança.`,
          'Componentes próprios não precisam entrar no registro global do Vuetify. Importá-los no pai é suficiente.',
        ),
        example(
          'Leia os dois contratos em voz alta',
          'Payloads de eventos personalizados não são necessariamente eventos de navegador.',
          `// Filho formulário → pai:
// evento: adicionar
// payload: { nome: 'Lael', idade: 30 }

// Filho cartão → pai:
// evento: remover
// payload: 'id-do-aluno'

// Pai → filho cartão:
// prop aluno: { id: 'id-do-aluno', nome: 'Lael', idade: 30 }

// Emitir adicionar não significa fazer POST numa API.
// Tudo permanece em memória neste exercício.`,
          'O aluno precisa indicar qual função recebe o objeto e qual recebe uma string de identificação.',
        ),
      ],
      'Por que não devemos manter uma cópia de alunos no formulário, outra no painel e outra no cartão?',
      'vue',
    ),

    stage(
      '7 · Reutilizar',
      'Mesmo arquivo, configurações e instâncias diferentes',
      'Componentização permite reutilizar uma implementação sem obrigar todas as instâncias a compartilhar o mesmo estado. Vamos demonstrar essa diferença.',
      'Passe a prop titulo para configurar o cabeçalho do formulário. Como experimento temporário no painel, apresente duas instâncias de AlunoForm apontando para o mesmo handler adicionar.',
      'Cada formulário tem seu próprio nome, idade e regras. Ambos enviam registros ao mesmo pai, portanto a coleção é compartilhada por decisão do painel. Duas instâncias de AlunosPanel, em contraste, teriam coleções independentes.',
      'Digite um nome em cada formulário e observe que um não apaga o rascunho do outro. Cadastre pelos dois e confirme que a lista do painel recebe ambos. Depois retorne ao layout com um formulário para a entrega principal.',
      `<v-row>
  <v-col cols="12" md="6">
    <AlunoForm titulo="Cadastro da manhã" @adicionar="adicionar" />
  </v-col>
  <v-col cols="12" md="6">
    <AlunoForm titulo="Cadastro da tarde" @adicionar="adicionar" />
  </v-col>
</v-row>

<!-- Ambos alimentam alunos do mesmo painel.
     O título apenas configura a apresentação.
     Ele não cria automaticamente um campo turno no registro. -->`,
      [
        example(
          'Default e prop dinâmica',
          'A prop titulo já foi declarada no formulário completo. Não precisa duplicar seu código para mudar o cabeçalho.',
          `const props = defineProps({
  titulo: { type: String, default: 'Cadastrar aluno' },
})

// Sem titulo → usa Cadastrar aluno.
// titulo="Turma A" → recebe texto fixo.
// :titulo="nomeDaTurma" → lê a variável do pai.
// props.titulo é entrada, não um campo que o filho deve sobrescrever.`,
          'Explique por que um cabeçalho diferente não prova que existem dois arquivos de implementação.',
        ),
        example(
          'Estilo local e componente visual',
          'O CSS scoped do cartão dá uma responsabilidade visual local. O grid e o tema continuam disponíveis pelo Vuetify.',
          `<style scoped>
/* Em AlunoCard.vue: evita que nomes longos transbordem. */
.aluno-nome {
  overflow-wrap: anywhere;
}
</style>

<!-- No pai, cols e md organizam a posição das instâncias. -->
<!-- No cartão, pa-4 organiza o espaço interno. -->
<!-- Scoped limita os seletores deste estilo; não congela os dados. -->`,
          'Teste um nome longo e uma janela estreita. Verifique também o foco e o nome acessível de cada botão Remover.',
          'vue',
        ),
      ],
      'Dois formulários compartilham o rascunho? E dois painéis compartilham a coleção automaticamente?',
      'vue',
    ),

    stage(
      '8 · Desafio e revisão',
      'Comprove que a refatoração preservou o fluxo',
      'Agora feche os exemplos e explique a solução por responsabilidades. A entrega é um cadastro organizado e compreendido, não apenas três arquivos novos.',
      'Teste o fluxo completo e corrija um erro por vez. Como desafio, acrescente ao AlunoCard um evento apresentar com o id; o painel deve encontrar o aluno e escrever uma mensagem sem alterar o registro.',
      'Erros comuns: não importar o filho; passar uma string em vez de um objeto; esquecer o listener; descartar o payload com handler(); alterar props; criar ids durante a renderização. Diagnostique pelo trajeto do dado, não por tentativas aleatórias.',
      'Verifique idade vazia, zero e fracionária; dois nomes iguais; remoção por id; total e estado vazio; navegação por teclado. Cada aluno precisa explicar um fluxo e fazer uma alteração curta sem copiar a solução inteira.',
      `// Checklist da entrega
// [ ] AlunoForm mantém rascunho e validação.
// [ ] adicionar emite { nome, idade } somente quando válido.
// [ ] AlunosPanel mantém a única coleção alunos.
// [ ] AlunoCard recebe aluno por prop, sem mutá-lo.
// [ ] remover emite id; o pai filtra a coleção.
// [ ] Chaves são estáveis, criadas no cadastro.
// [ ] Enter, Limpar e validação continuam funcionando.
// [ ] Cada aluno explica evento → pai → estado → prop → tela.

// Próximo encontro, 19/11: computed, filtros e regras derivadas.`,
      [
        example(
          'Desafio: evento apresentar no cartão',
          'Integre as linhas nos blocos existentes. Não redeclare emit nem crie outro script setup.',
          `// Substitua a declaração anterior de emit por esta:
const emit = defineEmits(['remover', 'apresentar'])

function solicitarApresentacao() {
  emit('apresentar', props.aluno.id)
}

// No template do AlunoCard:
// <v-btn @click="solicitarApresentacao">Apresentar</v-btn>
// No uso do cartão, no painel:
// <AlunoCard :aluno="aluno" @remover="remover" @apresentar="apresentar" />`,
          'Faça primeiro a emissão e o listener. Só depois implemente a mensagem no pai.',
        ),
        example(
          'Uma correção possível no painel',
          'A consulta é feita na coleção do pai. O filho não precisa modificar o aluno para apresentá-lo.',
          `function apresentar(id) {
  const aluno = alunos.value.find(item => item.id === id)
  if (!aluno) return
  mensagem.value = aluno.nome + ' tem ' + aluno.idade + ' anos.'
}

// Critérios individuais (0, 1 ou 2 pontos cada; total 10):
// 1. Explica responsabilidades e fonte de verdade.
// 2. Passa prop com tipo e valor corretos.
// 3. Emite e recebe o payload correto.
// 4. Preserva cadastro, validação e remoção.
// 5. Implementa apresentar e justifica o fluxo.`,
          'Pergunta final: qual trecho mudaria se a mensagem fosse apresentada de outra forma? A responsabilidade pelos dados continuaria no pai.',
        ),
      ],
      'Consegue seguir o clique do botão do filho até a atualização da interface sem procurar nem alterar elementos manualmente no DOM?',
    ),
  ],
}
