// Aula de 05/11: leitura coletiva e demonstração pelo professor.
// Os exemplos complementares são propostas; não são executados pelo portal.
const chapters = {
  date: '05/11',
  weekday: 'Quinta-feira',
  title: 'Estrutura do Vue 3',
  summary:
    'Aula projetada: acompanhe o código, preveja a tela e explique cada decisão, mesmo sem Docker no seu computador.',
  files: [
    'index.html',
    'src/main.js',
    'src/App.vue',
    'src/views/CourseView.vue',
    'src/views/WelcomeView.vue',
    'src/plugins/vuetify.js',
    'src/styles/welcome.css',
  ],
  screens: [
    {
      label: 'Inicialização',
      title: 'Do arquivo HTML até o componente na tela',
      intro:
        'Hoje o professor executa e projeta a aplicação. Os alunos acompanham os trechos, desenham o fluxo no caderno e respondem antes de cada demonstração. Não é necessário instalar nada para participar. O objetivo é entender a organização de Vue 3.5.44 e Vuetify 4.3.1 usados no projeto.',
      points: [
        [
          'Roteiro · 30 minutos',
          '5 min para retomar a primeira aula; 10 min para percorrer a entrada e as importações; 10 min para ler a montagem; 5 min para reconstruir o fluxo com a turma. Peça que um aluno descreva o próximo passo antes de abrir o arquivo seguinte.',
        ],
        [
          '1 · O navegador começa pelo HTML',
          'index.html contém o elemento com id="app" e um script type="module" que carrega /src/main.js. O id é um ponto de montagem. O conteúdo da aplicação será renderizado ali pelo Vue; o HTML inicial não precisa listar todos os cartões e botões.',
        ],
        [
          '2 · Importar é estabelecer uma dependência',
          'import App from "./App.vue" traz a exportação padrão do componente. import { createApp } from "vue" traz uma exportação nomeada da biblioteca. ./ indica a pasta atual; ../ sobe uma pasta. Os nomes de pacote são resolvidos pelo ambiente de desenvolvimento.',
        ],
        [
          '3 · O arquivo main.js prepara a aplicação',
          'main.js importa Vue, o componente raiz, a configuração do Vuetify e os estilos. Importações de CSS não criam uma variável: disponibilizam regras visuais. O plugin é configurado em plugins/vuetify.js para manter a entrada pequena.',
        ],
        [
          '4 · Três chamadas, três responsabilidades',
          'createApp(App) cria a aplicação com seu componente raiz. use(vuetify) instala o plugin que oferece componentes e tema. mount("#app") conecta a aplicação ao elemento real do HTML. A configuração deve acontecer antes da montagem.',
        ],
        [
          '5 · A estrutura atual do projeto',
          'App.vue carrega CourseView.vue, que organiza o curso e pode mostrar WelcomeView.vue. A tela original não está mais inteira em App.vue. Separe o ponto de entrada do componente que você realmente pretende editar.',
        ],
        [
          '6 · Papel do Vite e do Docker',
          'O navegador não interpreta diretamente um .vue como uma página HTML comum. O Vite transforma os componentes em módulos que o navegador pode executar. Docker oferece o ambiente em que o Vite roda; não é uma parte da lógica do componente. Hoje basta acompanhar a execução do professor.',
        ],
        [
          'Leitura ativa sem computador',
          'Desenhe quatro caixas: index.html, main.js, App.vue e CourseView.vue. Ligue-as com setas e acrescente WelcomeView.vue como demonstração. Ao lado de main.js, escreva “plugin + estilos”. Troque o desenho com um colega e explique a ordem.',
        ],
      ],
      code: `<!-- Trecho comentado de index.html -->
<!-- O idioma ajuda a interpretar o conteúdo da página. -->
<html lang="pt-BR">
  <head>
    <!-- Caracteres como á, ç e ã são interpretados em UTF-8. -->
    <meta charset="UTF-8" />
    <!-- A largura acompanha o dispositivo. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Olá, Alunos!</title>
  </head>
  <body>
    <!-- O seletor #app usado no main.js aponta para este elemento. -->
    <div id="app"></div>
    <!-- type="module" permite trabalhar com módulos e importações. -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`,
      codeExamples: [
        {
          title: 'src/main.js · entrada real, com comentários',
          explanation:
            'Leia uma importação por vez. A turma deve dizer se ela traz uma função, um componente, uma configuração ou estilos.',
          code: `// Função da biblioteca Vue: cria uma instância da aplicação.
import { createApp } from 'vue'

// Estilos necessários aos componentes visuais do Vuetify.
import 'vuetify/styles'

// Componente raiz do nosso projeto.
import App from './App.vue'

// Exportação nomeada definida no arquivo de configuração.
import { vuetify } from './plugins/vuetify'

// Estilos globais organizados por responsabilidade.
import './styles/base.css'
import './styles/welcome.css'
import './styles/course.css'

// Equivale ao encadeamento utilizado no arquivo real:
const app = createApp(App) // Define quem será renderizado na raiz.
app.use(vuetify)          // Instala o plugin antes de montar.
app.mount('#app')         // Procura o elemento com id="app".`,
          expected:
            'Resultado: a interface do curso aparece no elemento #app. Pergunta: qual seletor precisaria mudar se o id do HTML passasse a ser sala?',
        },
        {
          title: 'src/App.vue · componente raiz real',
          explanation:
            'O arquivo é curto porque delega a organização da tela a outro componente. Componente raiz não significa arquivo que deve conter tudo.',
          code: `<script setup>
// Importação relativa: views é uma pasta dentro de src.
import CourseView from './views/CourseView.vue'
</script>

<template>
  <!-- O componente importado fica disponível no template. -->
  <CourseView />
</template>

<!-- Fluxo atual:
index.html → main.js → App.vue → views/CourseView.vue
                                      ↓
                            views/WelcomeView.vue
                            (ao abrir a demonstração)
-->`,
          expected:
            'Atividade oral: aponte onde você procuraria um erro no ponto de montagem e onde procuraria o texto “Dizer olá”. São arquivos com responsabilidades diferentes.',
        },
      ],
      question:
        'Explique, na ordem, o que createApp, use e mount fazem. Depois diga por que abrir WelcomeView.vue diretamente como um arquivo no navegador não substitui iniciar o projeto.',
    },
    {
      label: 'Vue e Vuetify',
      title: 'Leia um componente .vue por partes',
      intro:
        'Um componente reúne uma parte da interface e os dados necessários para apresentá-la. Primeiro leia script, template e estilos separadamente; depois conecte as três partes. Manteremos Composition API com <script setup>, como no projeto.',
      points: [
        [
          'Roteiro · 30 minutos',
          '10 min para ler um componente completo; 10 min para comparar Vue e Vuetify; 5 min para prever a saída; 5 min para perguntas. O professor pode projetar a demonstração original, mas toda atividade também pode ser respondida no caderno.',
        ],
        [
          'Script · o que a interface conhece',
          'O bloco script setup usa JavaScript. Variáveis, funções e componentes importados no nível superior ficam disponíveis no template. Nesta aula começamos por dados fixos; o funcionamento detalhado de ref e dos eventos fica para 10/11.',
        ],
        [
          'Template · o que será apresentado',
          'O template declara a interface. {{ nome }} insere um valor como texto. Não escrevemos uma busca manual por h1 para alterar seu conteúdo: o template descreve de qual dado o texto depende.',
        ],
        [
          'Style · como a interface aparece',
          'O projeto atual usa arquivos CSS globais importados por main.js. Um componente também pode ter style scoped para limitar seus seletores aos elementos daquele componente. O exemplo abaixo ensina essa opção; não significa que o Welcome já a utiliza.',
        ],
        [
          'Vue · regras e ligação com os dados',
          'Interpolação, vinculação com : e eventos com @ são recursos do Vue. Um atributo comum como color="primary" fornece um texto fixo ao componente; :color="cor" avalia a expressão JavaScript cor.',
        ],
        [
          'Vuetify · componentes visuais',
          'v-btn fornece um botão estilizado; v-card apresenta um cartão; v-chip apresenta uma etiqueta. Eles recebem propriedades que configuram aparência e comportamento. A regra sobre o que uma ação deve fazer continua no código da aplicação.',
        ],
        [
          'Um botão comum e um componente',
          'button é um elemento HTML nativo. v-btn é um componente Vuetify que produz elementos HTML e estilos. Ambos podem receber @click em um template Vue. Trocar a peça visual não elimina a lógica que determina a ação.',
        ],
        [
          'Leia o contador existente, sem avançar toda a aula',
          'No Welcome real, greetings começa em zero, @click incrementa e a interpolação escolhe o texto. Peça uma previsão de zero e um clique. Hoje basta reconhecer script e template; a aula seguinte desenvolverá as regras de reatividade.',
        ],
      ],
      code: `<!-- EXEMPLO DIDÁTICO de um componente completo. -->
<!-- Não é uma alteração já aplicada ao Welcome. -->
<script setup>
// Dados fixos: servem para entender como o template os lê.
const turma = 'Front-end'
const descricao = 'Aprendendo a ler componentes Vue'
</script>

<template>
  <section class="apresentacao">
    <!-- As chaves exibem os valores declarados no script. -->
    <h1>Olá, turma de {{ turma }}!</h1>
    <p>{{ descricao }}</p>
    <!-- Já registrado no plugin do projeto. -->
    <v-chip color="primary" variant="tonal">Vue 3</v-chip>
  </section>
</template>

<style scoped>
/* Alternativa didática: estilo local deste componente. */
.apresentacao { padding: 24px; }
.apresentacao h1 { margin-bottom: 12px; }
</style>`,
      codeExamples: [
        {
          title: 'Propriedade fixa versus vinculação dinâmica',
          explanation:
            'Peça que os alunos identifiquem quais valores são textos literais e quais vêm do script. Não é necessário criar um formulário para compreender a diferença.',
          code: `<script setup>
const cor = 'secondary'
const titulo = 'Nossa turma'
</script>

<template>
  <!-- Texto fixo: utiliza a cor chamada primary no tema. -->
  <v-chip color="primary">Vue</v-chip>

  <!-- Expressão: lê cor, cujo valor é secondary. -->
  <v-chip :color="cor">Vuetify</v-chip>

  <!-- Pegadinha: aqui a palavra cor é literal. -->
  <!-- Isso NÃO lê a variável declarada no script. -->
  <v-chip color="cor">Compare com o anterior</v-chip>

  <!-- title é atributo de dica; interpolação é conteúdo. -->
  <p :title="titulo">{{ titulo }}</p>
</template>`,
          expected:
            'Resposta esperada: os dois primeiros chips recebem primary e secondary. O terceiro recebe a palavra “cor”; não se pode afirmar que ficará igual ao segundo.',
        },
        {
          title: 'src/views/WelcomeView.vue · interação que já existe',
          explanation:
            'Este é um recorte comentado da demonstração real. Leia primeiro o estado inicial, depois o evento e por último as duas possibilidades de texto.',
          code: `<script setup>
import { ref } from 'vue'

// Estado inicial do exemplo original.
const greetings = ref(0)
</script>

<template>
  <!-- Vue liga o clique ao incremento. Vuetify apresenta o botão. -->
  <v-btn color="primary" @click="greetings++">
    <!-- Zero escolhe a segunda mensagem; maior que zero, a primeira. -->
    {{ greetings ? 'Dizer olá de novo' : 'Dizer olá' }}
  </v-btn>
</template>

<!-- Sem clicar: Dizer olá
     Depois do primeiro clique: Dizer olá de novo
     O porquê de ref será aprofundado em 10/11. -->`,
          expected:
            'Discussão: se v-btn fosse substituído por button, o evento e a expressão continuariam sendo recursos do Vue. A aparência oferecida pelo Vuetify mudaria.',
        },
      ],
      question:
        'Marque no exemplo: uma declaração JavaScript, uma interpolação, uma propriedade do Vuetify e um seletor CSS. Explique o papel de cada um sem dizer apenas “isso faz a tela funcionar”.',
    },
    {
      label: 'Layout e tema',
      title: 'Monte a tela com peças que já existem',
      intro:
        'Agora vamos ler a estrutura visual da demonstração. O professor pode redimensionar a janela; os alunos desenham como esperam que as colunas apareçam antes de observar o resultado.',
      points: [
        [
          'Roteiro · 35 minutos',
          '10 min para layout e grid; 10 min para tema e registro; 10 min para leitura orientada de um cartão; 5 min para comparar as previsões com a demonstração. Se não houver projeção ao vivo, desenhe os dois layouts no quadro.',
        ],
        [
          'A moldura da aplicação',
          'No Welcome real, v-app contém a interface Vuetify; v-app-bar é a barra superior; v-main organiza o conteúdo levando em conta a barra. Os exemplos de grid abaixo são trechos a colocar dentro desse conteúdo, não uma segunda aplicação completa.',
        ],
        [
          'Container, linha e coluna',
          'v-container organiza a área de conteúdo; v-row agrupa colunas; v-col define quanto cada coluna ocupa. O grid possui doze partes. Duas colunas md="7" e md="5" completam doze quando esse breakpoint está ativo.',
        ],
        [
          'Responsividade é uma regra, não um dispositivo',
          'cols="12" vale como base; md="7" ou md="5" passa a valer a partir do breakpoint md. Abaixo dele, cada coluna ocupa a linha inteira. Não associe md a uma marca de celular: é uma condição de largura configurável do sistema visual.',
        ],
        [
          'Propriedades de aparência',
          'rounded="xl" aumenta o arredondamento; elevation="0" configura elevação zero; border habilita uma borda. class="pa-6" aplica espaçamento interno em todas as direções. pa não é o mesmo que ma, que aplica margem.',
        ],
        [
          'Espaçamento já usado no projeto',
          'mb-6 aplica margem inferior; ga-2 define espaço entre itens em layouts compatíveis; d-flex ativa flexbox. Na tela original, v-spacer usa o espaço disponível para separar elementos da barra. Primeiro reconheça o efeito; depois escolha a classe.',
        ],
        [
          'Tema como vocabulário de cores',
          'primary, secondary, background e surface são nomes definidos em plugins/vuetify.js. color="primary" usa o tema. Um color: #176b58 escrito diretamente em CSS é uma regra independente e não muda só porque primary foi editado.',
        ],
        [
          'Registro explícito neste projeto',
          'O plugin importa VCard e o inclui no objeto components. O template pode então usar v-card. Componentes próprios seguem outro caminho: importamos o arquivo .vue no script setup do componente que o utiliza. Não há autoimportação de Vuetify configurada aqui.',
        ],
        [
          'Perguntas durante a projeção',
          'O que empilha quando a janela diminui? Qual propriedade arredonda o cartão? Qual classe cria espaço interno? O que aconteceria com duas colunas md="8" na mesma linha? Peça justificativas com base nas doze partes do grid.',
        ],
      ],
      code: `<!-- Trecho para o conteúdo de WelcomeView.vue. -->
<v-container>
  <!-- Uma linha agrupa as duas colunas. -->
  <v-row>
    <!-- Base: 12/12. A partir de md: 7/12. -->
    <v-col cols="12" md="7">
      <h1>Olá, Alunos!</h1>
      <p>Apresentação da turma.</p>
    </v-col>

    <!-- Base: 12/12. A partir de md: 5/12. -->
    <v-col cols="12" md="5">
      <!-- pa-6 = padding em todos os lados. -->
      <v-card rounded="xl" elevation="0" border class="pa-6">
        <h2 class="mb-3">Nossa primeira interface</h2>
        <p>Vamos entender antes de modificar.</p>
      </v-card>
    </v-col>
  </v-row>
</v-container>

<!-- Previsão:
  abaixo de md → apresentação e cartão um abaixo do outro;
  a partir de md → apresentação e cartão lado a lado.
-->`,
      codeExamples: [
        {
          title: 'src/plugins/vuetify.js · registro e tema reais',
          explanation:
            'Este recorte conserva os componentes registrados no projeto. Observe a diferença entre importar uma função da biblioteca e configurar a instância do plugin.',
          code: `import { createVuetify } from 'vuetify'
import {
  VApp, VAppBar, VAvatar, VBtn, VCard, VChip, VCol,
  VContainer, VDivider, VMain, VRow, VSpacer,
} from 'vuetify/components'

export const vuetify = createVuetify({
  // Disponibiliza esses componentes nos templates da aplicação.
  components: {
    VApp, VAppBar, VAvatar, VBtn, VCard, VChip, VCol,
    VContainer, VDivider, VMain, VRow, VSpacer,
  },
  theme: {
    defaultTheme: 'alunos', // Nome do tema escolhido.
    themes: {
      alunos: {
        dark: false, // Tema claro.
        colors: {
          primary: '#176b58',    // Verde principal.
          secondary: '#e8b04b',  // Cor secundária.
          background: '#f7f8f4', // Fundo da aplicação.
          surface: '#ffffff',   // Superfícies.
        },
      },
    },
  },
})`,
          expected:
            'Previsão: um chip com color="secondary" usa a cor secundária. O texto com uma cor fixa no CSS precisa ser investigado separadamente.',
        },
        {
          title: 'Cartão comentado · leitura sem executar',
          explanation:
            'Todos os componentes deste trecho já estão registrados. Não acrescente uma nova v-app ao redor do cartão se estiver inserindo-o dentro do Welcome existente.',
          code: `<v-card class="pa-6" rounded="xl" elevation="0" border>
  <!-- HTML nativo pode ser usado dentro do componente Vuetify. -->
  <h2 class="mb-3">Turma de front-end</h2>
  <p class="mb-4">Aprender a organizar uma interface Vue.</p>

  <!-- Flexbox com espaço e quebra quando não couber. -->
  <div class="d-flex ga-2 flex-wrap">
    <!-- Três etiquetas; ainda não é uma lista com v-for. -->
    <v-chip color="primary" variant="tonal">Vue</v-chip>
    <v-chip color="secondary" variant="tonal">Vuetify</v-chip>
    <v-chip variant="outlined">Docker</v-chip>
  </div>
</v-card>`,
          expected:
            'Atividade: circule uma propriedade, sublinhe uma classe utilitária e marque um elemento HTML nativo. Explique como o conteúdo se comporta quando a largura diminui.',
        },
        {
          title: 'Comparação de estilo · tema e CSS fixo',
          explanation:
            'Os dois trechos podem produzir cores parecidas hoje, mas respondem a configurações diferentes.',
          code: `<!-- No template: resolve a cor por meio do tema Vuetify. -->
<v-chip color="primary">Usa o tema</v-chip>

<!-- No template: usa uma classe CSS da aplicação. -->
<p class="titulo-fixo">Tem uma cor escrita no CSS</p>

/* No arquivo CSS (não solto dentro do template): */
.titulo-fixo {
  color: #176b58; /* Valor fixo; não consulta primary. */
  margin-bottom: 16px;
}

/* Se primary mudar, investigue cada caso separadamente. */`,
          expected:
            'Resposta esperada: mudar primary afeta o componente que usa a cor do tema; não reescreve automaticamente o hexadecimal da classe titulo-fixo.',
        },
      ],
      question:
        'Desenhe a tela abaixo e acima do breakpoint md. Depois explique qual arquivo controla o registro de VCard e qual trecho determina o conteúdo do cartão.',
    },
    {
      label: 'Desafio no papel',
      title: 'Leia, encontre os erros e proponha uma solução',
      intro:
        'Este desafio pode ser resolvido em dupla no caderno. Não é necessário executar o projeto: identifique o problema, escreva a correção e explique o resultado esperado. O professor faz a conferência coletiva ao final.',
      points: [
        [
          'Roteiro · 25 minutos',
          '10 min para resolver os desafios em dupla, 10 min para correção comentada e 5 min para uma resposta individual de saída. Com os outros blocos de 30, 30 e 35 minutos, completamos 120 minutos.',
        ],
        [
          'Desafio 1 · Reconstrua a entrada',
          'Ordene index.html, main.js, App.vue e CourseView.vue. Escreva a responsabilidade de cada arquivo. Depois indique onde o tema é configurado e onde a demonstração original está preservada.',
        ],
        [
          'Desafio 2 · Encontre o defeito',
          'No trecho principal abaixo, compare o id do HTML com o seletor da montagem. Depois compare o nome da variável com a propriedade do chip. São dois problemas independentes: corrija e justifique os dois.',
        ],
        [
          'Desafio 3 · Planeje um cartão',
          'Escreva um template de cartão com nome da turma, uma descrição e três chips. Use somente v-card, v-chip e HTML nativo. Marque padding, margem e arredondamento e explique que efeito espera de cada escolha.',
        ],
        [
          'Desafio 4 · Faça uma previsão',
          'Sem executar, descreva uma linha com duas colunas cols="12" md="6". Como fica em largura pequena? E quando md está ativo? O total nessa condição soma doze?',
        ],
        [
          'Verificação individual',
          'Cada aluno deve explicar uma importação, uma interpolação, uma propriedade e uma classe. Para comprovar compreensão, o professor altera um nome de variável no quadro e pede quais outros trechos precisam acompanhar essa alteração.',
        ],
        [
          'Erros comuns para discutir',
          'Componente desconhecido: conferir importação e registro. Variável aparece como palavra literal: conferir : na propriedade ou {{ }} no texto. Cor não acompanha tema: procurar CSS fixo. Template isolado não abre como página: lembrar do papel do Vite.',
        ],
        [
          'Fechamento e próxima aula',
          'Hoje o resultado é uma leitura explicada da aplicação e um cartão planejado. Em 10/11 aprofundaremos ref, eventos e mudanças de estado. A pendência de virtualização não impede avaliar a compreensão dos arquivos e do fluxo de renderização.',
        ],
      ],
      code: `// DESAFIO: os trechos abaixo possuem erros intencionais.
// Imagine cada trecho no arquivo indicado.

<!-- index.html -->
<div id="app"></div>

// main.js: compare o seletor com o id acima.
createApp(App).use(vuetify).mount('#sala')

<!-- Componente de exercício -->
<script setup>
const corEscolhida = 'secondary'
const turma = 'Front-end'
</script>

<template>
  <!-- Queremos a cor guardada na variável, não uma palavra fixa. -->
  <v-chip color="corEscolhida">{{ turma }}</v-chip>
</template>

// Antes de conferir a correção:
// 1. Aponte cada erro.
// 2. Escreva a mudança mínima.
// 3. Explique qual resultado você espera.`,
      codeExamples: [
        {
          title: 'Correção comentada · conferir depois da tentativa',
          explanation:
            'O professor deve pedir as hipóteses da turma antes de avançar até este bloco. Corrigir o texto sem explicar a causa não conclui o exercício.',
          code: `// main.js: agora o seletor corresponde a <div id="app">.
createApp(App).use(vuetify).mount('#app')

<!-- No componente: o prefixo : manda avaliar a expressão. -->
<v-chip :color="corEscolhida">{{ turma }}</v-chip>

<!-- corEscolhida vale secondary; turma vale Front-end. -->
<!-- Outra solução válida, se a cor for deliberadamente fixa: -->
<v-chip color="secondary">Front-end</v-chip>

<!-- As soluções produzem a mesma escolha de cor neste caso,
     mas apenas a primeira depende das variáveis do script. -->`,
          expected:
            'Peça ao aluno para trocar corEscolhida por outra variável no quadro e indicar exatamente onde o template precisaria mudar.',
        },
        {
          title: 'Uma solução possível · componente para discussão',
          explanation:
            'Exemplo proposto, não criado automaticamente no projeto. Caso o professor demonstre, pode salvá-lo como src/components/TurmaCard.vue e importá-lo no componente que o exibirá.',
          code: `<script setup>
// Dados fixos para a apresentação inicial.
const nome = 'Turma de front-end'
const objetivo = 'Compreender a estrutura de uma aplicação Vue'
</script>

<template>
  <!-- Padding interno, borda e cantos arredondados. -->
  <v-card class="pa-6" rounded="xl" border>
    <h2 class="mb-3">{{ nome }}</h2>
    <p class="mb-4">{{ objetivo }}</p>
    <div class="d-flex ga-2 flex-wrap">
      <v-chip color="primary">HTML</v-chip>
      <v-chip color="secondary">CSS</v-chip>
      <v-chip variant="outlined">JavaScript</v-chip>
    </div>
  </v-card>
</template>`,
          expected:
            'O cartão deve mostrar nome, objetivo e três etiquetas com espaçamento. Pergunta adicional: qual alteração seria necessária para mostrar o nome de outra turma?',
        },
        {
          title: 'Como um componente próprio passa a ser utilizado',
          explanation:
            'Este trecho pressupõe que TurmaCard.vue foi criado no caminho indicado. É uma comparação com o registro de componentes Vuetify, não uma exigência de implementar componentes reutilizáveis hoje.',
          code: `<!-- Trecho proposto em src/views/WelcomeView.vue -->
<script setup>
// ../ sobe de views para src; depois entra em components.
import TurmaCard from '../components/TurmaCard.vue'

// Preserve também o import de ref e greetings do Welcome real.
</script>

<template>
  <!-- Dentro do layout já existente, no local escolhido: -->
  <TurmaCard />
</template>

<!-- Não acrescente um segundo script setup ou template ao arquivo.
     Integre os trechos nos blocos que já existem.
     Componentes próprios: importados onde serão utilizados.
     Vuetify neste projeto: configurado em plugins/vuetify.js. -->`,
          expected:
            'Saída individual: desenhe a árvore dos arquivos e explique por que o caminho usa ../. A aprendizagem é demonstrada pela justificativa, mesmo sem executar.',
        },
      ],
      question:
        'Sem consultar o exemplo, explique como um dado declarado em script setup vira texto dentro de um v-card. Diga também o que Vue, Vuetify e Vite fazem nesse caminho.',
    },
  ],
}

