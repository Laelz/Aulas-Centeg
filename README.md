# Olá, Alunos!

Projeto Vue com Vuetify e Vite, com interface em português e um botão de saudação interativo.
As versões estáveis foram instaladas com `@latest` e registradas no `package-lock.json`.

## Executar com Docker

Requisito: Docker Desktop em execução, usando contêineres Linux.

```sh
docker compose up --build -d app
```

Abra http://localhost:5173. Alterações em `src/` são atualizadas automaticamente no navegador.

Para parar:

```sh
docker compose down
```

## Versão de produção

Compila os arquivos e serve o resultado com Nginx:

```sh
docker compose --profile production up --build -d production
```

Abra http://localhost:8080.

## Executar sem Docker

### Preparacao automatica no Windows

Copie ou extraia a **pasta completa do projeto** em um local em que o aluno possa
gravar arquivos. Depois, de dois cliques em **`iniciar-sem-docker.cmd`**.
Nao e preciso abrir o terminal como administrador.

O script verifica se existe Node 24 compativel e npm. Quando necessario, baixa
uma versao LTS da linha 24 diretamente de `nodejs.org`, verifica seu SHA-256 e
extrai o Node em `.tools/`, dentro do projeto. Depois executa `npm ci`, inicia o
Vite e abre o navegador em http://localhost:5173. Mantenha o terminal aberto;
para encerrar, pressione **Ctrl + C**.

**A primeira preparacao requer internet.** Cada execucao executa `npm ci` para
sincronizar as dependencias, portanto pode precisar de acesso ao registro npm.
O script nao instala Docker, WSL, Git nem VS Code, nao altera o PATH global e
nao remove outras versoes do Node. A instalacao local vale para a execucao pelo
script; comandos `node` e `npm` em outros terminais podem continuar indisponiveis.
As pastas `.tools` e `node_modules` nao devem ser copiadas entre computadores:
copie os fontes e deixe cada aluno executar a preparacao.

Opcoes pelo PowerShell, na pasta do projeto:

```powershell
# Somente preparar, sem abrir navegador nem iniciar servidor:
.\iniciar-sem-docker.cmd -PrepareOnly

# Usar outra porta se 5173 estiver ocupada:
.\iniciar-sem-docker.cmd -Port 5174

# Tambem instalar Vue (Official) e Prettier, se o VS Code ja estiver no PATH:
.\iniciar-sem-docker.cmd -InstallEditorExtensions
```

Se o Windows ou a politica da escola bloquear scripts ou downloads, encaminhe a
mensagem ao responsavel pelo laboratorio. O atalho define a politica somente
para aquele processo PowerShell; nao altera a configuracao permanente do Windows.

### Preparacao manual

Use Node.js 24 e npm:

```sh
npm ci
npm run dev
```

Para compilar: `npm run build`. Para conferir a compilação localmente: `npm run preview`.

## Arquivos principais

- `src/App.vue`: componente raiz, que carrega a área de aulas.
- `src/main.js`: inicialização, plugin e importação de estilos.
- `src/plugins/vuetify.js`: registro dos componentes Vuetify e tema.
- `compose.yaml`: ambientes Docker de desenvolvimento e produção.

Instalação oficial do Vuetify: https://vuetifyjs.com/quick-start

## Organização do código

```text
src/
├── App.vue
├── main.js
├── components/course/
│   ├── CourseHeader.vue      # Cabeçalho e acesso ao Welcome
│   ├── CourseSidebar.vue     # Seleção dos dias
│   ├── LessonTabs.vue        # Seleção das telas
│   ├── LessonScreen.vue      # Conteúdo, código e reflexão
│   └── LessonNavigation.vue  # Anterior, próxima e progresso
├── composables/
│   └── useCourseNavigation.js # Estado, links e atalhos de teclado
├── data/
│   ├── lessons.js
│   ├── lesson02.js
│   ├── lesson03.js
│   └── lesson04.js
├── plugins/
│   └── vuetify.js
├── styles/
│   ├── base.css
│   ├── course.css
│   └── welcome.css
└── views/
    ├── CourseView.vue
    └── WelcomeView.vue
```

As views compõem as telas; os componentes recebem dados por props e comunicam
ações por eventos. A navegação por hash permanece no composable, sem Vue Router.
Para editar o conteúdo das aulas, use `data/lessons.js`; para personalizar o
exemplo original, use `views/WelcomeView.vue` e `styles/welcome.css`.

## Aula de 05/11 — acompanhamento por projeção

O conteúdo detalhado está em `src/data/lesson02.js`, importado por `lessons.js`.
São oito etapas de 15 minutos, totalizando 120 minutos, com trechos comentados,
previsões de resultado, atividades no caderno e correções para discussão coletiva.
Os exemplos adicionais não são executados: o professor pode demonstrá-los em sua
cópia do projeto. Os alunos não precisam de Docker para acompanhar a atividade.
Acesso direto: http://localhost:5173/#aula-2-tela-1.

## Aula de 10/11 — reatividade e eventos

O conteúdo está em `src/data/lesson03.js`, importado pelo índice `lessons.js`.
São oito etapas de 15 minutos e 24 blocos comentados: estado e `ref`, `const`
e `.value`, funções e parâmetros, eventos, retorno versus alteração de estado,
vinculação de atributos, prática guiada e desafio com correção.

