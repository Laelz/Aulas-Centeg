// Variante visual da aula: dois campos e um array de objetos { id, nome, idade }.
const nameRules = `const regrasNome = [valor => {
  const texto = String(valor ?? '').trim()
  return (texto.length >= 3 && texto.length <= 80) || 'Use de 3 a 80 caracteres.'
}]`
const ageRules = `const regrasIdade = [valor => {
  const preenchido = valor !== null && valor !== undefined && String(valor).trim() !== ''
  const numero = Number(valor)
  return (preenchido && Number.isInteger(numero) && numero >= 0 && numero <= 120)
    || 'Informe uma idade inteira entre 0 e 120.'
}]`

function scriptFor(step) {
  if (step === 1)
    return '// Vamos criar um formulário com nome e idade.\n// Neste passo, precisamos apenas do cartão no template.'
  let script = `import { ref } from 'vue'
const nome = ref('')
const idade = ref('') // Vazio não é a mesma coisa que zero.`
  if (step >= 4) script += "\nconst mensagem = ref('')"
  if (step >= 6) script += '\nconst form = ref(null)\nconst enviando = ref(false)'
  if (step >= 7) script += '\nconst alunos = ref([]) // Array de objetos com nome e idade.'
  if (step >= 5) script += '\n\n' + nameRules + '\n\n' + ageRules
  if (step >= 4 && step < 6)
    script += `

function enviar() {
  // Diagnóstico: a validação do envio será ligada no passo 6.
  mensagem.value = 'Recebido: ' + nome.value + ' — ' + idade.value + ' anos'
}`
  if (step >= 6)
    script += `

async function enviar() {
  if (enviando.value) return
  enviando.value = true
  try {
    const { valid } = await form.value.validate()
    if (!valid) return // Preserva os dois campos para correção.
    const texto = nome.value.trim()
${
  step >= 7
    ? `    alunos.value.push({
      id: crypto.randomUUID(),
      nome: texto,
      idade: Number(idade.value), // O registro guarda um número.
    })
    mensagem.value = 'Aluno adicionado: ' + texto + ' — ' + idade.value + ' anos'`
    : "    mensagem.value = 'Formulário válido: ' + texto + ' — ' + idade.value + ' anos'"
}
    nome.value = ''
    idade.value = ''
    form.value.resetValidation()
  } catch {
    mensagem.value = 'Não foi possível enviar. Tente novamente.'
  } finally {
    enviando.value = false
  }
}`
  if (step >= 3)
    script += `

function limpar() {
${step >= 6 ? '  if (enviando.value) return\n' : ''}  nome.value = ''
  idade.value = ''${step >= 4 ? "\n  mensagem.value = ''" : ''}${step >= 6 ? '\n  form.value.resetValidation()' : ''}
}`
  if (step === 8)
    script += `

function remover(id) {
  const aluno = alunos.value.find(item => item.id === id)
  if (!aluno) return
  alunos.value = alunos.value.filter(item => item.id !== id)
  mensagem.value = 'Removido: ' + aluno.nome
}`
  return script
}

function templateFor(step) {
  let template = `<v-card class="pa-6" rounded="lg" border>
  <h2 class="text-h5 mb-4">Cadastro de alunos</h2>`
  if (step >= 4)
    template += `\n  <v-form${step >= 6 ? ' ref="form"' : ''} @submit.prevent="enviar">`
  if (step >= 2)
    template += `
    <v-text-field v-model="nome" label="Nome do aluno" variant="outlined"${step >= 5 ? '\n      :rules="regrasNome" counter="80"' : ''}${step >= 6 ? '\n      :readonly="enviando"' : ''} />
    <v-text-field v-model="idade" label="Idade" type="number" min="0" max="120" step="1"
      variant="outlined"${step >= 5 ? ' :rules="regrasIdade"' : ''}${step >= 6 ? ' :readonly="enviando"' : ''} />`
  if (step >= 2 && step < 4)
    template += `
    <p class="mb-4">Prévia: {{ nome || 'Digite o nome' }} — {{ idade === '' ? 'Informe a idade' : idade + ' anos' }}</p>`
  if (step >= 3)
    template += `
    <div class="d-flex ga-2 flex-wrap">${
      step >= 4
        ? `
      <v-btn type="submit" color="primary"${step >= 6 ? ' :disabled="enviando"' : ''}>${step >= 7 ? 'Adicionar' : 'Enviar'}</v-btn>`
        : ''
    }
      <v-btn type="button" variant="outlined"${step >= 6 ? ' :disabled="enviando"' : ''} @click="limpar">Limpar</v-btn>
    </div>`
  if (step >= 4)
    template +=
      '\n  </v-form>\n  <p class="mt-4" role="status" aria-live="polite">{{ mensagem }}</p>'
  template += '\n</v-card>'
  if (step >= 7)
    template += `

<section class="mt-6" aria-label="Alunos cadastrados">
  <p v-if="alunos.length === 0">Nenhum aluno cadastrado.</p>
  <div v-else>
    <p class="mb-3">Total: {{ alunos.length }}</p>
    <v-card v-for="aluno in alunos" :key="aluno.id" class="pa-4 mb-3" border>
      <h3 class="text-h6">{{ aluno.nome }}</h3>
      <p>Idade: {{ aluno.idade }} anos</p>${
        step === 8
          ? `
      <v-btn type="button" variant="text" @click="remover(aluno.id)"
        :aria-label="'Remover aluno: ' + aluno.nome">Remover</v-btn>`
          : ''
      }
    </v-card>
  </div>
</section>`
  return template
}

