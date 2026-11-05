import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import plaintext from 'highlight.js/lib/languages/plaintext'

for (const [name, grammar] of Object.entries({
  javascript,
  xml,
  css,
  bash,
  json,
  yaml,
  dockerfile,
  plaintext,
})) {
  hljs.registerLanguage(name, grammar)
}

const languages = {
  vue: { grammar: 'xml', label: 'Vue · HTML + JavaScript' },
  html: { grammar: 'xml', label: 'HTML' },
  javascript: { grammar: 'javascript', label: 'JavaScript' },
  css: { grammar: 'css', label: 'CSS' },
  bash: { grammar: 'bash', label: 'Terminal · Bash' },
  json: { grammar: 'json', label: 'JSON' },
  yaml: { grammar: 'yaml', label: 'YAML' },
  dockerfile: { grammar: 'dockerfile', label: 'Dockerfile' },
  plaintext: { grammar: 'plaintext', label: 'Roteiro / texto' },
}

export function detectLanguage(code) {
  if (/<(?:script|template|style)\b|<v-[\w-]+\b/.test(code)) return 'vue'
  if (/<\/?[a-z][\w-]*(?:\s[^>]*|\s*)>/i.test(code)) return 'html'
  if (/^\s*(?:docker(?:\s+compose)?\s|npm\s|node\s|wsl\s|git\s)/m.test(code)) return 'bash'
  if (/^\s*FROM\s+\S+/m.test(code)) return 'dockerfile'
  try {
    const data = JSON.parse(code)
    if (data && typeof data === 'object') return 'json'
  } catch {
    /* A maioria dos exemplos não é JSON. */
  }
  if (/^\s*(?:ports|services|volumes|environment|build):/m.test(code)) return 'yaml'
  if (/^\s*[.#][\w-]+[^\n]*\{/m.test(code)) return 'css'
  if (
    /^\s*(?:import\s|export\s|(?:const|let|var)\s|(?:async\s+)?function\s|(?:watch|createApp)\s*\()/m.test(
      code,
    )
  )
    return 'javascript'
  return 'plaintext'
}

export function highlightCode(code, language) {
  const selected = languages[language] ? language : detectLanguage(code)
  const { grammar, label } = languages[selected]
  // highlight() escapa o código de entrada; apenas seu HTML de destaque é renderizado.
  const { value } = hljs.highlight(code, { language: grammar, ignoreIllegals: true })
  return { html: value, language: selected, label }
}
