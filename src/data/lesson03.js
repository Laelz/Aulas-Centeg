// Aula de 10/11. Os códigos são material para leitura e propostas de exercício.
// WelcomeView.vue é apenas referência: suas alterações não são sobrescritas.
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
      '5 minutos de explicação, 5 de leitura dos códigos e 5 de previsão ou discussão. Responda antes da demonstração; quem não estiver com o ambiente pronto pode acompanhar pelo caderno. As oito etapas somam 120 minutos.',
    ],
    ...points,
  ],
  code,
  codeExamples,
  question,
  language,
})

export const lesson03 = {
  date: '10/11',
  weekday: 'Terça-feira',
  title: 'Reatividade e eventos',
  summary:
    'Do ref ao clique: leia, preveja e explique as mudanças na interface com funções e código comentado.',
  files: ['src/views/WelcomeView.vue', 'src/plugins/vuetify.js', 'src/data/lesson03.js'],
  screens: [
    stage(
      'Estado e ref',
      'O que fica guardado dentro de um ref?',
      'Hoje vamos responder às dúvidas da turma sobre mensagem.value, constantes e chamadas de funções. Comece pelo dado: a tela só acompanha uma mudança quando essa informação participa do sistema reativo do Vue.',
      [
        [
          'Estado é informação que pode mudar',
          'Uma saudação, um número de cliques, um saldo e uma condição são dados. ref permite ao Vue acompanhar a leitura e a alteração desses valores. Não confunda o objeto ref com o valor que ele guarda.',
        ],
        [
          'Importação e valor inicial',
          "Importamos ref de vue dentro de script setup. ref(0) começa com número; ref('') começa com texto vazio; ref(false) começa com booleano. Escolha o tipo pela regra do exemplo.",
        ],
        [
          'Objeto reativo, não um objeto comum',
          "Visualizar ref('') como uma caixa com value: '' ajuda, mas o Vue também mantém mecanismos de rastreamento. Um objeto comum { value: '' } não ganha essa reatividade automaticamente.",
        ],
        [
          'Recorte real do Welcome',
          'O arquivo atual contém greetings, perfil, telefone, condicao, saldo e debito. Nem toda variável precisa aparecer na tela. Se um dado não for usado pelo template, mudar esse dado não cria automaticamente um texto visível.',
        ],
      ],
      `import { ref } from 'vue'

const mensagem = ref('') // Um ref que guarda uma string vazia.
const cliques = ref(0)  // Um ref que guarda um número.
const visivel = ref(false) // Um ref que guarda um booleano.

console.log(mensagem.value) // ''
console.log(cliques.value)  // 0
console.log(visivel.value)  // false

// mensagem representa o objeto ref; mensagem.value é o texto.
mensagem.value = 'Olá, Lael!'
console.log(mensagem.value) // 'Olá, Lael!'`,
      [
        example(
          'O formato mental da caixa',
          'Compare os objetos e explique o que essa comparação ensina e o que ela não representa.',
          `const caixaComum = { value: '' }
const mensagem = ref('') // Pressupõe import { ref } from 'vue'.

caixaComum.value = 'Olá' // JavaScript permite alterar a propriedade.
mensagem.value = 'Olá'  // O Vue também acompanha essa alteração.

// Ambos têm uma propriedade value acessível.
// Só criar { value: '' } não equivale a chamar ref('').
// O objeto real do Vue pode mostrar campos internos no console.`,
          'Resposta: .value é a forma de acessar o conteúdo. O ref tem recursos internos além dessa propriedade; não memorize os campos internos mostrados no console.',
        ),
        example(
          'Dados encontrados na demonstração',
          'Recorte do script atual, com comentários adicionados para leitura. Os valores são exemplos de aula.',
          `const greetings = ref(0)         // Contador de saudações.
const perfil = ref('Gustavo')     // Nome de exemplo.
const telefone = ref('81 9999-9999') // Texto, não operação aritmética.
const condicao = ref(false)      // Condição booleana.
const saldo = ref(1000)          // Número para o exercício.
const debito = ref(0)            // Número para o exercício.

// Previsão: o que você imprimiria para ler o nome?
console.log(perfil.value) // Gustavo`,
          'No caderno: classifique cada valor como número, texto ou booleano. Explique por que telefone não deve ser tratado como quantidade para somar.',
        ),
      ],
      'Qual é a diferença entre mensagem e mensagem.value? O que ref(0) guarda inicialmente?',
    ),

    stage(
      'Const e .value',
      'Como uma constante pode ter seu conteúdo alterado?',
      'const protege a associação entre o nome da variável e o objeto. Ele não torna todas as propriedades desse objeto imutáveis. Essa regra é do JavaScript e também vale para os refs do Vue.',
      [
        [
          'Referência constante, conteúdo variável',
          "const mensagem = ref('') impede reatribuir mensagem. Escrever mensagem.value = 'Olá' muda uma propriedade do objeto já referenciado. Por isso não precisamos trocar const por let para atualizar o conteúdo do ref.",
        ],
        [
          'No script, use .value',
          'Funções escritas no script leem e escrevem mensagem.value ou greetings.value. Esquecer .value pode produzir erros de atribuição ou cálculos com o objeto em vez de seu conteúdo.',
        ],
        [
          'No template, o acesso é simplificado',
          'Um ref de nível superior em script setup é desembrulhado no template. Use {{ mensagem }} e @click="greetings++". Não generalize essa regra para qualquer objeto aninhado; estamos estudando refs de nível superior.',
        ],
        [
          'Previsão antes da execução',
          'Leia cada linha e escreva o valor final. Não execute os trechos com erro junto dos trechos corretos: erros intencionais servem para diagnóstico e interromperiam o exemplo.',
        ],
      ],
      `import { ref } from 'vue'

const mensagem = ref('')
mensagem.value = 'Olá!' // Permitido: altera a propriedade.
mensagem.value = 'Tudo bem?' // Continua sendo o mesmo ref.

// ERRO INTENCIONAL: não execute junto do código acima.
// mensagem = ref('Outro texto')
// Isso tenta reatribuir a variável declarada com const.

// A mesma regra em um objeto comum:
const aluno = { nome: 'Lael' }
aluno.nome = 'Maria' // Permitido.
// aluno = { nome: 'João' } // Não permitido.`,
      [
        example(
          'Mesmo dado, duas formas de acesso',
          'Um componente proposto para leitura. O script usa .value; a interpolação usa apenas o nome.',
          `<script setup>
import { ref } from 'vue'
const mensagem = ref('Olá')

function mudarMensagem() {
  mensagem.value = 'Bem-vindos à aula!'
}
</script>

<template>
  <!-- Vue lê o conteúdo do ref de nível superior. -->
  <p>{{ mensagem }}</p>
  <v-btn @click="mudarMensagem">Mudar mensagem</v-btn>
</template>`,
          'Antes do clique: Olá. Depois: Bem-vindos à aula! A referência não foi substituída.',
          'vue',
        ),
        example(
          'Leia as operações na ordem',
          'Não é necessário DOM nem template para prever os números.',
          `const quantidade = ref(1) // Pressupõe o import de ref.
quantidade.value += 2     // 1 + 2 → 3
quantidade.value++        // 3 + 1 → 4
quantidade.value = 0      // Agora volta a zero.

console.log(quantidade.value) // 0
// O const permaneceu o mesmo durante todas as operações.`,
          'Desafio oral: se a linha que escreve zero for retirada, qual será o resultado? Resposta: 4.',
        ),
      ],
      "Por que mensagem.value = 'Olá' é permitido e mensagem = ref('Olá') não é?",
    ),

    stage(
      'Funções',
      'Declare uma ação e escolha seus parâmetros',
      'Com script setup, uma função declarada no nível superior fica disponível no template. Não precisamos colocá-la em methods nem acessá-la com this.',
      [
        [
          'Declarar não é executar',
          'function cumprimentar() define o que fazer. cumprimentar() executa essa ação. A chamada pode acontecer em outra função ou como resposta a um evento.',
        ],
        [
          'Parâmetros e argumentos',
          'nome na declaração é um parâmetro. O texto Lael na chamada é um argumento. Nomes como num1 e num2 recebem valores na ordem em que são enviados.',
        ],
        [
          'Escopo e resultado',
          'Uma variável declarada dentro da função pertence àquele escopo. return entrega um resultado a quem chamou; não cria sozinho uma mensagem na tela. Para mostrar, use o retorno no template ou armazene-o em estado.',
        ],
        [
          'Números e textos',
          "O operador + soma números, mas também concatena textos. Compare somar(2, 3) com somar('2', 3) e não suponha que os resultados tenham o mesmo tipo.",
        ],
      ],
      `import { ref } from 'vue'
const mensagem = ref('')

function cumprimentar(nome) { // nome recebe um argumento.
  mensagem.value = 'Olá, ' + nome + '!'
}

// Chamada no próprio JavaScript:
cumprimentar('Lael')
console.log(mensagem.value) // Olá, Lael!

// Em um componente, essa chamada de nível superior acontece
// durante o setup da instância; não aguarda um clique.`,
      [
        example(
          'Chamando com argumentos pelo template',
          'A expressão está dentro de @click: será avaliada quando o clique acontecer.',
          `<script setup>
import { ref } from 'vue'
const mensagem = ref('')

function cumprimentar(nome) {
  mensagem.value = 'Olá, ' + nome + '!'
}
</script>

<template>
  <v-btn @click="cumprimentar('Lael')">Saudar Lael</v-btn>
  <v-btn @click="cumprimentar('Turma')">Saudar a turma</v-btn>
  <p role="status" aria-live="polite">{{ mensagem }}</p>
</template>`,
          'Clique em Lael e depois em Turma. Só há um ref de mensagem: o segundo resultado substitui o primeiro.',
          'vue',
        ),
        example(
          'A função aula encontrada no Welcome',
          'Recorte do cálculo atual com observações. A ordem da soma de números não muda o total, mas os valores recebidos e seus tipos importam.',
          `function aula(num1, num2) {
  const soma = greetings.value + num2 + num1
  return 'A soma é :  ' + soma
}

// Supondo greetings.value === 0:
console.log(aula(2, 3)) // A soma é :  5
// soma só existe dentro da função.
// A função retorna texto; não modifica greetings.

function somar(a, b) { return a + b }
console.log(somar(2, 3))   // 5 (número)
console.log(somar('2', 3)) // '23' (texto)`,
          'Pergunta: chamar aula(2, 3) aumenta o contador? Não: a função lê greetings e retorna um cálculo; não atribui um novo valor a ele.',
        ),
      ],
      'Se uma função retorna um texto, em que lugar esse texto precisa ser usado para aparecer na tela?',
    ),

    stage(
      'Eventos',
      'Conecte a intenção do usuário à função',
      'Um evento comunica uma interação. @click é a forma curta de v-on:click. O Vue conecta esse evento à lógica; o Vuetify apresenta o botão.',
      [
        [
          'Referência de função',
          '@click="saudar" entrega uma função para ser chamada quando houver clique. Se você não precisa enviar argumentos próprios, essa forma costuma ser suficiente.',
        ],
        [
          'Chamada dentro do evento',
          '@click="saudar()" também é válido. A expressão de evento será executada no clique, não imediatamente na renderização. Com parâmetros, use @click="saudar(\'Lael\')".',
        ],
        [
          'Diferença para interpolação',
          '{{ saudar() }} faz uma chamada durante a renderização para obter o que será exibido. Não coloque aí uma função que muda estado: ela pode disparar renderizações repetidas.',
        ],
        [
          'Objeto do evento',
          'Um handler passado como referência pode receber o evento do clique. Se você passa argumentos próprios e também precisa do evento, use $event na expressão. É uma leitura complementar; o exercício principal usa funções sem depender do mouse.',
        ],
        [
          'Atividade',
          'Classifique: declaração de função, chamada imediata no script, referência no @click e chamada no texto. Explique quando cada uma acontece.',
        ],
      ],
      `<script setup>
import { ref } from 'vue'
const greetings = ref(0)

function saudar() {
  greetings.value += 1 // Só executa quando a função é chamada.
}
</script>

<template>
  <!-- As duas formas abaixo aguardam o clique. -->
  <v-btn @click="saudar">Saudar</v-btn>
  <v-btn @click="saudar()">Saudar também</v-btn>
  <p>Saudações: {{ greetings }}</p>
</template>`,
      [
        example(
          'Parâmetro e evento no mesmo handler',
          'Exemplo complementar para identificar argumentos. Não é necessário usar event para incrementar um contador.',
          `function registrar(origem, event) {
  console.log(origem)      // 'botao'
  console.log(event.type)  // 'click'
}

// No template:
// <v-btn @click="registrar('botao', $event)">Registrar</v-btn>

// Com @click="registrar", o primeiro argumento seria o evento.
// O nome do parâmetro na função não transforma o tipo recebido.`,
          'Resposta: $event representa o evento disponível na expressão do template, não uma variável que precisamos declarar em script setup.',
        ),
        example(
          'O que acontece agora e o que espera um clique?',
          'Leia as linhas separadamente. Não as use simultaneamente para testar o contador do exemplo.',
          `// No script: executa durante o setup.
saudar()

// No template: registra a reação ao clique.
// <v-btn @click="saudar">Saudar</v-btn>

// No template: também espera o clique, com argumento próprio.
// <v-btn @click="cumprimentar('Lael')">Saudar</v-btn>

// EVITE: chamada que altera estado durante a renderização.
// <p>{{ saudar() }}</p>
// Além de não retornar uma mensagem, essa função altera o contador.`,
          'O problema não é a presença dos parênteses, mas o contexto em que a chamada aparece e o que ela faz.',
        ),
      ],
      'Por que @click="saudar()" é válido, mas {{ saudar() }} não é adequado para a função que incrementa o contador?',
      'vue',
    ),

    stage(
      'Retornar ou alterar',
      'O cálculo muda ou o saldo foi realmente atualizado?',
      'A demonstração atual é ótima para investigar essa diferença: pagar() retorna saldo menos débito e o botão incrementa debito. Vamos prever o resultado sem alterar o arquivo da turma.',
      [
        [
          'O que já existe',
          'No Welcome atual, saldo começa em 1000, debito em zero e o botão usa @click="debito++". A mensagem de saudação lê greetings, que não é incrementado por esse botão. São dados diferentes, portanto não precisam mudar juntos.',
        ],
        [
          'Retorno não é atribuição',
          'pagar() calcula um valor local e retorna o resultado. Não há saldo.value = ... dentro dela; por isso saldo continua 1000. O número exibido pelo cálculo pode mudar quando debito muda.',
        ],
        [
          'Leitura durante a renderização',
          '{{ pagar() }} chama a função para apresentar o retorno. Ela não deve alterar estado durante essa leitura. Para uma ação que efetiva a alteração, crie outro handler e chame-o pelo botão.',
        ],
        [
          'Previsão do código atual',
          'Sem cliques: 1000 - 0 = 1000. Após um clique: 1000 - 1 = 999. Após dois: 1000 - 2 = 998. O saldo guardado permanece 1000. greetings continua zero e a saudação não muda.',
        ],
        [
          'Escopo da aula',
          'Saldo e débito são exemplos numéricos de interface. Não há pagamento real, API ou carrinho funcional por trás do botão Carrinho. Valores derivados com computed serão aprofundados em 19/11.',
        ],
      ],
      `// Recorte da lógica atual de WelcomeView.vue:
const saldo = ref(1000)
const debito = ref(0)

function pagar() {
  let valor = saldo.value - debito.value
  return valor // Devolve o cálculo; não escreve em saldo.
}

// No template atual:
// <v-btn @click="debito++">...</v-btn>
// <p>{{ pagar() }}</p>

// Após dois cliques:
// saldo.value === 1000
// debito.value === 2
// pagar() retorna 998.`,
      [
        example(
          'Proposta: separar consulta de alteração',
          'Este exemplo é uma alternativa didática, não uma mudança já aplicada ao Welcome. Repare na linha de atribuição.',
          `function calcularSaldoDepoisDoDebito() {
  return saldo.value - debito.value // Só calcula.
}

function confirmarDebito() {
  if (debito.value <= 0 || debito.value > saldo.value) return
  saldo.value = calcularSaldoDepoisDoDebito() // Atualiza o estado.
  debito.value = 0 // Evita reaplicar o mesmo débito sem intenção.
}

// Exibir o cálculo: {{ calcularSaldoDepoisDoDebito() }}
// Confirmar por evento: @click="confirmarDebito"
// Não usar {{ confirmarDebito() }} para renderizar texto.`,
          'Com saldo 1000 e débito 50, a consulta devolve 950 sem alterar saldo. A confirmação grava 950 e zera débito.',
        ),
        example(
          'Rastreie o estado numa tabela',
          'No caderno, preencha sem executar. Depois confira com a projeção do exemplo atual.',
          `// Código ATUAL: botão incrementa debito; pagar() só calcula.
// momento     greetings   saldo   debito   pagar()
// inicial         0        1000      0      1000
// 1 clique        0        1000      1       999
// 2 cliques       0        1000      2       998

// Pergunta: por que o rótulo "Dizer olá" não muda?
// Ele depende de greetings, mas o evento altera debito.
// Se a intenção for saudar, o handler deve alterar greetings.
// Se a intenção for débito, o rótulo deve descrever essa ação.`,
          'Critério: o aluno precisa apontar o estado lido e o estado alterado, em vez de atribuir a diferença a uma falha de reatividade.',
        ),
      ],
      'Se o texto exibido passou de 1000 para 999, isso prova que saldo.value foi alterado? Mostre a linha que sustentaria sua resposta.',
    ),

    stage(
      'Vinculação e regras',
      'Deixe o estado controlar também os atributos',
      'Reatividade não muda apenas texto. Uma expressão pode controlar se um botão fica desabilitado, sua cor e seus atributos acessíveis.',
      [
        [
          'Texto fixo versus expressão',
          'color="primary" passa o texto primary ao componente. :color="corDoBotao" avalia uma variável. :disabled="greetings === 0" avalia uma comparação e produz booleano.',
        ],
        [
          'Regra do reinício',
          'Se greetings já está em zero, Reiniciar não precisa estar disponível. A função também pode verificar essa condição; aparência e regra têm responsabilidades relacionadas, mas distintas.',
        ],
        [
          'Booleanos não são frases',
          'disabled="false" não é a forma correta de passar false. Use :disabled="false" ou uma expressão booleana. Ao usar v-btn, respeite os tipos das propriedades do componente.',
        ],
        [
          'Uma única origem do valor',
          'Não crie outro ref para dizer se há cliques quando essa resposta já pode ser obtida de greetings. As expressões simples desta aula serão organizadas com computed quando os cálculos crescerem.',
        ],
      ],
      `<script setup>
import { ref } from 'vue'
const greetings = ref(0)

function reiniciar() {
  if (greetings.value === 0) return // Sem trabalho a fazer.
  greetings.value = 0
}
</script>

<template>
  <v-btn @click="greetings++">Saudar</v-btn>
  <v-btn :disabled="greetings === 0" @click="reiniciar">
    Reiniciar
  </v-btn>
  <p>{{ greetings }} saudações</p>
</template>`,
      [
        example(
          'Cor vinculada ao mesmo contador',
          'A cor é complementar; o texto também informa o estado para não depender só da percepção de cores.',
          `<v-chip :color="greetings === 0 ? 'secondary' : 'primary'">
  {{ greetings === 0 ? 'Ainda não saudou' : 'Já participou' }}
</v-chip>

<!-- Comparação de atributo estático e dinâmico: -->
<v-btn color="primary">Cor fixa do tema</v-btn>
<v-btn :disabled="greetings === 0">Depende do contador</v-btn>

<!-- Não precisa de um segundo ref chamado jaParticipou. -->`,
          'Zero: chip secundário, Ainda não saudou, Reiniciar bloqueado. Um clique: chip primário, Já participou, Reiniciar habilitado.',
          'vue',
        ),
        example(
          'Uma condição também pode mudar por função',
          'Exercício independente do contador. Aproveita o nome condicao já encontrado no Welcome.',
          `const condicao = ref(false)

function alternarCondicao() {
  condicao.value = !condicao.value // ! inverte o booleano.
}

// No template:
// <v-btn @click="alternarCondicao">Alternar</v-btn>
// <p>{{ condicao ? 'Ativo' : 'Inativo' }}</p>

// false → primeiro clique: true → segundo clique: false`,
          'Explique por que condicao.value = true não é equivalente a inverter o estado em todos os cliques.',
        ),
      ],
      'Qual é a diferença entre disabled="false" e :disabled="false"? Como o template decide quando habilitar Reiniciar?',
      'vue',
    ),

    stage(
      'Prática guiada',
      'Monte uma interação completa e previsível',
      'Proposta para uma cópia de exercício ou componente separado. Preserve o Welcome da turma. O exemplo reúne estado, função com parâmetro, reinício e feedback acessível; não acrescenta API nem formulário.',
      [
        [
          '1 · Declare as origens',
          'Crie nome e greetings como refs. O nome começa em Lael e o contador em zero. Leia quais trechos do template dependem de cada um.',
        ],
        [
          '2 · Nomeie a intenção',
          'saudar(pessoa) atualiza o nome e incrementa greetings. reiniciar() zera somente o contador. Decida antes se o nome também deve voltar ao inicial; neste exemplo, ele permanece.',
        ],
        [
          '3 · Conecte e preveja',
          'Um botão envia Lael e outro envia Turma. Após cada clique, escreva o nome e o total esperados. Reiniciar não chama saudar.',
        ],
        [
          '4 · Mensagem acessível',
          'Preserve role="status" e aria-live="polite" para avisos relevantes. Os botões têm nomes claros e podem ser acionados pelo teclado.',
        ],
        [
          '5 · Leitura crítica',
          'Os trechos complementares mostram um exemplo completo e uma sequência de verificação. Não cole um segundo script setup dentro do mesmo componente: integre ou crie um arquivo separado.',
        ],
      ],
      `// Primeiro planeje as funções; depois conecte os botões.
import { ref } from 'vue'
const nome = ref('Lael')
const greetings = ref(0)

function saudar(pessoa) {
  nome.value = pessoa // Atualiza o destinatário.
  greetings.value += 1 // Incrementa o mesmo contador.
}

function reiniciar() {
  greetings.value = 0 // O nome permanece como estava.
}

// Previsão: saudar('Turma'), saudar('Lael'), reiniciar().
// nome: Lael; greetings: 0.`,
      [
        example(
          'Componente completo proposto',
          'Use como referência para discussão. Se criar um novo componente, ele precisa ser importado e renderizado pela tela que o exibirá; só salvar o arquivo não o coloca na interface.',
          `<script setup>
import { ref } from 'vue'
const nome = ref('Lael')
const greetings = ref(0)

function saudar(pessoa) {
  nome.value = pessoa
  greetings.value += 1
}

function reiniciar() {
  greetings.value = 0
}
</script>

<template>
  <v-card class="pa-6" rounded="xl" border>
    <h2 class="mb-4">Laboratório de saudações</h2>
    <div class="d-flex ga-2 flex-wrap">
      <v-btn color="primary" @click="saudar('Lael')">Saudar Lael</v-btn>
      <v-btn variant="outlined" @click="saudar('Turma')">Saudar a turma</v-btn>
      <v-btn :disabled="greetings === 0" @click="reiniciar">Reiniciar</v-btn>
    </div>
    <p class="mt-4" role="status" aria-live="polite">
      {{ greetings === 0 ? 'Nenhuma saudação ainda.' : 'Olá, ' + nome + '!' }}
    </p>
    <p>Total de saudações: {{ greetings }}</p>
  </v-card>
</template>`,
          'Todos os componentes Vuetify usados já estão registrados. Nenhum dos exemplos é executado automaticamente pelo material didático.',
          'vue',
        ),
        example(
          'Verificação por sequência de ações',
          'Preencha uma linha por ação antes de clicar. O texto inicial é diferente do nome guardado.',
          `// ação             nome guardado   total   reiniciar
// abrir            Lael              0     desabilitado
// Saudar a turma   Turma             1     habilitado
// Saudar Lael      Lael              2     habilitado
// Reiniciar        Lael              0     desabilitado

// Pergunta: a mensagem mostra "Olá, Lael!" após reiniciar?
// Não: a condição greetings === 0 mostra a mensagem inicial.
// O nome segue guardado, mas a condição decide o texto visível.`,
          'Critério: prever o estado e o texto separadamente. O fato de um dado existir não obriga sua exibição em todos os estados.',
        ),
      ],
      'Que linha atualiza o nome, que linha atualiza o total e qual expressão controla a mensagem inicial?',
    ),

    stage(
      'Desafio e correção',
      'Encontre o erro antes de copiar a resposta',
      'Trabalhe em dupla e leia cada bloco separadamente. O primeiro contém erros intencionais; os exemplos seguintes são a conferência. Peça que cada aluno justifique ao menos uma correção.',
      [
        [
          'Desafio 1 · Constante e conteúdo',
          'Corrija a tentativa de reatribuir um ref sem trocar const por let. Diga qual objeto deve permanecer o mesmo e qual propriedade precisa mudar.',
        ],
        [
          'Desafio 2 · Evento e estado correto',
          'O botão da demonstração atual incrementa debito, enquanto o rótulo depende de greetings. Se a intenção for saudar, proponha uma função que atualize greetings. Não trate dados diferentes como um único contador.',
        ],
        [
          'Desafio 3 · Comportamento autônomo',
          'Faça uma função saudar limitada a três cliques. Após o terceiro, bloqueie o botão e mostre “Limite atingido”. Reiniciar deve restaurar zero e permitir novamente. Proteja a regra também dentro da função.',
        ],
        [
          'Critérios de aprendizagem',
          'O aluno distingue ref e conteúdo, justifica const, chama uma função com parâmetro, prevê o resultado de três ações e corrige a falta de .value no script. Não é suficiente apenas obter a mesma aparência.',
        ],
        [
          'Fechamento',
          'Peça uma resposta individual: descreva o caminho evento → função → estado → template. Formulários, v-model e listas são o próximo encontro, 12/11; hoje o foco é compreender a interação.',
        ],
      ],
      `// ERROS INTENCIONAIS. Analise, não execute como solução.
const mensagem = ref('')
const greetings = ref(0)

function saudar(nome) {
  mensagem = 'Olá, ' + nome // Erro: tenta reatribuir const.
  greetings++ // Erro no script: tenta alterar a variável ref.
}

// Outro problema no template:
// <v-btn disabled="false" @click="saudar('Lael')">Saudar</v-btn>

// Perguntas:
// 1. Quais acessos precisam de .value no script?
// 2. Como passar um booleano falso à propriedade?
// 3. A chamada em @click ocorre antes ou depois de clicar?`,
      [
        example(
          'Correção dos acessos · confira após a tentativa',
          'A função atualiza propriedades dos refs e não reatribui as referências.',
          `function saudar(nome) {
  mensagem.value = 'Olá, ' + nome
  greetings.value++
}

// No template, refs de nível superior são desembrulhados:
// <v-btn :disabled="false" @click="saudar('Lael')">Saudar</v-btn>
// <p>{{ mensagem }} Total: {{ greetings }}</p>

// Como o botão nunca é desabilitado nesse exemplo,
// também seria válido remover a propriedade disabled.`,
          'Sem clique: texto vazio e total zero. Um clique: Olá, Lael e total um. Explique por que a correção não exige trocar const por let.',
        ),
        example(
          'Solução possível · limite de três saudações',
          'Compare a regra dentro do handler com a regra visual. A solução é um exercício proposto e não altera automaticamente o Welcome.',
          `<script setup>
import { ref } from 'vue'
const greetings = ref(0)

function saudar() {
  if (greetings.value >= 3) return // Proteção da regra.
  greetings.value += 1
}
function reiniciar() {
  greetings.value = 0
}
</script>

<template>
  <v-btn :disabled="greetings >= 3" @click="saudar">Saudar</v-btn>
  <v-btn :disabled="greetings === 0" @click="reiniciar">Reiniciar</v-btn>
  <p role="status" aria-live="polite">
    {{ greetings >= 3 ? 'Limite atingido' : 'Saudações: ' + greetings }}
  </p>
</template>`,
          'Teste mental: 0 → 1 → 2 → 3; nova chamada não passa de 3; reiniciar volta a 0. Extensão: mostrar uma frase própria para a primeira saudação.',
          'vue',
        ),
      ],
      'Se eu chamar saudar() pelo JavaScript mesmo com o botão bloqueado, a função ainda respeita o limite? Qual linha garante isso?',
    ),
  ],
}