const stages = [
  [
    'Preparar',
    'Prepare o cadastro de alunos',
    'Começamos com um cartão vazio. Depois acrescentaremos dois campos independentes: nome e idade.',
    'Crie um cartão na sua cópia da Área livre, preservando a navegação e os exercícios anteriores.',
    'O cartão Cadastro de alunos aparece, ainda sem campos.',
  ],
  [
    'Criar os campos',
    'Nome e idade, cada um com seu estado',
    'Dois refs, dois campos com v-model. O valor vazio permite distinguir uma idade não informada de zero anos.',
    'Declare nome e idade no script e acrescente os dois v-text-field. type="number" muda o campo; a conversão do registro será explícita com Number().',
    'Digite Lael e 30. A prévia e o estado em tempo real devem mostrar os dois valores.',
  ],
  [
    'Limpar',
    'Uma função limpa os dois campos',
    'Não é necessário procurar inputs no DOM. A função altera nome.value e idade.value.',
    'Acrescente limpar() e o botão type="button". As duas atribuições devem estar na mesma função.',
    'Preencha nome e idade e clique em Limpar. Os dois devem voltar a vazios.',
  ],
  [
    'Enviar',
    'Um único envio reúne os valores',
    'Enter e o botão passam pelo mesmo submit.prevent. Nesta fase o envio apenas mostra o que foi recebido.',
    'Crie mensagem e enviar(). Envolva os dois campos com v-form e acrescente Enviar com type="submit".',
    'Envie Lael e 30 por Enter e pelo botão. O feedback deve mostrar o nome e a idade sem recarregar a página.',
  ],
  [
    'Regras',
    'Cada campo tem sua própria validação',
    'Nome: 3 a 80 caracteres após trim(). Idade: preenchida, inteira e entre 0 e 120. Zero é válido; vazio não é.',
    'Acrescente regrasNome e regrasIdade e ligue cada array ao campo correspondente. O resultado do envio será respeitado no próximo passo.',
    'Compare idade vazia, -1, 2.5, 0, 30 e 121. Só 0 e 30 passam na regra de idade desses exemplos.',
  ],
  [
    'Validar envio',
    'Só aceite quando os dois campos forem válidos',
    'form.validate() verifica todos os campos registrados. A entrada inválida permanece disponível para correção.',
    'Declare form e enviando; troque enviar pela versão async. Limpe nome e idade somente depois de valid ser true.',
    'Nome válido com idade vazia deve falhar. Nome vazio com idade válida também. Lael e 30 deve mostrar sucesso e limpar os dois campos.',
  ],
  [
    'Cadastrar',
    'Guarde nome e idade no mesmo objeto',
    'O array alunos recebe objetos com id estável, nome normalizado e idade numérica. Limpar o rascunho não apaga os registros.',
    'Declare alunos = ref([]), use push no envio validado e renderize nome e idade com v-for e :key="aluno.id".',
    'Cadastre Lael com 30 e Maria com 22. Confira os cartões e veja que idade é um número no estado, sem aspas.',
  ],
  [
    'Remover e revisar',
    'Confira o cadastro completo de alunos',
    'O registro é identificado pelo id, mesmo se duas pessoas tiverem o mesmo nome. Tudo fica apenas na memória desta demonstração.',
    'Acrescente remover(id) e o botão em cada cartão. O exercício final tem dois campos, validação, cadastro, limpeza e remoção.',
    'Cadastre dois alunos, limpe o formulário e remova apenas um. O outro deve manter seu nome e idade. Remover o último deve restaurar a mensagem vazia.',
  ],
]

export const studentFormWorkshop = {
  screens: stages.map(([label, title, intro, change, check], index) => ({
    label: `${index + 1} · ${label}`,
    title,
    intro,
    points: [
      ['O que alterar agora', change],
      ['Pare e confira', check],
    ],
    code: scriptFor(index + 1),
    language: 'javascript',
    codeExamples: [{ code: templateFor(index + 1), language: 'vue' }],
  })),
}
