<script setup>
import { computed } from 'vue'
import { highlightCode } from '../../utils/highlightCode.js'

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: '' },
  caption: { type: String, default: 'CÓDIGO COMENTADO' },
})
const highlighted = computed(() => highlightCode(props.code, props.language))
</script>

<template>
  <section class="code-panel" :aria-label="`Exemplo de código: ${highlighted.label}`">
    <div class="code-caption">
      <span>{{ caption }}</span>
      <span class="code-language">{{ highlighted.label }}</span>
    </div>
    <pre
      tabindex="0"
      :aria-label="`Código ${highlighted.label}; use as setas para rolar`"
    ><code :class="`hljs language-${highlighted.language}`" v-html="highlighted.html"></code></pre>
  </section>
</template>