// Oito etapas de 15 minutos para projetar e discutir um assunto por vez.
const [entry, component, layout, challenge] = chapters.screens
const stage = (source, label, title, points, code, codeExamples, question) => ({
  ...source,
  label,
  title,
  points: [
    [
      'Roteiro · 15 minutos',
      '5 minutos de explicação, 5 de leitura comentada e 5 de previsão ou discussão. Os alunos respondem no caderno; o professor demonstra quando possível.',
    ],
    ...points,
  ],
  code,
  codeExamples,
  question,
})

export const lesson02 = {
  ...chapters,
  screens: [
    stage(
      entry,
      'Entrada e montagem',
      'Como o navegador encontra a aplicação',
      [entry.points[1], entry.points[3], entry.points[4], entry.points[6]],
      entry.code,
      [entry.codeExamples[0]],
      entry.question,
    ),
    stage(
      entry,
      'Arquivos e imports',
      'Siga os caminhos e desenhe a árvore',
      [entry.points[2], entry.points[5], entry.points[7]],
      entry.codeExamples[1].code,
      [
        {
          title: 'Caminhos relativos · encontre a pasta de partida',
          explanation:
            'Não decore o número de pontos: descubra em qual pasta está o arquivo que faz a importação.',
          code: `src/
├── main.js
├── App.vue
├── plugins/vuetify.js
├── views/
│   ├── CourseView.vue
│   └── WelcomeView.vue
└── components/course/LessonScreen.vue

// Dentro de src/main.js:
import App from './App.vue' // Mesmo diretório.

// Dentro de src/App.vue:
import CourseView from './views/CourseView.vue' // Entra em views.

// Dentro de src/views/CourseView.vue:
import LessonScreen from '../components/course/LessonScreen.vue'
// ../ volta a src; depois percorre components/course.

// Importação nomeada: o nome corresponde à exportação do módulo.
import { vuetify } from './plugins/vuetify' // Exemplo em main.js.`,
          expected:
            'No caderno: escreva o caminho de CourseView.vue até WelcomeView.vue. Resposta para discutir: ./WelcomeView.vue, pois os dois estão em views.',
        },
      ],
      'O que ./ e ../ significam? Qual arquivo deve mudar se você quiser editar o texto da demonstração original?',
    ),
    stage(
      component,
      'Componente .vue',
      'Script, template e estilos trabalham juntos',
      [component.points[1], component.points[2], component.points[3]],
      component.code,
      [],
      component.question,
    ),
    stage(
      component,
      'Vue e Vuetify',
      'Separe os dados da apresentação visual',
      component.points.slice(4),
      component.codeExamples[0].code,
      [component.codeExamples[1]],
      'Compare color="cor" e :color="cor". Depois explique qual parte do contador pertence ao Vue e qual ao Vuetify.',
    ),
    stage(
      layout,
      'Grid e espaço',
      'Desenhe a interface em duas larguras',
      [
        layout.points[1],
        layout.points[2],
        layout.points[3],
        layout.points[4],
        layout.points[5],
        layout.points[8],
      ],
      layout.code,
      [layout.codeExamples[1]],
      layout.question,
    ),
    stage(
      layout,
      'Tema e registro',
      'Descubra de onde vêm componentes e cores',
      [layout.points[6], layout.points[7]],
      layout.codeExamples[0].code,
      [layout.codeExamples[2]],
      'Por que importar VCard e registrá-lo são etapas relacionadas? Se primary mudar, qual trecho de CSS pode continuar com a cor antiga?',
    ),
    stage(
      challenge,
      'Desafios',
      'Resolva no papel antes de conferir',
      challenge.points.slice(1, 6),
      challenge.code,
      [],
      'Apresente sua correção mínima para cada erro e desenhe o cartão que você propõe. O colega consegue explicar sua solução?',
    ),
    {
      ...stage(
        challenge,
        'Correção e revisão',
        'Confira as soluções e explique o percurso',
        [challenge.points[6], challenge.points[7]],
        challenge.codeExamples[0].code,
        challenge.codeExamples.slice(1),
        challenge.question,
      ),
      intro:
        'Conferência coletiva: só avance até os códigos depois das tentativas da turma. Cada dupla explica uma decisão; no fechamento, cada aluno escreve uma resposta individual. As oito etapas de 15 minutos completam as duas horas.',
    },
  ],
}