Os exemplos usam também `saldo`, `debito`, `aula()` e `pagar()` encontrados no
Welcome da turma, sem alterar esse arquivo. As propostas podem ser discutidas
pela projeção e resolvidas no caderno. Código mostrado no curso é texto didático,
não executado automaticamente. Use os trechos principais na explicação e os
complementares como apoio conforme o ritmo da turma.

Acesso: http://localhost:5173/#aula-3-tela-1. O curso possui 44 telas:
oito em 05/11, 10/11 e 12/11, e quatro em cada um dos outros cinco encontros.

## Aula de 12/11 — formulários e listas

O conteúdo está em `src/data/lesson04.js`, com oito etapas de 15 minutos e
24 blocos comentados, organizados para construir junto com a turma:
preparar o cartão, criar um campo com `v-model`, acrescentar Limpar, enviar por
Enter/botão, mostrar regras e validar o envio. Cada passo indica a alteração,
a explicação e o resultado que deve ser conferido antes de avançar.

O formulário fica pronto no passo 6; cadastro em lista e remoção entram nos
passos 7 e 8, conforme o ritmo da turma. Os códigos são versões acumuladas:
atualize os mesmos blocos do exercício, sem duplicar refs ou funções.
`src/data/lesson04Reference.js` mantém o material de referência utilizado pela
sequência guiada, incluindo a solução comentada que fundamenta as etapas finais.

Os componentes `VForm` e `VTextField` estão registrados em `src/plugins/vuetify.js`.
A prática completa e o desafio de títulos duplicados são material para construir
na cópia de trabalho do aluno; o conteúdo de `StudentView.vue` foi preservado.
Não há API ou persistência nessa atividade. É possível acompanhar pela projeção.

Acesso: http://localhost:5173/#aula-4-tela-1.

## Formatação com Prettier

O projeto inclui Prettier como dependência de desenvolvimento, com configuração
em `.prettierrc.json`: dois espaços, aspas simples no JavaScript e sem ponto e vírgula.
Instale a extensão **Prettier - Code formatter** (esbenp.prettier-vscode),
recomendada ao abrir a pasta no VS Code. A formatação ao salvar está habilitada
em .vscode/settings.json. Use a instalação de dependências descrita acima
para preparar o Prettier local do projeto.

No terminal do ambiente:

```sh
npm run format
npm run format:check
```

`format` organiza os arquivos; `format:check` verifica sem alterar. As pastas
`node_modules`, `dist` e o lockfile ficam fora da formatação. Os trechos de código
armazenados no conteúdo das aulas são preservados como exemplos didáticos.

## Laboratório interativo de eventos

No Welcome, clique em **Explorar laboratório de eventos** ou abra
http://localhost:5173/#eventos. A tela usa um grid responsivo com oito exemplos:
cliques com argumentos, `input`, atalhos de teclado, `submit.prevent`, ponteiro e
foco, `change` com ordenação e totais, eventos personalizados em dialog e busca
assíncrona local com falha e cancelamento.

Cada card tem controles funcionais, uma pergunta para investigação e o código
real do componente em **Ver código comentado**. Os fontes estão em
`src/components/events/`; a tela fica em `src/views/EventsLabView.vue` e os estilos
em `src/styles/events.css`. Os exemplos são independentes e reiniciam ao sair da
tela. Nenhum pagamento ou busca utiliza API ou persistência.

## Área livre do aluno

No Welcome, clique em **Abrir área livre** ou acesse
http://localhost:5173/#area-livre. A tela tem apenas cabeçalho com retorno ao
Welcome e conteúdo em branco, com a estrutura de Vuetify pronta.

Edite `src/views/StudentView.vue`: declare dados e funções em `<script setup>`,
construa a interface dentro de `v-col` no `<template>` e escreva os estilos no
bloco `<style scoped>`. Os comentários indicam onde começar. A navegação e o
registro da tela já estão conectados; não é necessário alterar `App.vue`.
O código é editado no VS Code, não em um editor dentro do navegador.

## Visualização do formulário por etapas

No Welcome, clique em **Visualizar formulário passo a passo** ou abra
http://localhost:5173/#formulario. A tela compara os oito passos da aula com
uma demonstração funcional, código do script/template e estado em tempo real.
Use **Ver formulário completo** para ir ao passo 8, ou o endereço direto
http://localhost:5173/#formulario-passo-8.

Cada passo reinicia sua demonstração ao ser aberto. Os dados ficam apenas na
memória e não alteram a Área livre. A tela está em
`src/views/FormWorkshopView.vue`; o preview está em
`src/components/forms/FormStepPreview.vue`.

### Formulário com dois campos

A visualização `#formulario` agora usa **Nome do aluno** e **Idade**. O cadastro
forma um array `alunos` com objetos `{ id, nome, idade }`. A idade é obrigatória,
inteira, de 0 a 120, e é convertida para número ao criar o registro. Limpar e o
sucesso no envio esvaziam ambos os campos. Cada cartão apresenta nome e idade.

Os códigos e instruções desta variante estão em `src/data/studentFormWorkshop.js`.
A aula teórica de objetivos em `lesson04.js` e os exercícios da Área livre foram
preservados; a tela de visualização adapta os mesmos conceitos a um cadastro de alunos.
