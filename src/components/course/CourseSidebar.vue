<script setup>
defineProps({
  lessons: { type: Array, required: true },
  lessonIndex: { type: Number, required: true },
})
const emit = defineEmits(['select'])
</script>
<template>
  <aside class="course-sidebar">
    <p class="section-label">SUA TRILHA DE APRENDIZAGEM</p>
    <h2>Do primeiro olá<br />à sua própria interface.</h2>
    <p class="sidebar-description">
      {{ lessons.length }} encontros · 2h por aula ·
      {{ lessons.reduce((total, day) => total + day.screens.length, 0) }} telas
    </p>
    <nav class="day-list" aria-label="Dias de aula">
      <button
        v-for="(day, index) in lessons"
        :key="day.date"
        class="day-button"
        :class="{ selected: lessonIndex === index }"
        :aria-current="lessonIndex === index ? 'true' : undefined"
        @click="emit('select', index)"
      >
        <span class="day-date"
          >{{ day.date }}<small>{{ day.weekday.replace('-feira', '') }}</small></span
        >
        <span class="day-name">{{ day.title }}</span
        ><span aria-hidden="true" class="day-arrow">↗</span>
      </button>
    </nav>
    <div class="sidebar-note">
      <span class="status-dot" /> Vue 3 + Vuetify 4 + Docker
      <p>Conceito, código e prática.<br />Entenda antes de implementar.</p>
    </div>
  </aside>
</template>
