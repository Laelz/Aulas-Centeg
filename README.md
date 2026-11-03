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

## Material de aula — novembro de 2026

A aplicação agora apresenta 32 telas didáticas: quatro por encontro, nos dias
03, 05, 10, 12, 17, 19, 24 e 26/11. Use o menu de datas e os botões
Anterior/Próxima. As setas do teclado também navegam fora dos controles.
Cada tela possui endereço próprio, por exemplo `/#aula-3-tela-2`.

- `src/data/lessons.js`: conteúdo dos oito encontros e exemplos propostos.
- `src/views/CourseView.vue`: composição da área de aulas.
- `src/views/WelcomeView.vue`: tela original preservada, acessível por `/#original`.

O painel de objetivos descrito nas aulas é um exercício a desenvolver pelos
alunos; seus exemplos não são executados pelo material. O portal não adiciona
API, autenticação ou persistência. As dependências e o ambiente Docker foram mantidos.

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
│   └── lessons.js
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
