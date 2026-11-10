# Olá, Alunos!

Projeto Vue com Vuetify e Vite, com interface em português e um botão de saudação interativo.
As versões estáveis foram instaladas com `@latest` e registradas no `package-lock.json`.

## Executar com Docker

### Abrir no VS Code com Dev Container

Requisitos: Docker Desktop funcionando com contêineres Linux, VS Code e a extensão
[Dev Containers da Microsoft](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).
O Dev Container depende da virtualização usada pelo Docker; ele não resolve a
indisponibilidade de WSL/virtualização nas máquinas dos alunos.

1. Abra a pasta do projeto no VS Code.
2. Pressione **Ctrl + Shift + P** e escolha **Dev Containers: Reopen in Container**.
3. Aguarde a construção e a execução de `npm ci`. A extensão **Vue (Official)**
   será instalada no ambiente do contêiner.
4. Abra um terminal no VS Code e execute `npm run dev`.
5. Acesse http://localhost:5173. A demonstração está em http://localhost:5173/#original.

O ambiente inclui Node 24, npm, Bash, Git e cliente SSH. As dependências ficam no
volume `node_modules` já definido no Compose; o código continua na pasta local,
montada em `/app`. Não é preciso instalar Node no Windows.

O arquivo `.devcontainer/compose.yaml` reutiliza o serviço `app`, mas mantém o
contêiner aberto sem iniciar o Vite automaticamente. Inicie-o uma única vez pelo
terminal; use **Ctrl + C** para pará-lo. Fechar a janela remota do VS Code encerra
os serviços desse projeto. Para atualizar a configuração, execute **Dev Containers:
Rebuild Container**. Depois de alterar dependências, execute `npm ci` no terminal
com o servidor parado.

Para voltar ao modo Docker comum, saia do Dev Container e execute
`docker compose up --build -d app`. Não execute os dois modos simultaneamente:
eles usam o mesmo serviço e a mesma porta.

### Executar diretamente pelo terminal

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
│   └── lesson03.js
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

Acesso: http://localhost:5173/#aula-3-tela-1. O curso agora possui 40 telas:
oito em 05/11, oito em 10/11 e quatro em cada um dos outros seis encontros.

## Formatação com Prettier

O projeto inclui Prettier como dependência de desenvolvimento, com configuração
em `.prettierrc.json`: dois espaços, aspas simples no JavaScript e sem ponto e vírgula.
A extensão `esbenp.prettier-vscode` é instalada pelo Dev Container e recomendada
para quem abre a pasta localmente. A formatação ao salvar está habilitada no VS Code.

Se o Dev Container já estava aberto, execute **Dev Containers: Rebuild Container**
para aplicar a nova extensão. Fora do contêiner, instale a extensão recomendada e
execute `npm ci` para sincronizar as dependências.

No terminal do ambiente:

```sh
npm run format
npm run format:check
```

`format` organiza os arquivos; `format:check` verifica sem alterar. As pastas
`node_modules`, `dist` e o lockfile ficam fora da formatação. Os trechos de código
armazenados no conteúdo das aulas são preservados como exemplos didáticos.
