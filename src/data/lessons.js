import { lesson03 } from './lesson03.js'
import { lesson02 } from './lesson02.js'

// Conteúdo didático. Os exemplos são propostas de evolução, salvo indicação contrária.
const screen = (label, title, intro, points, code, question) => ({
  label,
  title,
  intro,
  points,
  code,
  question,
})

export const lessons = [
  {
    date: '03/11',
    weekday: 'Terça-feira',
    title: 'Revisão e ambiente',
    summary: 'Da estrutura da página ao contêiner em execução.',
    files: [
      'index.html',
      'src/views/WelcomeView.vue',
      'src/styles/welcome.css',
      'Dockerfile',
      'compose.yaml',
    ],
    screens: [
      screen(
        'Fundamentos',
        'Três linguagens, três responsabilidades',
        'Observe a página “Olá, Alunos”: o título tem estrutura, aparência e comportamento. Antes de mudar o código, descubra qual camada resolve cada problema.',
        [
          [
            'Roteiro · 25 minutos',
            'Reserve 5 minutos para observar a tela, 7 para HTML, 7 para CSS e 6 para JavaScript. Pergunte antes de explicar: o que existe na página, como aparece e o que acontece ao clicar?',
          ],
          [
            'HTML · estrutura',
            'h1 apresenta o título principal; p organiza o texto; button representa uma ação. Escolher o elemento certo ajuda a navegação e a acessibilidade.',
          ],
          [
            'Elementos, atributos e semântica',
            'Compare o conteúdo de um elemento com seus atributos: o texto de h1 é conteúdo; class identifica estilos. Em index.html, lang="pt-BR" informa o idioma e meta viewport orienta a exibição em dispositivos móveis. Peça que os alunos encontrem esses dois exemplos.',
          ],
          [
            'CSS · apresentação',
            'Classes controlam cores, fontes e espaços. Em src/styles/welcome.css, clamp() adapta o tamanho do título e uma media query ajusta a tela pequena.',
          ],
          [
            'Seletores, caixa e estilos combinados',
            'Use .intro para revisar seletor de classe, tamanho da fonte e altura de linha. Diferencie padding, espaço interno, de margin, espaço externo. No Welcome, mb-8 é uma classe utilitária do Vuetify; a aparência pode vir de mais de uma regra. Inspecione antes de acrescentar CSS.',
          ],
          [
            'JavaScript · comportamento',
            'Variáveis representam dados e funções executam ações. No exemplo original, um clique aumenta greetings e muda a mensagem.',
          ],
          [
            'Tipos, objetos e funções',
            'Revise número com o contador, string com a mensagem e booleano com uma condição. Um objeto reúne propriedades relacionadas; um array reúne vários valores. Uma função nomeia uma ação. Peça exemplos de dados que um futuro objetivo de estudo precisaria guardar.',
          ],
          [
            'Evento → estado → interface',
            'Em WelcomeView.vue, localize @click="greetings++" e o texto que usa greetings. Não aprofunde ref nesta revisão: mostre a relação entre ação, dado e resultado. Pergunte o que a turma espera depois de zero, um e três cliques e confira na tela.',
          ],
          [
            'Vue não substitui os fundamentos',
            'O template se parece com HTML, mas @click e a interpolação são recursos do Vue. v-btn é um componente visual do Vuetify. Não cole o arquivo .vue diretamente em um HTML esperando o mesmo resultado: o Vite prepara o código para o navegador.',
          ],
        ],
        '<!-- HTML: conteúdo e classe -->\n<h1 class="hero-title">Olá, Alunos!</h1>\n\n/* CSS: regra de apresentação */\n.hero-title { font-size: clamp(3.5rem, 7vw, 6rem); }\n\n// JavaScript: tipos, objeto, array e função\nconst aluno = { nome: "Ana", presente: true }\nconst tecnologias = ["HTML", "CSS", "JavaScript"]\nfunction apresentar(nome) {\n  return `Olá, ${nome}!`\n}\nconsole.log(apresentar(aluno.nome))\n\n// Os trechos acima pertencem a contextos diferentes.\n// Não cole HTML, CSS e JavaScript juntos em um .js.',
        'Se o título está correto, mas grande demais no celular, qual camada você investigaria?',
      ),
      screen(
        'Docker',
        'Código no computador, processo no contêiner',
        'Não é preciso instalar Node no computador para usar este ambiente. A imagem traz o runtime e o contêiner executa o processo do Vite.',
        [
          [
            'Roteiro · 30 minutos',
            'Use 15 minutos para explicar o desenho do ambiente e 15 para executar e observar os comandos. O objetivo é compreender o ambiente usado hoje, sem estudar redes ou administração de servidores em profundidade.',
          ],
          [
            'Imagem e contêiner',
            'O Dockerfile usa node:24-alpine. A etapa development define npm run dev como comando; o serviço app cria um contêiner a partir dessa imagem.',
          ],
          [
            'Dockerfile, Compose e serviço',
            'O Dockerfile descreve como preparar a imagem; compose.yaml descreve como executar os serviços deste projeto. app é o nome do serviço de desenvolvimento, não o nome de uma pasta. WORKDIR /app define a pasta de trabalho dentro do contêiner.',
          ],
          [
            'Node, npm e Vite',
            'Node executa ferramentas JavaScript fora do navegador. npm instala dependências e executa scripts. No package.json, dev chama vite --host 0.0.0.0. O Vite entrega os módulos da aplicação ao navegador; não é uma API de alunos.',
          ],
          [
            'Instalação reproduzível',
            'package.json declara dependências e scripts; package-lock.json registra versões resolvidas. O Dockerfile copia os dois e executa npm ci. Não apague o lockfile nem atualize versões durante a revisão: todos devem estudar a mesma base.',
          ],
          [
            'Portas',
            '127.0.0.1:5173:5173 liga a porta 5173 do computador à porta 5173 do contêiner. O Vite escuta em 0.0.0.0 dentro do ambiente.',
          ],
          [
            'Montagens',
            '.:/app compartilha o código. O volume node_modules:/app/node_modules mantém as dependências no volume Docker; ele não é um banco de dados.',
          ],
          [
            'O significado dos comandos',
            'up cria ou inicia o serviço; --build pede a construção da imagem; -d deixa o serviço em segundo plano. ps mostra o estado e logs app mostra a saída do processo. down remove os contêineres e a rede do projeto; sem -v, o volume nomeado é preservado.',
          ],
          [
            'Desenvolvimento e produção',
            'Hoje usaremos localhost:5173. O projeto também tem uma etapa build, que gera dist, e uma etapa production, servida por Nginx em localhost:8080. Essa versão é uma fotografia compilada; o desenvolvimento acompanha as alterações dos arquivos.',
          ],
        ],
        '# Execute no terminal, na pasta com compose.yaml:\ndocker compose up --build -d app\n\n# Ver estado e saída do processo:\ndocker compose ps\ndocker compose logs --tail=30 app\n\n# Abra no navegador:\n# http://localhost:5173/#original\n\n# Ao terminar, encerre os serviços deste projeto:\ndocker compose down',
        'Por que alterar um texto em src normalmente não exige reconstruir a imagem?',
      ),
      screen(
        'Prática guiada',
        'Faça a primeira alteração consciente',
        'Abra o exemplo original pelo botão “Aplicação original”. As mudanças propostas devem ser feitas em uma cópia de trabalho do aluno, sem confundir a apresentação com a atividade.',
        [
          [
            'Roteiro · 45 minutos',
            'Reserve 5 minutos para prever resultados, 10 para executar e localizar arquivos, 15 para alterar texto e aparência, 10 para inspecionar e testar e 5 para explicar o que mudou. Trabalhe com uma alteração por vez.',
          ],
          [
            '1 · Execute e observe',
            'Inicie app, abra localhost:5173 e acesse a aplicação original. Clique três vezes e descreva exatamente o que muda.',
          ],
          [
            '2 · Leia o mapa dos arquivos',
            'index.html é a entrada; main.js inicia o Vue; plugins/vuetify.js configura o visual; App.vue carrega a área de aulas. A demonstração fica em views/WelcomeView.vue e seus estilos em styles/welcome.css. Não confunda o conteúdo do curso em data/lessons.js com a tela de exercício.',
          ],
          [
            '3 · Localize e personalize',
            'Em src/views/WelcomeView.vue, altere o texto de apresentação. Em src/styles/welcome.css, ajuste um espaçamento da classe intro. Salve e confira o resultado.',
          ],
          [
            '4 · Inspecione no navegador',
            'Abra as ferramentas de desenvolvimento e selecione o parágrafo de apresentação na aba de elementos. Localize a classe intro e a regra que controla sua aparência. Uma mudança feita ali é temporária: recarregue para conferir e depois faça a alteração definitiva no arquivo.',
          ],
          [
            '5 · Compare antes e depois',
            'Reduza a janela e observe as colunas empilharem. Experimente alterar apenas line-height de .intro e descreva a diferença entre legibilidade e tamanho da fonte. Registre a previsão, o valor escolhido e o resultado observado.',
          ],
          [
            '6 · Explique o caminho',
            'Relacione arquivo salvo, montagem .:/app e atualização do navegador. Use as ferramentas do navegador para inspecionar o título.',
          ],
          [
            '7 · Preserve o comportamento',
            'Depois das alterações visuais, clique novamente e confirme que a mensagem de saudações continua funcionando. Revise o console para identificar erros. Se algo quebrar, volte à última alteração e compare, em vez de mudar vários arquivos ao mesmo tempo.',
          ],
          [
            'Resultado para compartilhar',
            'Cada dupla apresenta o arquivo alterado, a responsabilidade da mudança e uma evidência na tela. O colega deve conseguir reproduzir o resultado apenas com a explicação, sem copiar o arquivo inteiro.',
          ],
        ],
        '// Mapa para acompanhar a prática:\n// Texto → src/views/WelcomeView.vue\n// CSS da demonstração → src/styles/welcome.css\n// Tema/componentes → src/plugins/vuetify.js\n// Ambiente → compose.yaml + Dockerfile\n\n// Experimento no CSS: mude somente uma propriedade.\n// .intro { line-height: 2; }\n\n// Registre:\n// Minha previsão: ...\n// Arquivo e regra alterados: ...\n// Resultado observado: ...\n\n// Não edite dist: ela é gerada pela compilação.',
        'Qual arquivo você alterou e qual mudança visível comprova que encontrou o lugar certo?',
      ),
      screen(
        'Desafio',
        'Explique o ambiente sem decorar comandos',
        'Personalize a apresentação de uma turma e demonstre que consegue distinguir estrutura, aparência, comportamento e execução.',
        [
          [
            'Roteiro · 20 minutos',
            'Use 10 minutos para o desafio individual e 10 para demonstração e fechamento. As quatro etapas somam 120 minutos. Se o ambiente consumir tempo extra, priorize título, um ajuste visual e a explicação do caminho até a tela.',
          ],
          [
            'Faça sozinho',
            'Troque título e rodapé. Ajuste uma cor ou espaçamento. Registre uma explicação de imagem, contêiner, porta e volume usando o projeto.',
          ],
          [
            'Restrições que ajudam a aprender',
            'Use o ambiente e as dependências atuais. Não adicione bibliotecas nem novas funcionalidades. Faça as alterações em src e mantenha o contador original. Antes de cada edição, escreva uma frase prevendo o efeito.',
          ],
          [
            'Confira o resultado',
            'A aplicação abre, o contador continua funcionando e os textos permanecem legíveis em uma janela estreita.',
          ],
          [
            'Critérios observáveis',
            'Mostre título e rodapé personalizados, uma regra visual alterada no arquivo-fonte e o contador funcionando após três cliques. Explique qual porta pertence ao computador e aponte as duas montagens no Compose. Esses são os cinco itens da verificação de hoje.',
          ],
          [
            'Se algo falhar',
            'Docker indisponível: confira Docker Desktop. Porta ocupada: investigue o processo ou mude apenas a porta publicada. Alteração ausente: confirme que editou src, não dist.',
          ],
          [
            'Diagnóstico com evidências',
            'Contêiner não executa: use docker compose ps e logs app. Página não abre: confira endereço e porta. Layout estranho: inspecione as regras aplicadas. Erro depois de editar: confira o terminal e o console e comece pela primeira mensagem relevante.',
          ],
          [
            'Extensão para quem terminar',
            'Somente se houver tempo, explique a um colega o que mudaria ao publicar 5174:5173. Não é necessário trocar a porta de toda a turma. Compare também uma alteração temporária no navegador com uma alteração salva no código.',
          ],
          [
            'Perguntas de saída',
            'Qual arquivo controla o texto? Qual controla sua aparência? Quem executa o Vite? O que acontece com as mudanças ao recarregar a página? Cada aluno deve responder usando uma evidência do projeto, não apenas uma definição decorada.',
          ],
        ],
        '# A porta da esquerda pertence ao computador.\n# Exemplo alternativo, apenas se houver conflito:\nports:\n  - "127.0.0.1:5174:5173"\n\n# Nesse caso, abra localhost:5174.',
        'Você consegue justificar as duas portas sem usar a expressão “é assim que funciona”?',
      ),
    ],
  },
  lesson02,
  lesson03,
  {
    date: '12/11',
    weekday: 'Quinta-feira',
    title: 'Formulários e listas',
    summary: 'Comece o painel de objetivos com cadastro validado.',
    files: [
      'src/views/WelcomeView.vue → atividade em cópia',
      'src/main.js',
      'src/plugins/vuetify.js',
    ],
    screens: [
      screen(
        'Modelo de dados',
        'Antes da lista, defina um objetivo',
        'A partir deste encontro, o exercício é um painel de objetivos de estudo. Essa funcionalidade é proposta; não faz parte do exemplo original.',
        [
          [
            'Objeto',
            'Cada objetivo tem id estável, titulo e concluido. O identificador acompanha o item mesmo se sua posição mudar.',
          ],
          [
            'Coleção reativa',
            'Um ref com array guarda a lista. O cadastro acrescenta um objeto; o template renderiza a coleção com v-for.',
          ],
          [
            'Estado vazio',
            'v-if mostra uma orientação quando a lista está vazia. A lista deve ser acessível depois do primeiro cadastro.',
          ],
        ],
        'const titulo = ref("")\nconst objetivos = ref([])\n\n// Forma de cada novo objetivo:\n{ id: crypto.randomUUID(), titulo: "Aprender Vue", concluido: false }',
        'Por que o título não é uma boa chave se dois alunos podem cadastrar o mesmo texto?',
      ),
      screen(
        'Formulário',
        'Digitar não é o mesmo que cadastrar',
        'v-model mantém o campo sincronizado com o estado. A submissão decide se o conteúdo é válido e pode entrar na lista.',
        [
          [
            'Componentes novos',
            'Importe e registre VForm e VTextField em plugins/vuetify.js. Eles ainda não estão no registro original.',
          ],
          [
            'Regras',
            'Normalize com trim() e aceite entre 3 e 80 caracteres. Uma regra retorna true ou uma mensagem explicando o problema.',
          ],
          [
            'Envio',
            'Use @submit.prevent e um botão type="submit". Aguarde form.value.validate() e verifique valid antes de cadastrar.',
          ],
        ],
        'const form = ref(null)\nconst regras = [v => {\n  const n = (v ?? "").trim().length\n  return (n >= 3 && n <= 80) || "Use de 3 a 80 caracteres"\n}]\n\n// Em uma função async de envio:\nconst { valid } = await form.value.validate()\nif (!valid) return',
        'Por que um texto só de espaços não deve passar na validação?',
      ),
      screen(
        'Prática guiada',
        'Do campo ao primeiro cartão',
        'Primeiro implemente o fluxo completo com apenas um campo. Só depois refine a apresentação.',
        [
          [
            '1 · Formulário',
            'Crie titulo, form e objetivos. Ligue v-model ao campo e rules às regras. Conecte o envio a uma função async.',
          ],
          [
            '2 · Cadastro',
            'Após validar, adicione um objeto com título normalizado e id novo. Limpe o campo e a validação após o sucesso.',
          ],
          [
            '3 · Lista',
            'Renderize os cartões com v-for e :key="objetivo.id". Use uma mensagem alternativa quando não existir nenhum item.',
          ],
        ],
        '<v-form ref="form" @submit.prevent="adicionar">\n  <v-text-field v-model="titulo" label="Objetivo" :rules="regras" />\n  <v-btn type="submit">Adicionar</v-btn>\n</v-form>\n<v-card v-for="objetivo in objetivos" :key="objetivo.id">\n  {{ objetivo.titulo }}\n</v-card>',
        'O que deve permanecer inalterado quando a tentativa de cadastro for inválida?',
      ),
      screen(
        'Desafio',
        'Teste as entradas que costumam escapar',
        'Faça o cadastro resistir aos casos de borda. A validação deve funcionar pelo botão e pela tecla Enter.',
        [
          [
            'Faça sozinho',
            'Acrescente uma mensagem com a quantidade cadastrada. Teste vazio, espaços, dois caracteres, três caracteres e mais de oitenta.',
          ],
          [
            'Critérios',
            'Somente valores válidos entram na lista. Cada item tem id próprio. O estado vazio some após o primeiro cadastro.',
          ],
          [
            'Diagnóstico',
            'Página recarrega: confira submit.prevent. Promise tratada como booleano: use await e valid. Lista confusa: confira as chaves.',
          ],
        ],
        '// Após validação bem-sucedida:\nobjetivos.value.push({\n  id: crypto.randomUUID(),\n  titulo: titulo.value.trim(),\n  concluido: false,\n})',
        'Como provar que pressionar Enter segue as mesmas regras que clicar em Adicionar?',
      ),
    ],
  },
  {
    date: '17/11',
    weekday: 'Terça-feira',
    title: 'Componentização',
    summary: 'Separe responsabilidades e comunique intenções.',
    files: [
      'src/components/ObjetivoForm.vue (proposto)',
      'src/components/ObjetivoCard.vue (proposto)',
      'componente pai do exercício',
    ],
    screens: [
      screen(
        'Responsabilidades',
        'Uma coleção, componentes com papéis claros',
        'Dividir arquivos só ajuda se cada componente tiver uma responsabilidade. O pai será dono da coleção; formulário e cartão cuidarão de suas interfaces.',
        [
          [
            'Pai',
            'Mantém objetivos e as funções que adicionam, concluem e removem. É a fonte de verdade da coleção.',
          ],
          [
            'Formulário',
            'Mantém o campo e a validação. Quando tudo está correto, emite adicionar com o título normalizado.',
          ],
          [
            'Cartão',
            'Recebe um objetivo e mostra título e estado. Solicita alterações emitindo eventos com o identificador.',
          ],
        ],
        'Painel (coleção)\n├── ObjetivoForm → emite adicionar(titulo)\n└── ObjetivoCard ← recebe objetivo\n                 → emite alternar(id)',
        'O que poderia dar errado se cada cartão mantivesse uma cópia independente da coleção?',
      ),
      screen(
        'Props e eventos',
        'Dados descem, intenções sobem',
        'Props são entradas do componente. Eventos avisam ao pai que uma ação ocorreu. O filho não deve alterar diretamente o objeto recebido.',
        [
          [
            'defineProps',
            'Declare o contrato do cartão. Usar props.objetivo torna explícita a origem do dado.',
          ],
          [
            'defineEmits',
            'Declare alternar e envie o id. O pai escolhe como encontrar e atualizar o item.',
          ],
          [
            'script setup',
            'As macros defineProps e defineEmits são disponibilizadas pelo compilador. Não use this nem migre para Options API.',
          ],
        ],
        'const props = defineProps({\n  objetivo: { type: Object, required: true },\n})\nconst emit = defineEmits(["alternar"])\n\n// No template do cartão:\n<v-btn @click="emit(\'alternar\', props.objetivo.id)">\n  {{ props.objetivo.concluido ? "Reabrir" : "Concluir" }}\n</v-btn>',
        'Por que emitir alternar é diferente de escrever diretamente em props.objetivo.concluido?',
      ),
      screen(
        'Prática guiada',
        'Extraia preservando o comportamento',
        'Refatore em pequenos passos: mova uma parte, execute e confira antes de mover a próxima.',
        [
          [
            '1 · Formulário',
            'Crie ObjetivoForm.vue. Mova o campo, as regras e o envio. Emita adicionar somente após validação.',
          ],
          [
            '2 · Cartão',
            'Crie ObjetivoCard.vue. Receba objetivo e emita alternar. Importe os dois componentes no pai.',
          ],
          [
            '3 · Atualização',
            'No pai, encontre o objetivo por id e inverta concluido. Teste com dois itens para confirmar independência.',
          ],
        ],
        'function alternar(id) {\n  const item = objetivos.value.find(item => item.id === id)\n  if (item) item.concluido = !item.concluido\n}\n\n<ObjetivoCard v-for="item in objetivos" :key="item.id"\n  :objetivo="item" @alternar="alternar" />',
        'Qual evento carrega o título e qual carrega o identificador? Justifique.',
      ),
      screen(
        'Desafio',
        'Acrescente remoção sem quebrar o contrato',
        'Use o mesmo fluxo para remover um objetivo. O cartão solicita, o pai altera a coleção.',
        [
          [
            'Faça sozinho',
            'Declare o evento remover, inclua um botão com nome claro e emita o id. No pai, implemente a exclusão.',
          ],
          [
            'Critérios',
            'Concluir, reabrir e remover atingem somente o item escolhido. Cadastro e validação continuam funcionando.',
          ],
          [
            'Diagnóstico',
            'Evento não chega: confira grafia e listener. Item errado muda: confira id. Mudança desaparece: procure uma segunda fonte de verdade.',
          ],
        ],
        '// No pai, proposta de exclusão:\nfunction remover(id) {\n  objetivos.value = objetivos.value.filter(item => item.id !== id)\n}',
        'Explique o trajeto completo de um clique em Remover até o desaparecimento do cartão.',
      ),
    ],
  },
  {
    date: '19/11',
    weekday: 'Quinta-feira',
    title: 'Dados e regras da interface',
    summary: 'Derive filtros e totais sem duplicar estado.',
    files: ['componente pai do exercício', 'src/components/ObjetivoCard.vue (proposto)'],
    screens: [
      screen(
        'Computed',
        'Guarde os dados, calcule as respostas',
        'A lista é estado de origem. Total, quantidade concluída e lista filtrada podem ser calculados a partir dela.',
        [
          [
            'Estado de origem',
            'objetivos guarda os itens. filtro guarda a escolha do usuário. Esses valores precisam ser alterados por ações.',
          ],
          [
            'Dados derivados',
            'computed expressa uma relação. Se a coleção mudar, as respostas dependentes serão atualizadas.',
          ],
          [
            'Sem efeitos',
            'O cálculo não deve cadastrar, remover nem salvar itens. Ele recebe estado e devolve um resultado.',
          ],
        ],
        'import { computed } from "vue"\n\nconst total = computed(() => objetivos.value.length)\nconst concluidos = computed(() =>\n  objetivos.value.filter(item => item.concluido).length\n)',
        'Que problema aparece se total for um ref atualizado manualmente em várias funções?',
      ),
      screen(
        'Filtros',
        'Mude a visão, preserve a coleção',
        '“Ver pendentes” não significa apagar concluídos. A lista visível é uma projeção dos dados originais.',
        [
          [
            'Três escolhas',
            'Use todos, pendentes e concluidos como valores de filtro. Botões existentes do Vuetify são suficientes.',
          ],
          [
            'Filtro de array',
            'Use filter dentro de computed. Não se trata da antiga sintaxe de filtros do Vue 2.',
          ],
          [
            'Dois vazios',
            'Nenhum cadastro pede uma primeira ação. Nenhum resultado no filtro pede mudar o filtro ou concluir outro item.',
          ],
        ],
        'const filtro = ref("todos")\nconst visiveis = computed(() => objetivos.value.filter(item => {\n  if (filtro.value === "pendentes") return !item.concluido\n  if (filtro.value === "concluidos") return item.concluido\n  return true\n}))',
        'Se um item for concluído enquanto o filtro Pendentes está ativo, o que deve acontecer?',
      ),
      screen(
        'Prática guiada',
        'Filtros e indicadores coerentes',
        'Use a mesma coleção para todos os cálculos. Não crie cópias para cada filtro.',
        [
          [
            '1 · Controles',
            'Crie três botões que alteram filtro. Indique visualmente a seleção e informe seu estado com aria-pressed.',
          ],
          [
            '2 · Derivações',
            'Crie visiveis, total e concluidos. Renderize somente visiveis, mantendo as ações pelo id.',
          ],
          [
            '3 · Verificação',
            'Cadastre três itens, conclua um e percorra os filtros. Confira o total geral, não apenas a quantidade visível.',
          ],
        ],
        '<v-btn :aria-pressed="filtro === \'pendentes\'"\n  @click="filtro = \'pendentes\'">Pendentes</v-btn>\n\n<p>{{ concluidos }} de {{ total }} concluídos</p>',
        'O total geral deve mudar ao trocar o filtro? Por quê?',
      ),
      screen(
        'Watch e extensão',
        'Observar mudanças só quando há um efeito',
        'O projeto original não possui persistência. O painel obrigatório pode continuar em memória. Salvar no navegador é uma extensão opcional, não uma API nem um banco compartilhado.',
        [
          [
            'Computed ou watch?',
            'computed calcula valores da interface. watch executa um efeito em resposta a uma mudança, como gravar no armazenamento.',
          ],
          [
            'Persistência opcional',
            'Leia localStorage com try/catch, valide o formato e use uma chave versionada. Só depois configure observação profunda da coleção.',
          ],
          [
            'Desafio obrigatório',
            'Mostre “X de Y concluídos” e uma mensagem própria para lista vazia. Explique o que se perde ao recarregar sem persistência.',
          ],
        ],
        '// Extensão: depois de restaurar e validar a coleção.\nwatch(objetivos, itens => {\n  try {\n    localStorage.setItem("objetivos:v1", JSON.stringify(itens))\n  } catch {\n    // Informe que não foi possível salvar.\n  }\n}, { deep: true })',
        'Por que um watcher não é necessário para recalcular o total de pendências?',
      ),
    ],
  },
  {
    date: '24/11',
    weekday: 'Terça-feira',
    title: 'Integração com dados locais',
    summary: 'Carregamento, sucesso e falha sem inventar um backend.',
    files: [
      'public/dados/sugestoes.json (proposto)',
      'componente pai do exercício',
      'src/main.js',
      'src/plugins/vuetify.js',
    ],
    screens: [
      screen(
        'Fonte de dados',
        'Um arquivo local, não uma API existente',
        'A aplicação analisada não integra serviços externos. Vamos propor um JSON estático de sugestões, servido pelo Vite e incluído na compilação.',
        [
          [
            'Formato',
            'O arquivo contém um array de objetos com titulo. É preciso validar esse formato antes de usar o resultado.',
          ],
          [
            'Caminho',
            'Crie public/dados/sugestoes.json. No navegador, o endereço é /dados/sugestoes.json, sem o prefixo public.',
          ],
          [
            'Separação',
            'Sugestões são opções para consulta. Objetivos são os itens escolhidos pelo usuário. Carregar sugestões não deve cadastrar tudo automaticamente.',
          ],
        ],
        '[\n  { "titulo": "Praticar props e eventos" },\n  { "titulo": "Revisar computed" },\n  { "titulo": "Testar navegação por teclado" }\n]',
        'O que distingue uma sugestão carregada de um objetivo cadastrado?',
      ),
      screen(
        'Assíncrono',
        'Uma requisição pode terminar de várias formas',
        'A interface deve dizer o que está acontecendo enquanto o navegador busca o arquivo. Uma resposta recebida ainda pode representar erro.',
        [
          [
            'Carregamento',
            'Ative carregando antes da busca e bloqueie disparos simultâneos. Uma mensagem ajuda a compreender a espera.',
          ],
          [
            'Resposta e conteúdo',
            'Verifique response.ok, depois aguarde response.json(). Valide o array e os títulos; JSON válido não garante formato correto.',
          ],
          [
            'Falha e finalização',
            'catch transforma erro em mensagem compreensível. finally desativa carregando em todos os caminhos.',
          ],
        ],
        'async function carregar() {\n  if (carregando.value) return\n  carregando.value = true\n  erro.value = ""\n  try {\n    const resposta = await fetch("/dados/sugestoes.json")\n    if (!resposta.ok) throw new Error("Falha HTTP")\n    const dados = await resposta.json()\n    // Validar formato antes de atribuir às sugestões.\n  } catch {\n    erro.value = "Não foi possível carregar. Tente novamente."\n  } finally {\n    carregando.value = false\n  }\n}',
        'Por que apenas usar try/catch não basta para identificar uma resposta HTTP 404?',
      ),
      screen(
        'Prática guiada',
        'Carregue e escolha uma sugestão',
        'Implemente primeiro uma leitura sob demanda. Não é preciso adicionar roteador, autenticação ou gerenciamento global de estado.',
        [
          [
            '1 · Prepare',
            'Crie JSON e estados sugestoes, carregando e erro. Adicione um botão para executar a função de carga.',
          ],
          [
            '2 · Apresente',
            'Mostre carregamento, erro com nova tentativa e lista de sugestões. Se usar v-alert, registre VAlert explicitamente em plugins/vuetify.js.',
          ],
          [
            '3 · Reutilize',
            'Ao escolher uma sugestão, passe o título pela função de cadastro do pai. Gere um novo id para o objetivo.',
          ],
        ],
        'const formatoValido = Array.isArray(dados) && dados.every(item =>\n  item && typeof item.titulo === "string" &&\n  item.titulo.trim().length >= 3 &&\n  item.titulo.trim().length <= 80\n)\nif (!formatoValido) throw new Error("Formato inválido")\nsugestoes.value = dados',
        'Como reutilizar a regra de cadastro sem duplicá-la na função de carga?',
      ),
      screen(
        'Desafio',
        'Teste o caminho que dá errado',
        'Uma interface confiável explica falhas e permite recuperação. Simule condições de forma controlada na sua cópia do exercício.',
        [
          [
            'Faça sozinho',
            'Teste um caminho inexistente, um array vazio e um JSON com formato inadequado. Diferencie vazio de falha e ofereça nova tentativa.',
          ],
          [
            'Critérios',
            'Carregamento sempre termina, não há cadastros automáticos nem requisições concorrentes, e uma tentativa posterior pode funcionar.',
          ],
          [
            'Diagnóstico',
            'HTML recebido no lugar de JSON: confira o caminho, pois há fallback para index.html. Espera invisível: use limitação de rede no navegador.',
          ],
        ],
        '// Cenários de teste:\n// 1. Arquivo correto → sugestões\n// 2. [] → nenhuma sugestão disponível\n// 3. [{ titulo: 42 }] → formato inválido\n// 4. Caminho incorreto → mensagem e nova tentativa',
        'Se a primeira tentativa falhar e a segunda funcionar, quais mensagens antigas precisam desaparecer?',
      ),
    ],
  },
  {
    date: '26/11',
    weekday: 'Quinta-feira',
    title: 'Finalização e apresentação',
    summary: 'Revise a experiência e demonstre o que aprendeu.',
    files: [
      'src/styles/welcome.css',
      'componentes do exercício',
      'Dockerfile',
      'compose.yaml',
      'nginx.conf',
      'README.md',
    ],
    screens: [
      screen(
        'Responsividade',
        'A interface precisa sobreviver ao conteúdo real',
        'Não teste apenas cartões com títulos curtos em um monitor grande. Conteúdo longo e janela estreita revelam limites do layout.',
        [
          [
            'Grid',
            'Use cols para a base e md para reorganizar em telas maiores. Revise espaçamentos utilitários e larguras fixas.',
          ],
          [
            'Conteúdo',
            'Teste a largura de 360 px e títulos próximos do limite. Botões devem continuar legíveis e alcançáveis, sem rolagem horizontal.',
          ],
          [
            'CSS existente',
            'styles/welcome.css já usa clamp() e media query. Cuidado com a regra que oculta chips da barra: informação essencial não deve sumir.',
          ],
        ],
        '<v-row>\n  <v-col cols="12" md="6">Formulário</v-col>\n  <v-col cols="12" md="6">Objetivos</v-col>\n</v-row>\n\n/* Para títulos longos, quando necessário: */\n.titulo-objetivo { overflow-wrap: anywhere; }',
        'Qual informação deixaria de existir se você ocultasse o controle de filtros no celular?',
      ),
      screen(
        'Acessibilidade',
        'Utilize a aplicação sem depender do mouse',
        'Acessibilidade faz parte da implementação. Um fluxo funcional precisa ser compreensível por diferentes formas de navegação.',
        [
          [
            'Teclado',
            'Percorra com Tab, ative ações com teclado e preserve foco visível. Use botões reais em vez de divs clicáveis.',
          ],
          [
            'Nomes e mensagens',
            'Campos precisam de rótulos. Botões devem dizer sua ação. Anuncie atualizações relevantes sem transformar toda a tela em aria-live.',
          ],
          [
            'Além da cor',
            'Escreva “Concluído” ou “Pendente”. O exemplo original já possui região de status e símbolo decorativo com aria-hidden.',
          ],
        ],
        '<p role="status" aria-live="polite">\n  {{ mensagemDeResultado }}\n</p>\n\n<v-btn :aria-pressed="filtro === \'todos\'"\n  @click="filtro = \'todos\'">Todos</v-btn>',
        'Uma pessoa que não distingue as cores consegue descobrir quais objetivos estão concluídos?',
      ),
      screen(
        'Verificação',
        'Compilar também faz parte da entrega',
        'Desenvolvimento usa Vite e código montado. Produção serve arquivos compilados pelo Nginx e precisa ser reconstruída após alterações.',
        [
          [
            '1 · Fluxo funcional',
            'Cadastre, conclua, reabra e filtre. Confira validação, estado vazio e carregamento de sugestões, inclusive na falha.',
          ],
          [
            '2 · Build',
            'Execute npm run build dentro de app. Investigue o primeiro erro relevante, em vez de apenas esconder a mensagem.',
          ],
          [
            '3 · Produção',
            'Inicie o serviço production no perfil correspondente. A porta do computador é 8080 e a do Nginx é 80.',
          ],
        ],
        'docker compose exec app npm run build\n\ndocker compose --profile production up --build -d production\n\n# Abra http://localhost:8080\n# O fallback do Nginx não cria rotas Vue.',
        'Por que salvar um .vue não atualiza automaticamente a imagem de produção já construída?',
      ),
      screen(
        'Entrega',
        'Mostre o raciocínio por trás da interface',
        'Entregue o painel e explique uma alteração sem consultar um exemplo pronto. O foco é compreender decisões e verificar resultados.',
        [
          [
            'Produto',
            'Cadastro validado, lista, conclusão, componentes com props/eventos, filtros, totais e sugestões locais. Remoção e localStorage são extensões.',
          ],
          [
            'Apresentação',
            'Mostre um fluxo completo, explique evento → estado → interface e faça uma alteração curta solicitada pelo professor. Documente execução e limitações no README.',
          ],
          [
            'Avaliação · 100 pontos',
            'Cadastro 15; listagem e atualização 15; componentes 15; regras derivadas 15; dados locais 10; responsividade/acessibilidade 10; execução/documentação 5; compreensão individual 15.',
          ],
        ],
        '// Checklist final\n// [ ] Entrada inválida não cadastra\n// [ ] Ação altera apenas o item escolhido\n// [ ] Filtro preserva a coleção\n// [ ] Erro permite nova tentativa\n// [ ] Teclado e tela estreita funcionam\n// [ ] Build termina sem erro',
        'Qual parte você consegue reconstruir explicando cada decisão, sem copiar o código?',
      ),
    ],
  },
]
