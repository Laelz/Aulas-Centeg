<script setup>
import { ref } from 'vue'
defineProps({
  screen: { type: Object, required: true },
  screenIndex: { type: Number, required: true },
  files: { type: Array, required: true },
})
const heading = ref(null)
defineExpose({
  focusHeading: () => heading.value?.focus({ preventScroll: true }),
})
</script>
<template>
<article class="screen-card">
            <div class="screen-kicker">{{ screen.label }}<span>TELA {{ screenIndex + 1 }} DE 4</span></div>
            <h2 ref="heading" tabindex="-1" class="screen-title">{{ screen.title }}</h2>
            <p class="screen-intro">{{ screen.intro }}</p>
            <div class="teaching-points">
              <section v-for="(point, index) in screen.points" :key="point[0]" class="teaching-point"><span class="point-number">0{{ index + 1 }}</span><div><h3>{{ point[0] }}</h3><p>{{ point[1] }}</p></div></section>
            </div>
            <section class="code-panel" aria-label="Exemplo de código ou roteiro"><div class="code-caption"><span>NO PROJETO / NA PRÁTICA</span><span>Leia → preveja → execute</span></div><pre><code>{{ screen.code }}</code></pre></section>
            <section class="reflection"><span aria-hidden="true">?</span><div><h3>Pare e pense</h3><p>{{ screen.question }}</p></div></section>
            <div class="file-references"><strong>Arquivos de referência</strong><span v-for="file in files" :key="file">{{ file }}</span></div>
          </article>
</template>
