// Aula de 19/11. As alterações são propostas para a cópia de trabalho do aluno.
// StudentView.vue e o cartão real da turma permanecem preservados.
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
      '3 min para explicar, 7 para construir junto, 3 para testar e 2 para justificar. Oito etapas somam 120 minutos. Se a turma precisar, priorize computed, busca e filtros; a persistência do último passo é apenas extensão.',
    ],
    ['O que alterar agora', change],
    ['O que o professor explica', explanation],
    ['Pare e confira', check],
    [
      'Integração na cópia do aluno',
      'Preserve o código e a navegação existentes. Atualize o script setup e a região da lista sem criar blocos duplicados. Os códigos aqui são propostas didáticas, não funções executadas automaticamente no cadastro da turma.',
    ],
  ],
  code,
  codeExamples,
  question,
  language,
})

const normalizeSource = `function normalizar(texto) {
  return String(texto ?? '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove marcas de acento.
    .toLocaleLowerCase('pt-BR').trim()
}
function idadeEmNumero(valor) {
  if (valor === null || valor === undefined || String(valor).trim() === '') return null
  const numero = Number(valor)
  return Number.isInteger(numero) && numero >= 0 && numero <= 120 ? numero : null
}`
const totalsSource = `const total = computed(() => alunos.value.length)
const maiores = computed(() => alunos.value.filter(aluno => {
  const numero = idadeEmNumero(aluno.idade)
  return numero !== null && numero >= 18
}).length)`
const searchSource = `const porNome = computed(() => {
  const termo = normalizar(busca.value)
  return alunos.value.filter(aluno => normalizar(aluno.nome).includes(termo))
})`
const filterSource = `const filtrados = computed(() => porNome.value.filter(aluno => {
  if (filtro.value === 'todos') return true
  const numero = idadeEmNumero(aluno.idade)
  if (numero === null) return false // Idade ausente não vira zero por acidente.
  return filtro.value === 'maiores' ? numero >= 18 : numero < 18
}))`
const sortSource = `const visiveis = computed(() => [...filtrados.value].sort((a, b) => {
  if (ordem.value === 'idade') {
    // Idades inválidas, se existirem na versão antiga, ficam ao final.
    return (idadeEmNumero(a.idade) ?? Infinity) - (idadeEmNumero(b.idade) ?? Infinity)
  }
  return a.nome.localeCompare(b.nome, 'pt-BR')
}))`

const fullSource = `<script setup>
import { computed, ref } from 'vue'
// Caminho real a partir de src/views/StudentView.vue:
import AlunoCard from '../components/aluno/AlunoCard.vue'

const nome = ref('')
const idade = ref('')
const id = ref(1) // Mantemos o identificador incremental do exercício.
const alunos = ref([])
const busca = ref('')
const filtro = ref('todos')
const ordem = ref('nome')
const mensagem = ref('')

${normalizeSource}

${totalsSource}

${searchSource}

${filterSource}

${sortSource}

const quantidadeVisivel = computed(() => visiveis.value.length)

function adicionar() {
  const texto = nome.value.trim()
  const numero = idadeEmNumero(idade.value)
  if (texto.length < 3 || texto.length > 80 || numero === null) {
    mensagem.value = 'Informe nome de 3 a 80 caracteres e idade inteira de 0 a 120.'
    return
  }
  alunos.value.push({ id: id.value++, nome: texto, idade: numero })
  mensagem.value = 'Adicionado: ' + texto
  nome.value = ''
  idade.value = ''
}
function deletarItem(alunoId) {
  const indice = alunos.value.findIndex(item => item.id === alunoId)
  if (indice === -1) return // splice(-1, 1) apagaria o último registro.
  const [removido] = alunos.value.splice(indice, 1)
  mensagem.value = 'Removido: ' + removido.nome
}
function limparFiltros() {
  busca.value = ''
  filtro.value = 'todos'
  // O cadastro e a ordenação são preservados.
}
</script>

<template>
  <!-- Integre esta seção ao v-main existente, sem criar outra v-app. -->
  <section aria-labelledby="painel-alunos">
    <h2 id="painel-alunos" class="text-h5 mb-4">Painel de alunos</h2>
    <v-card class="pa-4 mb-4" border>
      <v-form @submit.prevent="adicionar">
        <v-text-field v-model="nome" label="Nome" />
        <v-text-field v-model="idade" label="Idade" type="number" min="0" max="120" step="1" />
        <v-btn type="submit" color="primary">Adicionar</v-btn>
      </v-form>
    </v-card>
    <p class="mb-4">Total cadastrado: {{ total }} · Com 18 anos ou mais: {{ maiores }}</p>
    <v-text-field v-model="busca" label="Buscar aluno pelo nome" variant="outlined" />
    <div class="d-flex ga-2 flex-wrap mb-4" role="group" aria-label="Filtrar por idade">
      <v-btn :aria-pressed="filtro === 'todos'" @click="filtro = 'todos'">Todos</v-btn>
      <v-btn :aria-pressed="filtro === 'maiores'" @click="filtro = 'maiores'">18 anos ou mais</v-btn>
      <v-btn :aria-pressed="filtro === 'menores'" @click="filtro = 'menores'">Menos de 18</v-btn>
      <v-btn variant="text" @click="limparFiltros">Limpar filtros</v-btn>
    </div>
    <div class="d-flex ga-2 flex-wrap mb-4" role="group" aria-label="Ordenação">
      <v-btn :aria-pressed="ordem === 'nome'" @click="ordem = 'nome'">Nome A–Z</v-btn>
      <v-btn :aria-pressed="ordem === 'idade'" @click="ordem = 'idade'">Menor idade primeiro</v-btn>
    </div>
    <p class="mb-3" role="status" aria-live="polite">{{ quantidadeVisivel }} de {{ total }} aluno(s) visível(is).</p>
    <p class="mb-3" role="status">{{ mensagem }}</p>
    <p v-if="total === 0">Nenhum aluno cadastrado. Comece pelo formulário.</p>
    <p v-else-if="quantidadeVisivel === 0">Nenhum resultado. Altere a busca ou limpe os filtros.</p>
    <v-row v-else>
      <v-col v-for="aluno in visiveis" :key="aluno.id" cols="12" sm="6" md="4">
        <AlunoCard :aluno="aluno" @remover="deletarItem" />
      </v-col>
    </v-row>
  </section>
</template>`

