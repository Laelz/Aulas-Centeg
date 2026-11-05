<script setup>
import { computed } from 'vue'
const props = defineProps({
  position: { type: Number, required: true },
  total: { type: Number, required: true },
  lastScreen: { type: Boolean, required: true },
})
const emit = defineEmits(['move'])
const progress = computed(() => (props.position / props.total * 100) + '%')
</script>
<template>
  <footer class="lesson-navigation">
    <v-btn variant="outlined" rounded="lg" :disabled="position === 1" @click="emit('move', -1)"
      >← Anterior</v-btn
    >
    <div class="progress-caption">
      <span>{{ position }} / {{ total }} telas</span>
      <div
        class="progress-track"
        role="progressbar"
        :aria-valuenow="position"
        :aria-valuemin="0"
        :aria-valuemax="total"
        aria-label="Posição no material"
      >
        <div :style="{ width: progress }" />
      </div>
    </div>
    <v-btn
      color="primary"
      elevation="0"
      rounded="lg"
      :disabled="position === total"
      @click="emit('move', 1)"
      >{{ lastScreen && position < total ? 'Próxima aula →' : 'Próxima →' }}</v-btn
    >
  </footer>
</template>