export const lesson06 = {
  date: '19/11',
  weekday: 'Quinta-feira',
  title: 'Dados e regras da interface',
  summary:
    'Evolua o cadastro de alunos com computed, busca, filtros e ordenação, preservando uma única coleção.',
  files: [
    'src/views/StudentView.vue (existente)',
    'src/components/aluno/AlunoCard.vue (existente)',
    'src/data/lesson06.js (material da aula)',
  ],
  screens: [
    stage(
      '1 · Fonte de verdade',
      'Guarde os cadastros e derive as respostas',
      'O cadastro real da turma usa alunos, id incremental, adicionar(), deletarItem() e AlunoCard. Vamos evoluir esse exemplo sem criar um array independente para cada filtro.',
      'Na cópia de trabalho, identifique os dados de origem e prepare três registros de teste com id, nome e idade. Antes de filtrar, confira como idade é armazenada.',
      'alunos é a coleção original. busca, filtro e ordem são escolhas do usuário. Total e lista visível são respostas calculadas. Os campos v-text-field atuais podem fornecer texto: converta a idade na entrada e não trate vazio como zero.',
      'Use Lael 30, Maria 17 e João 20. A coleção tem três registros com ids diferentes e idades numéricas. O código atual da turma permanece preservado.',
      `// Exemplo isolado para prever resultados (não duplique alunos no arquivo):
const alunos = ref([
  { id: 1, nome: 'Lael', idade: 30 },
  { id: 2, nome: 'Maria', idade: 17 },
  { id: 3, nome: 'João', idade: 20 },
])

// Dados que o usuário pode alterar:
const busca = ref('')
const filtro = ref('todos')
const ordem = ref('nome')

// Se usar esses dados com cadastro incremental, o próximo id deve ser 4.
// Não use alunos.value.length + 1: remover itens pode repetir ids.`,
      [
        example(
          'O perigo de transformar vazio em zero',
          'Função auxiliar para ler idades, inclusive quando existem registros antigos com texto.',
          normalizeSource,
          "idadeEmNumero('') retorna null; idadeEmNumero('0') retorna 0. Isso evita classificar uma idade ausente como menor de 18.",
        ),
        example(
          'Um detalhe importante no remover atual',
          'Esta é uma melhoria proposta na cópia do aluno. findIndex pode retornar -1; confira antes de usar splice.',
          `function deletarItem(alunoId) {
  const indice = alunos.value.findIndex(item => item.id === alunoId)
  if (indice === -1) return
  alunos.value.splice(indice, 1)
}

// Sem essa guarda, splice(-1, 1) removeria o último registro.
// A ordenação visual não deve ser usada como índice da coleção original.`,
          'Teste id inexistente: nenhum aluno deve sumir. A identidade é o id, não a posição exibida.',
        ),
      ],
      'Quais valores precisam ser guardados e quais podem ser calculados a partir deles?',
    ),

    stage(
      '2 · Computed',
      'Calcule totais sem sincronizar outro contador',
      'Uma propriedade computada expressa uma relação entre dados reativos. Vamos usá-la para o total e para a quantidade de alunos com 18 anos ou mais.',
      'Acrescente computed à importação de vue e declare total e maiores após os refs. Reaproveite idadeEmNumero do primeiro passo. Mostre os indicadores no template.',
      'computed acompanha dependências reativas e mantém o resultado em cache até elas mudarem. Seu getter deve calcular e devolver uma resposta, sem cadastrar, remover ou salvar. No script acessamos total.value; no template basta total.',
      'Com os três registros de teste, total é 3 e maiores é 2. Ao remover Maria, total vira 2 e maiores continua 2, sem atualizações manuais dos indicadores.',
      `import { computed, ref } from 'vue'

${totalsSource}

console.log(total.value) // No script.
// No template: {{ total }}
// Não execute total.value++: total é derivado, não um contador independente.`,
      [
        example(
          'Apresente os resultados do cálculo',
          'As propriedades são desembrulhadas no template, como refs de nível superior.',
          `<v-card class="pa-4 mb-4" border>
  <v-card-title>Resumo da turma</v-card-title>
  <v-card-text>
    <p>Total cadastrado: {{ total }}</p>
    <p>18 anos ou mais: {{ maiores }}</p>
  </v-card-text>
</v-card>`,
          'Cadastre outro aluno de 18 anos. Os dois indicadores devem atualizar por dependerem da coleção.',
          'vue',
        ),
        example(
          'Função, ref e computed não são a mesma coisa',
          'Use uma função para ações e uma derivação para a resposta que a tela precisa ler.',
          `// Estado de origem:
const alunos = ref([])

// Uma função pode calcular quando chamada:
function contar() { return alunos.value.length }

// Computed declara uma resposta derivada com cache reativo:
const total = computed(() => alunos.value.length)

// Evite: const total = ref(alunos.value.length)
// Esse ref seria só uma foto inicial; não acompanha automaticamente alunos.`,
          'Explique por que não precisamos escrever total.value = alunos.value.length dentro de adicionar e deletarItem.',
        ),
      ],
      'Por que manter um ref separado para total aumentaria o risco de inconsistência?',
    ),

    stage(
      '3 · Busca por nome',
      'Filtre uma visão sem apagar os cadastros',
      'Vamos capturar a pesquisa com v-model e derivar porNome. Uma busca não deve alterar a coleção alunos.',
      "Crie busca = ref(''), acrescente o campo de pesquisa e declare porNome com computed. Reutilize normalizar. Temporariamente, aponte o v-for para porNome.",
      'filter devolve um novo array com os itens aceitos; não exclui os outros da origem. normalizar aproxima João de joao e ignora maiúsculas e espaços nas pontas. A busca vazia encontra todos porque todo texto inclui a string vazia.',
      'Pesquise joao e veja João. Pesquise MAR e veja Maria. Apague a busca: os três reaparecem, sem um novo cadastro.',
      searchSource,
      [
        example(
          'Campo de pesquisa e lista',
          'Atualize o loop existente; não acrescente uma segunda lista paralela.',
          `<v-text-field v-model="busca" label="Buscar aluno pelo nome" variant="outlined" />
<v-row>
  <v-col v-for="aluno in porNome" :key="aluno.id" cols="12" md="4">
    <AlunoCard :aluno="aluno" @remover="deletarItem" />
  </v-col>
</v-row>`,
          'O campo de busca não substitui nome do formulário. São dois refs com responsabilidades diferentes.',
          'vue',
        ),
        example(
          'Erro que apaga a origem',
          'Compare a atribuição destrutiva com a visão derivada.',
          `// EVITE como implementação de pesquisa:
// alunos.value = alunos.value.filter(aluno => aluno.nome.includes(busca.value))
// Ao limpar a busca, os registros descartados não voltariam.

// PREFIRA: alunos permanece a fonte original.
const porNome = computed(() => {
  const termo = normalizar(busca.value)
  return alunos.value.filter(aluno => normalizar(aluno.nome).includes(termo))
})`,
          'Critério: buscar e limpar não muda o tamanho da coleção original.',
        ),
      ],
      'O que acontece com total quando a busca mostra só um aluno? Ele deve contar a origem ou o resultado visível?',
    ),

    stage(
      '4 · Filtros combinados',
      'Combine o nome com a faixa de idade',
      'Agora a mesma tela pode buscar por nome e escolher todos, 18 anos ou mais, ou menos de 18. As duas condições precisam ser satisfeitas.',
      "Crie filtro = ref('todos'), os três botões e filtrados. O cálculo deve partir de porNome, não recomeçar da coleção original. Atualize o loop para filtrados.",
      'As dependências formam um fluxo: alunos → porNome → filtrados. Alterar um controle recalcula as respostas necessárias. Não existe a antiga sintaxe de filtros do Vue 2 aqui: usamos JavaScript dentro de computed.',
      'Busque joao e escolha Menos de 18: zero resultados. Limpe somente a busca: Maria aparece porque a faixa continua selecionada.',
      filterSource,
      [
        example(
          'Botões que alteram o estado do filtro',
          'aria-pressed informa a seleção sem depender apenas da cor.',
          `<div class="d-flex ga-2 flex-wrap" role="group" aria-label="Filtrar por idade">
  <v-btn :aria-pressed="filtro === 'todos'" @click="filtro = 'todos'">Todos</v-btn>
  <v-btn :aria-pressed="filtro === 'maiores'" @click="filtro = 'maiores'">18 anos ou mais</v-btn>
  <v-btn :aria-pressed="filtro === 'menores'" @click="filtro = 'menores'">Menos de 18</v-btn>
</div>`,
          'Idade 18 pertence à opção 18 anos ou mais; idade 17 pertence à opção Menos de 18.',
          'vue',
        ),
        example(
          'Reiniciar controles não é apagar registros',
          'A ação altera apenas estados de origem dos controles, e computed faz o restante.',
          `function limparFiltros() {
  busca.value = ''
  filtro.value = 'todos'
}

// alunos não muda e o formulário não perde seu rascunho.
// Não faça filtrados.value = alunos.value.
// filtrados é uma resposta calculada, não a coleção editável.`,
          'Teste se nome e idade que você estava digitando no cadastro continuam lá ao limpar os filtros.',
        ),
      ],
      'Por que o segundo filtro parte de porNome? O que seria perdido se ele partisse sempre de alunos?',
    ),

    stage(
      '5 · Ordenação',
      'Reorganize a apresentação preservando a origem',
      'Vamos oferecer ordem alfabética ou menor idade primeiro. Ordenar é diferente de filtrar: os mesmos itens podem mudar de posição sem serem removidos.',
      "Crie ordem = ref('nome') e visiveis, partindo de filtrados. Troque o loop para visiveis. Use uma cópia antes de sort.",
      'sort altera o array em que é chamado. [...filtrados.value] cria a cópia que pode ser ordenada. Os objetos mantêm suas identidades; por isso o id continua sendo a chave e o argumento da exclusão. Idade deve ser comparada numericamente, não como texto.',
      'Por nome: João, Lael, Maria. Por idade: Maria 17, João 20, Lael 30. Confira que alunos continua na ordem original de cadastro.',
      sortSource,
      [
        example(
          'Controle da ordenação',
          'Os botões já existem no registro do projeto. Não é preciso acrescentar um seletor novo ao plugin.',
          `<div class="d-flex ga-2 flex-wrap" role="group" aria-label="Ordenação">
  <v-btn :aria-pressed="ordem === 'nome'" @click="ordem = 'nome'">Nome A–Z</v-btn>
  <v-btn :aria-pressed="ordem === 'idade'" @click="ordem = 'idade'">Menor idade primeiro</v-btn>
</div>`,
          'Mude a ordenação com a busca ativa: somente os registros encontrados são reorganizados.',
          'vue',
        ),
        example(
          'Exclusão continua pelo id',
          'Não use a posição que aparece no resultado filtrado para remover da coleção original.',
          `// Origem: Lael (id 1), Maria (id 2), João (id 3).
// Resultado por idade: Maria (id 2), João (id 3), Lael (id 1).
// O primeiro cartão visível não corresponde ao índice 0 da origem.

// No loop final:
// <AlunoCard :aluno="aluno" @remover="deletarItem" />
// O filho já emite aluno.id. Preserve esse contrato.

// Cuidado: sort dentro de um getter não deve alterar alunos.value.`,
          'Exclua Maria com a ordenação por idade. Lael e João devem permanecer, mesmo que a ordem visual mude.',
        ),
      ],
      'Por que [...array].sort(...) é mais adequado que ordenar alunos.value diretamente dentro de computed?',
    ),

    stage(
      '6 · Estados da tela',
      'Diferencie cadastro vazio de resultado vazio',
      'A interface deve explicar por que nada aparece. Não ter cadastros e não encontrar resultados são situações diferentes.',
      'Crie quantidadeVisivel e organize as condições na ordem: origem vazia, busca sem resultados, lista. Mostre X de Y visíveis junto dos indicadores gerais.',
      'Total geral depende de alunos. Quantidade visível depende de visiveis. Uma mudança de filtro pode alterar o segundo sem alterar o primeiro. v-else-if e v-else precisam estar ligados à condição anterior, sem outro elemento entre as ramificações.',
      'Com três cadastros e busca xyz: 0 de 3 visíveis e orientação para alterar os filtros. Com zero cadastros: orientação para preencher o formulário.',
      `<p role="status" aria-live="polite">{{ quantidadeVisivel }} de {{ total }} aluno(s) visível(is).</p>
<p v-if="total === 0">Nenhum aluno cadastrado. Comece pelo formulário.</p>
<p v-else-if="quantidadeVisivel === 0">Nenhum resultado. Altere a busca ou limpe os filtros.</p>
<v-row v-else>
  <v-col v-for="aluno in visiveis" :key="aluno.id" cols="12" sm="6" md="4">
    <AlunoCard :aluno="aluno" @remover="deletarItem" />
  </v-col>
</v-row>`,
      [
        example(
          'Derive o resultado visível',
          'O total cadastrado permanece independente da seleção atual.',
          `const quantidadeVisivel = computed(() => visiveis.value.length)

// Três cadastros e nenhum filtro: 3 de 3.
// Busca Maria: 1 de 3.
// Busca Maria + 18 anos ou mais: 0 de 3.
// Limpar filtros: 3 de 3 novamente.
// Nenhuma dessas ações cadastra ou remove alunos.`,
          'O aluno deve prever os dois números separadamente para cada combinação de controles.',
        ),
        example(
          'Desafio: média das idades conhecidas',
          'Extensão curta: exclua idades inválidas do denominador e trate divisão por zero.',
          `const mediaIdade = computed(() => {
  const idades = alunos.value.map(aluno => idadeEmNumero(aluno.idade))
    .filter(numero => numero !== null)
  if (idades.length === 0) return null
  return idades.reduce((soma, numero) => soma + numero, 0) / idades.length
})

// No template:
// {{ mediaIdade === null ? 'Sem idades válidas' : mediaIdade.toFixed(1) }}
// Idade 0 participa da média: não use filter(Boolean).`,
          'Com 30, 17 e 20, a média é aproximadamente 22,3. Explique se a média escolhida é geral ou apenas dos resultados visíveis.',
        ),
      ],
      'Se a tela mostra 0 de 3, precisamos orientar a cadastrar de novo ou a rever os filtros?',
      'vue',
    ),

    stage(
      '7 · Integrar',
      'Veja o fluxo completo, sem estado duplicado',
      'Esta solução de referência junta os passos. Compare com sua cópia antes de consultar o bloco completo; evite substituir o arquivo inteiro sem entender as mudanças.',
      'Integre o script e o conteúdo do painel à cópia de StudentView.vue. Preserve v-app, v-app-bar e o botão de retorno. O AlunoCard real continua em components/aluno, no singular.',
      'Os getters só leem e calculam. adicionar e deletarItem são ações que mudam a origem. limparFiltros muda controles. A lista visível sempre nasce da mesma coleção. Nenhum watch é necessário para recalcular totais, resultados ou ordenação.',
      'Cadastre, busque, filtre, ordene e exclua com a busca ativa. Os indicadores gerais, as mensagens e a lista precisam continuar coerentes. Vazio e idade inválida não entram na versão proposta de cadastro.',
      fullSource,
      [
        example(
          'Matriz para testar em dupla',
          'Um aluno faz a previsão e o outro realiza a ação; depois troquem os papéis.',
          `// Base: Lael 30, Maria 17 e João 20.
// 1. Todos, busca vazia: total 3, maiores 2, visíveis 3.
// 2. Busca joao: visíveis 1; total permanece 3.
// 3. Menos de 18 com joao: visíveis 0.
// 4. Limpar filtros: visíveis 3.
// 5. Ordenar por idade: Maria, João, Lael.
// 6. Excluir Maria pelo cartão: origem fica Lael e João.
// 7. Excluir id inexistente: nenhum registro some.
// 8. Remover todos: mensagem de cadastro vazio.`,
          'Critério: cada aluno explica o caminho controle → estado → computed → template, sem manipular os cartões manualmente.',
        ),
        example(
          'Leia o encadeamento das dependências',
          'Se uma resposta depende de outra computed, o Vue acompanha essa leitura.',
          `// alunos ──→ total
//        ├─→ maiores
//        └─→ porNome ← busca
//               └─→ filtrados ← filtro
//                       └─→ visiveis ← ordem
//                               └─→ quantidadeVisivel

// Nenhum destes cálculos precisa fazer push ou splice.
// As ações alteram a origem; o Vue deriva a apresentação.`,
          'Pergunta: mudar apenas ordem precisa mudar total? Não. A origem não foi alterada.',
        ),
      ],
      'Quais funções alteram dados e quais só calculam respostas? Mostre uma linha de cada caso.',
      'vue',
    ),

    stage(
      '8 · Watch e revisão',
      'Observe mudanças apenas quando existe um efeito',
      'Fechamos comparando valores derivados e efeitos. O cadastro atual não possui persistência. O exercício obrigatório continua em memória; salvar uma preferência é apenas uma extensão opcional.',
      'Primeiro conclua os testes dos filtros. Depois, se houver tempo, importe watch e guarde somente a preferência de busca em localStorage, restaurando-a antes de registrar o watcher.',
      'computed devolve uma resposta para a interface. watch executa um efeito quando a origem observada muda. Salvar no navegador é um efeito; recalcular total não exige watch. Este exemplo não salva alunos, não cria API e não compartilha dados entre computadores.',
      'Sem a extensão, recarregar perde a coleção e os controles. Com a extensão, apenas a busca pode voltar; os alunos continuam em memória. Uma falha de armazenamento não deve impedir usar a tela.',
      `// Extensão opcional: acrescente watch à importação do Vue.
// Não redeclare busca, que já existe no componente.
const chaveBusca = 'cadastro-alunos:busca:v1'
try {
  const salva = localStorage.getItem(chaveBusca)
  if (salva !== null) busca.value = salva
} catch {
  mensagem.value = 'Não foi possível restaurar a preferência de busca.'
}

watch(busca, valor => {
  try {
    localStorage.setItem(chaveBusca, valor)
  } catch {
    mensagem.value = 'A busca funciona, mas não foi possível salvar a preferência.'
  }
})

// Isso persiste só a string de busca. Não salva alunos nem os ids.`,
      [
        example(
          'Desafio obrigatório: indicador por resultado',
          'Crie uma propriedade computada que conta alunos com 18 anos ou mais somente na lista visível. Não mantenha outro ref.',
          `const maioresVisiveis = computed(() => visiveis.value.filter(aluno => {
  const numero = idadeEmNumero(aluno.idade)
  return numero !== null && numero >= 18
}).length)

// Compare maiores (origem) e maioresVisiveis (resultado).
// Com filtro menores: maioresVisiveis deve ser 0.
// Limpar filtros deve restaurar a contagem visível.`,
          'O aluno precisa justificar qual coleção serve de origem para o cálculo, além de obter o número esperado.',
        ),
        example(
          'Checklist e avaliação individual',
          'Peça uma pequena alteração sem mostrar a solução pronta: mudar a ordenação para idade decrescente ou contar os menores visíveis.',
          `// [ ] Uma única coleção de origem.
// [ ] Totais derivados com computed, sem sincronização manual.
// [ ] Busca e faixa de idade funcionam juntas.
// [ ] Ordenação não modifica a origem.
// [ ] Remoção usa id e protege findIndex === -1.
// [ ] Cadastro vazio é diferente de resultado vazio.
// [ ] Explica computed versus watch.
// [ ] Informa o que se perde ao recarregar.

// 2 pontos por item: origem, derivação, combinação, identidade e explicação.
// Total: 10 pontos. Extensão de persistência não é obrigatória.
// Próxima aula, 24/11: carregar dados locais com estados de espera e erro.`,
          'Faça a conferência em dupla e peça uma explicação individual do fluxo. Corrigir o número sem explicar a origem não conclui a atividade.',
        ),
      ],
      'Qual parte desta aula precisa de computed e qual poderia precisar de watch? A extensão salva a coleção de alunos?',
    ),
  ],
}
